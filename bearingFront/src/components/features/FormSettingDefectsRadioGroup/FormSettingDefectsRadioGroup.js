import styles from './FormSettingDefectsRadioGroup.module.css';
import { useSelector } from 'react-redux';
import FormSettingDefectsRadioButton from 'components/entities/FormSettingDefectsRadioButton/FormSettingDefectsRadioButton';


function FormSettingDefectsRadioGroup({ type, presenceTitle = false }) {

    const {
        radioButtons,
        title,
        checked
    } = useSelector((state) =>  state.FormSettingDefects.radioGroup[type]);

    return (
        <div className={styles.formExampleRadioGroup}>
            {presenceTitle == true &&
                <div className={styles.divLabel}>
                    <label className={styles.label}>{title}</label>
                </div>
            }
            <div className={styles.radioGroup}>
                {radioButtons.map((typeButton, index) => (
                    <FormSettingDefectsRadioButton
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

export default FormSettingDefectsRadioGroup;