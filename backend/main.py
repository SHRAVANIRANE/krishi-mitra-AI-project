from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
from scheduler import router as scheduler_router
from dashboard import router as dashboard_router
from PIL import Image
import numpy as np
import io


# ✅ IMPORT THE ROUTER
from scheduler import router as scheduler_router

from dashboard import router as dashboard_router

# --- Load model ---
MODEL_PATH = "../ml_model/saved_model/krishi_mitra_inference_model.keras"
model = load_model(MODEL_PATH)

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

app = FastAPI()

# ✅ REGISTER THE DASHBOARD ROUTER
app.include_router(dashboard_router)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ REGISTER THE SCHEDULER ROUTER (THIS WAS MISSING)
app.include_router(scheduler_router)

def preprocess_image(image_bytes: bytes):
    image = Image.open(io.BytesIO(image_bytes)).resize((224, 224))
    image_array = np.array(image) / 255.0
    return tf.expand_dims(image_array, 0)

@app.get("/")
def root():
    return {"message": "Krishi Mitra API Running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image_tensor = preprocess_image(image_bytes)

    prediction = model.predict(image_tensor)
    predicted_class = CLASS_NAMES[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    return {
        "prediction": predicted_class,
        "confidence": confidence
    }
