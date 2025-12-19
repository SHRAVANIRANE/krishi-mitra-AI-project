from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class IrrigationRequest(BaseModel):
    crop: str
    soil: str
    area: float

CROP_WATER = {
    "rice": 12000,
    "wheat": 6000,
    "cotton": 7000
}

SOIL_FACTOR = {
    "sandy": 1.2,
    "loamy": 1.0,
    "clay": 0.8
}

@router.post("/api/scheduler")
def calculate_irrigation(data: IrrigationRequest):
    crop = data.crop.lower()
    soil = data.soil.lower()
    area = data.area

    water_needed = CROP_WATER[crop] * area * SOIL_FACTOR[soil]
    duration = water_needed / 400  # liters per minute

    if soil == "sandy":
        message = "Soil drains quickly. Irrigate today in the morning."
    elif soil == "clay":
        message = "Soil holds water well. Avoid over-irrigation."
    else:
        message = "Soil moisture is balanced. Follow regular irrigation."

    return {
        "crop": crop.capitalize(),
        "water_needed_liters": round(water_needed, 2),
        "duration_minutes": round(duration, 1),
        "message": message
    }
