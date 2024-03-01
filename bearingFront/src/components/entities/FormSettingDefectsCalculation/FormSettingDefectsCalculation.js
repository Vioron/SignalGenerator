import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { calculationMinus, calculationPlus } from 'redux/FormSettingDefectsReducer';
import Calculation from 'components/shared/Calculation/Calculation';

function FormSettingDefectsCalculation({
    type,
    validation = () => { }
}) {
    const dispatch = useDispatch();

    const value = useSelector((state) => state.FormSettingDefects.calculation[type].value);
    const title = useSelector((state) => state.FormSettingDefects.calculation[type].title);

    return (
        <Calculation
            title={title}
            value={value}
            type={type}
            minus={(type) => {
                validation()
                dispatch(calculationMinus({ type }))
            }}
            plus={(type) => {
                validation()
                dispatch(calculationPlus({ type }))
            }}
        />
    );
}


export default FormSettingDefectsCalculation;