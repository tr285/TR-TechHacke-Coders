from fastapi import APIRouter, Body
from app.utils.predictor import predict_career

router = APIRouter()

@router.post("/predict-career")
def get_career_prediction(data: dict = Body(...)):
    features = [
        data['gpa'],
        data['coding_skill'],
        data['creativity'],
        data['interest_ai'],
        data['interest_design']
    ]
    career = predict_career(features)
    return {"recommended_career": career}
