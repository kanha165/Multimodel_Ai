from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter(prefix="/vision", tags=["Vision"])

ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


@router.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...)
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed"
        )


    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "Image accepted"
    }