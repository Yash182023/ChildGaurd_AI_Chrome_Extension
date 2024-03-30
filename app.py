from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse
from PIL import Image
import torch
import io
from torchvision import transforms
from fastapi.staticfiles import StaticFiles  # Import StaticFiles
import pathlib
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import requests
app = FastAPI()


# Define path to the directory containing static files
static_dir = "static"

# Mount the static directory
app.mount("/static", StaticFiles(directory=static_dir), name="static")


# Load the model
model_path = "CGAI_model/ChildGaurdAI_resnet.pkl"
new_model = torch.load(model_path, map_location=torch.device('cpu'))

# Define class labels
class_labels = {0: "nsfw_1", 1: "nsfw_2", 2: "nsfw_3", 3: "safe"}

# Image preprocessing function
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    input_tensor = preprocess(image)
    input_batch = input_tensor.unsqueeze(0)  # Add a batch dimension
    return input_batch

#Prediction endpoint
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    input_batch = preprocess_image(image_bytes)

    # Perform model inference
    with torch.no_grad():
        output = new_model.forward(input_batch)

    # Get the predicted class label
    _, predicted_class = torch.max(output, 1)
    predicted_label = class_labels[predicted_class.item()]

    if predicted_label == 'nsfw_3':
        return JSONResponse(content={"message": "Highly Dangerous!"}, status_code=200)
    elif predicted_label == 'nsfw_2':
        return JSONResponse(content={"message": "Dangerous!"}, status_code=200)
    elif predicted_label == 'nsfw_1':
        return JSONResponse(content={"message": "Explicit cartoon!"}, status_code=200)
    else:
        return JSONResponse(content={"message": "Safe"}, status_code=200)

# Serve the HTML form
@app.get("/")
async def get_upload_form():
    with open(f"{static_dir}/upload_form.html", "r") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content, status_code=200)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://apenhalnmhlfamkpdknfdfpinejiegie"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
