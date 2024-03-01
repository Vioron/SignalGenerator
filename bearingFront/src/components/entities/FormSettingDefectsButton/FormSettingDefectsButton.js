import { useSelector } from 'react-redux';
import Button from 'components/shared/Button/Button';

function FormSettingDefectsButton({
    onClick = () => { },
    type,
    disabled
}) {
    const text = useSelector((state) => state.FormSettingDefects.button[type].text);

    return <Button text={text} onClick={onClick} disabled={disabled} />;
}

export default FormSettingDefectsButton;