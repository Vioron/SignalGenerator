import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { radioButtonChecked } from 'redux/FormStartParametersReducer';
import RadioButtonGooey from 'components/shared/RadioButtonGooey/RadioButtonGooey';

function FormSettingOptionsRadioButton({ 
    typeGroup, 
    type, 
    defaultChecked 
}) {
    const dispatch = useDispatch();
    const text = useSelector((state) => state.FormStartParameters.radioButton[type].text);

    const onClick = () => dispatch(radioButtonChecked({ typeGroup, type }));

    return <RadioButtonGooey type={type} defaultChecked={defaultChecked} onClick={onClick} text={text} />;
}

export default FormSettingOptionsRadioButton;