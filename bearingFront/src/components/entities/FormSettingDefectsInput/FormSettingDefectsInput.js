import { useSelector, useDispatch } from 'react-redux';
import { onChangeInput } from 'redux/FormSettingDefectsReducer';
import InputWithUnderline from 'components/shared/InputWithUnderline/InputWithUnderline';

function FormSettingDefectsInput({ type }) {
    const dispatch = useDispatch();
    const input = useSelector((state) => state.FormSettingDefects.input[type]);

    const { text, units, value, correct} = input;

    const onChange = (e) => {
        dispatch(onChangeInput({ value: e.target.value, type }));
    }

    return (
        <InputWithUnderline
            value={value}
            type={type}
            units={units}
            text={text}
            onChange={onChange}
            correct = {correct}
        />
    );
}

export default FormSettingDefectsInput;