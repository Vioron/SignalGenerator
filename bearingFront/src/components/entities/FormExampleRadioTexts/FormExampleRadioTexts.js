import styles from './FormExampleRadioTexts.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { radioButtonChecked } from 'redux/FormStartParametersReducer';
import RadioTextContainer from './RadioTextContainer';


function FormExampleRadioTexts({ typeGroup, accessOtherPages }) {
    const dispatch = useDispatch();
    const radioGroup = useSelector((state) => state.FormStartParameters.radioGroup[typeGroup]);

    const handleClick = (typeGroup, typeButton) => {
        if (accessOtherPages) {
            dispatch(radioButtonChecked({ typeGroup, type: typeButton }));
        }
    };

    return (
        <div className={styles.formTitle}>
            {radioGroup.radioButtons.map((typeButton, index) => (
                <RadioTextContainer
                    checked={radioGroup.checked === typeButton}
                    accessOtherPages={radioGroup.checked === typeButton ? true : accessOtherPages}
                    key={index}
                    typeGroup={typeGroup}
                    typeButton={typeButton}
                    handleClick={handleClick}
                />
            ))}
        </div>
    );
}

export default FormExampleRadioTexts;