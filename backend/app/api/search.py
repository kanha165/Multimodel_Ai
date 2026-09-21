from fastapi import APIRouter, Query

from app.services.tavily_service import search_web


router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get("/web")
def web_search(
    q: str = Query(...)
):
    results = search_web(q)

    return {
        "query": q,
        "results": results
    }