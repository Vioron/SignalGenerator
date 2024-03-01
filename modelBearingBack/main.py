from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from interfaces import Data

from centerMass import CenterMass
from signalGenerator import SignalGenerator
app = FastAPI()

# Подключаем CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можете уточнить разрешенные домены вместо "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/test")
def test():
    return {"message": "test"}


@app.post("/example")
def post_example(data: Data):
    print('==========================START====================================')
    centerMass_example = CenterMass(data)
    common_center_of_mass =centerMass_example.calculation()
    print('===================================================================')
    print('common_center_of_mass:', common_center_of_mass)
    signalGenerator = SignalGenerator(data, common_center_of_mass)
    #x_result, y_result = (
    coordinates = signalGenerator.calculation()
    #)

    x_result = []
    y_result = []

    print(coordinates)
    return {"status": "200 OK", "coordinates": coordinates}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)