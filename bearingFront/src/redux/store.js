import { configureStore } from '@reduxjs/toolkit';
import FormStartParametersReducer from 'redux/FormStartParametersReducer';
import FormSettingDefectsReducer from 'redux/FormSettingDefectsReducer';
import GraphReducer from 'redux/GraphReducer';

export const store = configureStore({
    reducer: {
        FormStartParameters: FormStartParametersReducer,
        FormSettingDefects: FormSettingDefectsReducer,
        Graph: GraphReducer,
    },
})