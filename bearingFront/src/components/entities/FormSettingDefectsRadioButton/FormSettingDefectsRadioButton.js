import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { radioButtonChecked } from 'redux/FormSettingDefectsReducer';
import RadioButtonGooey from 'components/shared/RadioButtonGooey/RadioButtonGooey';

function FormSettingDefectsRadioButton({ 
    typeGroup, 
    type, 
    defaultChecked 
}) {
    const dispatch = useDispatch();
    const text = useSelector((state) => state.FormSettingDefects.radioButton[type].text);

    const onClick = () => dispatch(radioButtonChecked({ typeGroup, type }));

    return <RadioButtonGooey type={type} defaultChecked={defaultChecked} onClick={onClick} text={text} />;
}

export default FormSettingDefectsRadioButton;