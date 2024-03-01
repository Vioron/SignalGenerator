from pydantic import BaseModel
from typing import List


class AllParams(BaseModel):
    rotationRing: str
    rpm: float
    realExternalRingDiameter: float
    realInnerRingDiameter: float
    realRollingElementDiameter: float
    realInnerRingThickness: float
    realExternalRingThickness: float
    numberOfRollingElements: int
    contactAngleOfRollingElements: float

class DefectsExternalRing(BaseModel):
    defectShape: str
    startAngle: float
    finishAngle: float
    depth: float

class DefectsInnerRing(BaseModel):
    defectShape: str
    startAngle: float
    finishAngle: float
    depth: float

class DefectsRollingElements(BaseModel):
    defectShape: str
    startAngle: float
    finishAngle: float
    depth: int
    numberRollingElement: int

class AllDefects(BaseModel):
    defectsExternalRing: List[DefectsExternalRing]
    defectsInnerRing: List[DefectsInnerRing]
    defectsRollingElements: List[DefectsRollingElements]

class Data(BaseModel):
    allParams: AllParams
    allDefects: AllDefects
