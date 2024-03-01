import React, { useEffect } from 'react';
import styles from './FormStartParameters.module.css';
import { useSelector, useDispatch } from 'react-redux';
import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing';
import FormExampleRadioTexts from 'components/entities/FormExampleRadioTexts/FormExampleRadioTexts';
import FormSettingOptions from 'components/widgets/FormSettingOptions/FormSettingOptions';
import FormSettingDefects from 'components/widgets/FormSettingDefects/FormSettingDefects';
import { dropDownUpdate } from 'redux/FormSettingDefectsReducer';

function FormStartParameters() {
    const dispatch = useDispatch();
    const statusCreateSystem = useSelector((state) => state.FormStartParameters.status.statusCreateSystem);
    const checked = useSelector((state) => state.FormStartParameters.radioGroup.optionsAndDefects.checked);

    const newCheckedFunction = () => {
        dispatch(dropDownUpdate({ type: 'listDefects' }));
        dispatch(dropDownUpdate({ type: 'defectShapeInnerRing' }));
        dispatch(dropDownUpdate({ type: 'defectShapeExternalRing' }));
        dispatch(dropDownUpdate({ type: 'defectShapeRollingElement' }));
        const bearing = RadialBallBearing.getInstanse();
        bearing.selectElement('default');
    };

    useEffect(() => {
        newCheckedFunction();
    }, [checked]);

    return (
        <div className={styles.formBody}>
            <div className={styles.radioTexts}>
                <FormExampleRadioTexts
                    // type='optionsAndDefects'
                    typeGroup='optionsAndDefects'
                    accessOtherPages={statusCreateSystem}
                />
            </div>
            <div className={styles.formSetting}>
                {checked === 'options' && <FormSettingOptions />}
                {checked === 'defects' && <FormSettingDefects />}
            </div>
        </div>
    );
}

export default FormStartParameters;