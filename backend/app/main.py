from fastapi import FastAPI

from app.api.vision import router as vision_router
from app.api.ocr import router as ocr_router
from app.api.document import router as document_router
from app.api.classification import router as classification_router

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

