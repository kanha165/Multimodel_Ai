from fastapi import FastAPI

from app.api.vision import router as vision_router
from app.api.ocr import router as ocr_router
from app.api.document import router as document_router
from app.api.classification import router as classification_router
from app.api.product import router as product_router
from app.api.plant import router as plant_router
from app.api.animal import router as animal_router
from app.api.landmark import router as landmark_router
from app.api.search import router as search_router
from app.api.product_search import router as product_search_router
from app.api.master import router as master_router




app = FastAPI(
    title="Multimodal AI Vision API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Multimodal AI Vision API is running"
    }

app.include_router(vision_router)
app.include_router(ocr_router)
app.include_router(document_router)
app.include_router(classification_router)
app.include_router(product_router)
app.include_router(plant_router)
app.include_router(animal_router)
app.include_router(landmark_router)
app.include_router(search_router)
app.include_router(product_search_router)
app.include_router(master_router)

