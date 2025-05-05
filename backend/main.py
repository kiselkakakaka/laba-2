from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserData(BaseModel):
    name: str
    age: int
    email: str
    isStudent: bool

@app.post("/api/register")
def register(data: UserData):
    return {"status": "успех", "получено": data}
