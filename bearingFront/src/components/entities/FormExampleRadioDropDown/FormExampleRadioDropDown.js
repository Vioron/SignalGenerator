import { useSelector, useDispatch } from 'react-redux';
import {
  dropDownNewActiveItem,
  setDataState
} from 'redux/FormSettingDefectsReducer';

import DropDown from 'components/shared/DropDown/DropDown';

function FormExampleRadioDropDown({
  type,
  additionalFun = () => { }
}) {

  const {
    items,
    dataState,
    activeItem: { value: activeItemValue },
  } = useSelector((state) => state.FormSettingDefects.dropDown[type]);

  const dispatch = useDispatch();

  const changeDataState = () => {
    const newDataState = dataState === 'active' ? '' : 'active';
    dispatch(setDataState({ type, dataState: newDataState }));
  };

  const setDataStateClose = () => {
    dispatch(setDataState({ type, dataState: '' }));
  };

  const dispatchDropDownNewActiveItem = (type, id, value , data = null) => {
    dispatch(dropDownNewActiveItem({ type, item: { id, value , data} }));
  };

  return (
    <DropDown
      items={items}
      type={type}
      additionalFun={additionalFun}
      dataState={dataState}
      changeDataState={changeDataState}
      activeItemValue={activeItemValue}
      dropDownNewActiveItem={dispatchDropDownNewActiveItem}
      setDataState={setDataStateClose}
    />
  );
}

export default FormExampleRadioDropDown;