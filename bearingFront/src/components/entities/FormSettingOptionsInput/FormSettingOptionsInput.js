import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onChangeInput } from 'redux/FormStartParametersReducer';
import InputWithUnderline from 'components/shared/InputWithUnderline/InputWithUnderline';

function FormSettingOptionsInput({ type }) {
    const dispatch = useDispatch();
    const input = useSelector((state) => state.FormStartParameters.input[type]);

    const { text, units, value, correct } = input;

    const onChange = (e) => {
        dispatch(onChangeInput({ value: e.target.value, type }))
    }

    return (
        <InputWithUnderline
            value={value}
            correct={correct}
            type={type}
            units={units}
            text={text}
            onChange={onChange}
        />
    );
}

export default FormSettingOptionsInput;