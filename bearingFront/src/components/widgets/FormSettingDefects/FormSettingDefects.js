import { useEffect, useState } from 'react';
import styles from './FormSettingDefects.module.css';
import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing';
import { useSelector, useDispatch } from 'react-redux';

import FormExampleRadioDropDown from 'components/entities/FormExampleRadioDropDown/FormExampleRadioDropDown';
import FormForDefects from 'components/features/FormForDefects/FormForDefects';
import DefectItemForm from 'components/entities/defectItemForm/defectItemForm';

import FormSettingDefectsRadioGroup from 'components/features/FormSettingDefectsRadioGroup/FormSettingDefectsRadioGroup';

import { changeStatus } from 'redux/FormStartParametersReducer';

import {
  addInnerRingDefect,
  addExternalRingDefect,
  addRollingElementDefect,
  exclusionOfActive,
  dropDownUpdate
} from 'redux/FormSettingDefectsReducer';

const LIST_DEFECTS = 'listDefects';

const useForceUpdate = () => {
  const [, setForceUpdate] = useState();

  return () => setForceUpdate({});
};

function FormSettingDefects() {
  const idDropDown = useSelector((state) => state.FormSettingDefects.dropDown.listDefects.activeItem.id);
  const additionAndListStatus = useSelector((state) => state.FormSettingDefects.radioGroup.additionAndList.checked);
  const bearing = RadialBallBearing.getInstanse();

  const defectTypes = ['innerRingDefect', 'externalRingDefect', 'rollingElementDefect'];
  const namesListDefects = ['defectsInnerRing', 'defectsExternalRing', 'defectsRollingElements'];
  const defectShapes = ['defectShapeInnerRing', 'defectShapeExternalRing', 'defectShapeRollingElement']

  const typeForm = defectTypes[idDropDown - 1];
  const nameListDefects = namesListDefects[idDropDown - 1];
  const defectShap = defectShapes[idDropDown - 1]


  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();

  const addDefect = () => {
    switch (idDropDown) {
      case 1:
        dispatch(addInnerRingDefect());
        break;
      case 2:
        dispatch(addExternalRingDefect());
        break;
      case 3:
        dispatch(addRollingElementDefect());
        break;
      default:
        break;
    }

      // остановка и обновление системы
      const bearingInstance = RadialBallBearing.getInstanse();
      dispatch(changeStatus({ type: 'animation', value: false }))
      bearingInstance.updateAngleToStarting()
      bearingInstance.draw()

  };

  useEffect(() => {
    if (idDropDown >= 1 && idDropDown <= 3) {
      bearing.selectElement(typeForm);
      bearing.draw();
    }
  }, [idDropDown, dispatch]);

  const deleteFun = (index) => {
    const bearingInstance = RadialBallBearing.getInstanse();
    bearingInstance.deleteDefect(nameListDefects, index);
    forceUpdate();
    bearingInstance.draw();

    // остановка и обновление системы
    dispatch(changeStatus({ type: 'animation', value: false }))
    bearingInstance.updateAngleToStarting()
    bearingInstance.draw()

  };

  const renderFormForDefects = () => (
    idDropDown >= 1 && idDropDown <= 3 && <FormForDefects typeForm={typeForm} typeButton="add" onClick={addDefect} />
  );

  const renderDefectItemsForm = () => (
    idDropDown >= 1 && idDropDown <= 3 && bearing[nameListDefects].map((defect, index) => (
      <DefectItemForm
        defectShape={defect.defectShape}
        startAngle={defect.startAngle}
        finishAngle={defect.finishAngle}
        depth={defect.depth}
        number={defect.numberRollingElement}
        deleteFun={() => deleteFun(index)}
        index={index}
        key={index}
      />
    ))
  );

  return (
    <div className={styles.container}>
      <FormExampleRadioDropDown
        type={LIST_DEFECTS}
        additionalFun={() => {
          dispatch(dropDownUpdate({ type: defectShap }));
        }} />

      <div className={styles.additionAndList}>
        <FormSettingDefectsRadioGroup type="additionAndList" />
      </div>

      {additionAndListStatus === 'add' && (
        <div>{renderFormForDefects()}</div>
      )}

      {additionAndListStatus === 'list' && (
        <div className={styles.defectItemFormList}>{renderDefectItemsForm()}</div>
      )}
    </div>
  );
}

export default FormSettingDefects;
