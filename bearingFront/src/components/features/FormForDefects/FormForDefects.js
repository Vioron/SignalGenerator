
import React, { useEffect, useState } from 'react';
import styles from './FormForDefects.module.css';
import { useSelector, useDispatch } from 'react-redux';

import FormSettingDefectsInput from 'components/entities/FormSettingDefectsInput/FormSettingDefectsInput';
import FormSettingDefectsButton from 'components/entities/FormSettingDefectsButton/FormSettingDefectsButton';
import FormSettingDefectsCalculation from 'components/entities/FormSettingDefectsCalculation/FormSettingDefectsCalculation';
import FormExampleRadioDropDown from 'components/entities/FormExampleRadioDropDown/FormExampleRadioDropDown';
import FormSettingDefectsText from 'components/entities/FormSettingDefectsText/FormSettingDefectsText';
import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing';

import { correctInput } from 'redux/FormSettingDefectsReducer'

function FormForDefects({ typeForm, typeButton, onClick }) {
  const dispatch = useDispatch();

  const { defectsForms, input, dropDown, calculation } = useSelector((state) => state.FormSettingDefects);
  const { inputFirstAngle, inputSecondAngle, depth, defectShape, calculation: calculationType } = defectsForms[typeForm];
  const { value: inputFirstAngleValue, correct: inputFirstAngleCorrect } = input[inputFirstAngle];
  const { value: inputSecondAngleValue, correct: inputSecondAngleCorrect } = input[inputSecondAngle];
  const { value: depthValue, correct: depthCorrect } = input[depth];


  let calculationValue = undefined

  if (calculationType != undefined) {
    calculationValue = calculation[calculationType].value;
  }


  const defectShapeData = dropDown[defectShape]?.activeItem.data;

  const [disabled, setDisabled] = useState(true);

  const bearing = RadialBallBearing.getInstanse();

  const validateRange = (defects, startAngle, finishAngle, calculationValue = undefined) => {

    if (calculation) {
      defects = defects.filter(defect => defect.numberRollingElement == calculationValue)
    }

    return defects.every(defect => (
      (inputFirstAngleValue % 360 <= (defect[startAngle] % 360) && inputSecondAngleValue % 360 <= (defect[startAngle] % 360)) ||
      (inputFirstAngleValue % 360 >= (defect[finishAngle] % 360) && inputSecondAngleValue % 360 >= (defect[finishAngle] % 360))
    ))
  };

  const validation = () => {
    let statusCorrectRangeForFull = true;

    if (typeForm === 'innerRingDefect' || typeForm === 'externalRingDefect') {
      const defectsArray = typeForm === 'innerRingDefect' ?
        bearing.defectsInnerRing : bearing.defectsExternalRing

      statusCorrectRangeForFull = validateRange(defectsArray, 'startAngle', 'finishAngle');
    }

    if (typeForm === 'rollingElementDefect') {
      const defectsArray = bearing.defectsRollingElements;

      statusCorrectRangeForFull = validateRange(defectsArray, 'startAngle', 'finishAngle', calculationValue);
    }

    dispatch(correctInput({
      type: inputFirstAngle,
      correct: +inputFirstAngleValue >= 0 && statusCorrectRangeForFull
    }));

    dispatch(correctInput({
      type: inputSecondAngle,
      correct: +inputSecondAngleValue >= 0 &&
        +inputFirstAngleValue < +inputSecondAngleValue &&
        inputSecondAngleValue - inputFirstAngleValue <= 360 && statusCorrectRangeForFull,
    }));

    let maximumThickness;

    if (typeForm === 'innerRingDefect' || typeForm === 'externalRingDefect') {
      maximumThickness = typeForm === 'innerRingDefect'
        ? bearing.realInnerRingThickness - bearing.realRollingElementDiameter / 5
        : bearing.realExternalRingThickness - bearing.realRollingElementDiameter / 5;
    }

    if (typeForm === 'innerRingDefect' || typeForm === 'externalRingDefect') {
      if (defectShapeData !== 'Segment') {
        dispatch(correctInput({
          type: depth,
          correct: maximumThickness * 1000 - depthValue >= 0 && depthValue != ''
        }));
      }
      else {
        dispatch(correctInput({
          type: depth,
          correct: true
        }));
      }
    }
    if (typeForm === 'rollingElementDefect') {
      if (defectShapeData !== 'Segment') {
        dispatch(correctInput({
          type: depth,
          correct: bearing.realRollingElementDiameter * 1000 - depthValue >= 0 && depthValue != ''
        }));
      }
      else {
        dispatch(correctInput({
          type: depth,
          correct: true
        }));
      }
    };
  }

  useEffect(() => {
    validation();
  }, [inputFirstAngleValue, inputSecondAngleValue, depthValue, calculationValue, defectShapeData]);

  useEffect(() => {
    setDisabled(!(inputFirstAngleCorrect && inputSecondAngleCorrect && depthCorrect));
  }, [inputFirstAngleCorrect, inputSecondAngleCorrect, depthCorrect]);

  return (
    <div className={styles.container}>
      {/* <FormSettingDefectsText type='shapeDefect' /> */}
      {defectShape && <FormExampleRadioDropDown type={defectShape} />}
      {inputFirstAngle && <FormSettingDefectsInput type={inputFirstAngle} />}
      {inputSecondAngle && <FormSettingDefectsInput type={inputSecondAngle} />}
      {depth && defectShapeData !== 'Segment' && <FormSettingDefectsInput type={depth} />}

      <div className={styles.down}>
          {calculationType && <FormSettingDefectsCalculation type={calculationType} key={calculationType} />}
       
        <div className={styles.downButton}>
          <FormSettingDefectsButton type={typeButton} onClick={() => { onClick(); validation(); }} disabled={disabled} />
        </div>
      </div>

    </div>
  );
}

export default FormForDefects;
