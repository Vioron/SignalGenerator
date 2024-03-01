import { useEffect } from 'react';
import styles from './DropDown.module.css';

function DropDownElement({
  type,
  id,
  value,
  data,
  additionalFun = () => { },
  setDataState = () => { },
  dropDownNewActiveItem = () => { },
}) {

  return (
    <>
      <div id={'item' + type + id} className={styles.__select__input} type='radio' name={type} />
      <div onClick={() => {
        additionalFun();
        setDataState(type);
        dropDownNewActiveItem(type, id, value, data);
      }} className={styles.__select__label}>
        {value}
      </div>
    </>
  );
}

export default DropDownElement;