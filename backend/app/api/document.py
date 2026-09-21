from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.document_service import summarize_document

router = APIRouter(
    prefix="/document",
    tags=["Document"]
)

ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


@router.post("/summarize")
async def summarize(
    file: UploadFile = File(...)
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed"
        )

    image_bytes = await file.read()

    result = await summarize_document(
        image_bytes=image_bytes,
        mime_type=file.content_type
    )

    return {
        "filename": file.filename,
        "summary": result
    }