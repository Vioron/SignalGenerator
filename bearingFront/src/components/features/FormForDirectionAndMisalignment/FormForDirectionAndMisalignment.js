import React, { useEffect } from 'react';
import styles from './FormForDirectionAndMisalignment.module.css';
import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing';
import { useSelector, useDispatch } from 'react-redux';

import FormExampleRadioDropDown from 'components/entities/FormExampleRadioDropDown/FormExampleRadioDropDown';
import FormForDefects from 'components/features/FormForDefects/FormForDefects';

import {
    addInnerRingDistortion,
    addExternalRingDistortion,
    addMisalignment,
    exclusionOfActive
} from 'entities/model/FormSettingDefectsReducer';

function FormForDirectionAndMisalignment({
    typeDropDown,
    parentalDropDown,
    onClick
}) {
    const idDropDown = useSelector((state) => state.FormSettingDefects.dropDown[typeDropDown].activeItem.id)
    const dispatch = useDispatch()

    useEffect(() => {
        const bearing = RadialBallBearing.getInstanse();
        if (idDropDown === 1) {
            bearing.selectElement('innerRingDistortion')
        } else if (idDropDown === 2) {
            bearing.selectElement('externalRingDistortion')
        } else if (idDropDown === 3) {
            bearing.selectElement('misalignment')
        }
        bearing.draw();
    }, [idDropDown])

    const dispatchExclusionOfActive = () => {
        dispatch(exclusionOfActive({
            dataState: typeDropDown,
            arraydataStates: [typeDropDown, parentalDropDown]
        }))
    }

    return (
        <div className={styles.container}>
            <FormExampleRadioDropDown
                type={typeDropDown}
                additionalFun={dispatchExclusionOfActive}
            />
            {idDropDown === 1 &&
                <FormForDefects
                    typeForm='innerRingDistortion'
                    typeButton='add'
                    onClick={() => dispatch(addInnerRingDistortion())}
                />}
            {idDropDown === 2 &&
                <FormForDefects
                    typeForm='externalRingDistortion'
                    typeButton='add'
                    onClick={() => dispatch(addExternalRingDistortion())}
                />}
            {idDropDown === 3 &&
                <FormForDefects
                    typeForm='misalignment'
                    typeButton='add'
                    onClick={() => dispatch(addMisalignment())}
                />}
        </div>
    );
}

export default FormForDirectionAndMisalignment;