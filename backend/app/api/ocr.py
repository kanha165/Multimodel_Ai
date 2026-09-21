from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.ocr_service import extract_text

router = APIRouter(
    prefix="/ocr",
    tags=["OCR"]
)

ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


@router.post("/extract")
async def ocr(file: UploadFile = File(...)):

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed"
        )

    image_bytes = await file.read()

    result = await extract_text(image_bytes)

    return {
        "filename": file.filename,
        "text": result
    }