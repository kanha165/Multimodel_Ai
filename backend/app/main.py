from fastapi import FastAPI

from app.api.vision import router as vision_router


app = FastAPI(
    title="Multimodal AI Vision API",
    version="1.0.0"
)


app.include_router(vision_router)


@app.get("/")
def root():
    return {
        "message": "Multimodal AI Vision API is running"
    }