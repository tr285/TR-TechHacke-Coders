from fastapi import FastAPI
from app.routes import career

app = FastAPI()
app.include_router(career.router)
