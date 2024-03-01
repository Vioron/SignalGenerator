import { useSelector } from 'react-redux';
import RadioText from '../../shared/RadioTexts/RadioText';


function RadioTextContainer({
    checked,
    typeButton,
    accessOtherPages,
    index,
    typeGroup,
    handleClick,
}) {
    const text = useSelector((state) => state.FormStartParameters.radioButton[typeButton].text);

    return (
        <RadioText
            checked={checked}
            accessOtherPages={accessOtherPages}
            key={index}
            typeGroup={typeGroup}
            typeButton={typeButton}
            handleClick={handleClick}
            text={text}
        />
    );
}

export default RadioTextContainer;





