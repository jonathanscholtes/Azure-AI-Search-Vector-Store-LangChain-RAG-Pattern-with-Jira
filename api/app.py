from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from web import search

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(search.router)



@app.get("/")
def get() -> str:
    return "running"


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", reload=True)