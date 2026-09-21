from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.services.product_agent_service import product_web_search


router = APIRouter(
    prefix="/product",
    tags=["Product Search"]
)


ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


@router.post("/search")
async def search_product(
    file: UploadFile = File(...),
    question: str = Form(...)
):

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed"
        )

    if not question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty"
        )

    image_bytes = await file.read()

    result = await product_web_search(
        image_bytes=image_bytes,
        mime_type=file.content_type,
        question=question
    )

    return {
        "filename": file.filename,
        "question": question,
        "result": result
    }