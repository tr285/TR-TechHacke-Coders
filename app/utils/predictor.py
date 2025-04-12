import joblib
import numpy as np

model = joblib.load('app/models/career_predictor.pkl')

def predict_career(data):
    prediction = model.predict([np.array(data)])
    return prediction[0]
