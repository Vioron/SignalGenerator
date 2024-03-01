import Text from "components/shared/Text/Text";
import { useSelector, useDispatch } from 'react-redux';

function FormSettingDefectsText({
    type
}) {

    const text = useSelector((state) => state.FormSettingDefects.text[type]);

    return (
        <Text text={text} />
    );
}

export default FormSettingDefectsText;