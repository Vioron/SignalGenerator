import { useEffect } from 'react';
import styles from './DropDown.module.css';
import DropDownElement from './DropDownElement';

function DropDown({
  type,
  items,
  additionalFun = () => { },
  dataState,
  changeDataState = () => { },
  activeItemValue,
  setDataState = () => { },
  dropDownNewActiveItem = () => { },
}) {

  useEffect(() => {
    console.log('activeItemValue =>', activeItemValue);
  })

  return (
    <div className={styles.__select} data-state={dataState}>
      <div className={styles.__select__title} onClick={() => {
        additionalFun();
        changeDataState();
      }}>
        {activeItemValue}
      </div>
      <div className={styles.__select__content}>
        <div id={'active' + type} className={styles.__select__input} name={type}></div>
        <div className={styles.__select__label}></div>
        {items.map((item) => (
          <DropDownElement
            type={type}
            key={'item' + type + item.id}
            id={item.id}
            value={item.value}
            data={item.data ? item.data : null}
            additionalFun={additionalFun}
            setDataState={() => setDataState(type)}
            dropDownNewActiveItem={dropDownNewActiveItem}
          />
        ))}
      </div>
    </div>
  );
}

export default DropDown;