import os
from dotenv import load_dotenv

load_dotenv()

_client = None

def get_tavily_client():
    global _client
    if _client is None:
        from tavily import TavilyClient
        api_key = os.getenv("TAVILY_API_KEY")
        if not api_key:
            raise ValueError("TAVILY_API_KEY is not set in .env")
        _client = TavilyClient(api_key=api_key)
    return _client


def search_web(query: str):
    client = get_tavily_client()
    response = client.search(
        query=query,
        search_depth="advanced",
        max_results=5
    )

    return response["results"]