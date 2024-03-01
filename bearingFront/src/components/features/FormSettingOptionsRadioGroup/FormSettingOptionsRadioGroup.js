import styles from './FormSettingOptionsRadioGroup.module.css';
import { useSelector } from 'react-redux';
import FormExampleRadioButton from 'components/entities/FormExampleRadioButton/FormSettingOptionsRadioButton';

function FormSettingOptionsRadioGroup({ type }) {

    const {
        radioButtons,
        title,
        checked
    } = useSelector((state) =>  state.FormStartParameters.radioGroup[type]);

    return (
        <div className={styles.formExampleRadioGroup}>
            <div className={styles.divLabel}>
                <label className={styles.label}>{title}</label>
            </div>
            <div className={styles.radioGroup}>
                {radioButtons.map((typeButton, index) => (
                    <FormExampleRadioButton
                        defaultChecked={typeButton === checked}
                        key={index}
                        id={typeButton}
                        typeGroup={type}
                        type={typeButton}
                    />
                ))}
            </div>
        </div>
    );
}

export default FormSettingOptionsRadioGroup;