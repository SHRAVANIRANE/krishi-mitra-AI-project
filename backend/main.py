from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
from fastapi.middleware.cors import CORSMiddleware  # <-- 1. IMPORT THIS (NEW)

# --- 1. Load your CLEAN, FINAL Keras model ---
# This path should be correct
MODEL_PATH = '../ml_model/saved_model/krishi_mitra_model_final.keras'
model = load_model(MODEL_PATH)

# --- 2. Load the Class Names (Copied from your notebook) ---
CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry___healthy', 'Cherry___Powdery_mildew',
    'Corn___Cercospot_leaf_spot Gray_leaf_spot', 'Corn___Common_rust', 'Corn___healthy',
    'Corn___Northern_Leaf_Blight', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
    'Grape___healthy', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___healthy', 'Potato___Late_blight', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___healthy', 'Strawberry___Leaf_scorch',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___healthy', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_mosaic_virus', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus'
]

# --- 3. Define the FastAPI app ---
app = FastAPI()

# --- 3b. ADD YOUR CORS MIDDLEWARE (NEW) ---
# This is the "guest list" that allows your frontend to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your React app's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# --- 4. Helper Function to Process the Image ---
def preprocess_image(image_bytes: bytes) -> tf.Tensor:
    """
    Takes image bytes, resizes it to 224x224, and preprocesses
    it for the model.
    """
    image = Image.open(io.BytesIO(image_bytes))
    image = image.resize((224, 224)) # Resize to model's expected input
    image_array = np.array(image)
    
    # Add a batch dimension
    image_tensor = tf.expand_dims(image_array, 0) 
    
    return image_tensor

# --- 5. Define the Root and Prediction Endpoints ---
@app.get("/")
def read_root():
    return {"message": "Welcome to the Krishi Mitra API!"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Receives an image file, preprocesses it, and returns
    the model's prediction.
    """
    # 1. Read the image file
    image_bytes = await file.read()
    
    # 2. Preprocess the image
    image_tensor = preprocess_image(image_bytes)
    
    # 3. Make a prediction
    prediction = model.predict(image_tensor)
    
    # 4. Get the predicted class name
    predicted_class_name = CLASS_NAMES[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    
    # 6. Return the result
    return {
        "prediction": predicted_class_name,
        "confidence": confidence
    }