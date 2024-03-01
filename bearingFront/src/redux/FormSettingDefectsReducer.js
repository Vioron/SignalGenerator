import { createSlice } from '@reduxjs/toolkit'

import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing'

const initialState = {
    dropDown: {
        listDefects: {
            dataState: '',
            activeItem: {
                id: 1,
                value: "Дефект внутреннего кольца",
            },
            // {
            //     id: 0,
            //     value: "Выберите тип дефект"
            // },
            notSelectedItem: {
                id: 1,
                value: "Дефект внутреннего кольца",
            },
            // {
            //     id: 0,
            //     value: "Выберите тип дефект"
            // },
            items: [
                {
                    id: 1,
                    value: "Дефект внутреннего кольца",
                },
                {
                    id: 2,
                    value: "Дефект внешнего кольца",
                },
                {
                    id: 3,
                    value: "Дефект тела качения",
                },
                // {
                //     id: 4,
                //     value: "Перекос и несоосность",
                // },
            ]
        },
        defectShapeInnerRing: {
            dataState: '',
            activeItem: {
                id: 1,
                value: "Сектор",
                data: "Sector",
            },
            notSelectedItem: {
                id: 0,
                value: "Выберите форму дефекта"
            },
            items: [
                {
                    id: 1,
                    value: "Сектор",
                    data: "Sector",
                },
                {
                    id: 2,
                    value: "Сегмент",
                    data: "Segment",
                },
                {
                    id: 3,
                    value: "Треугольник",
                    data: "Triangle",
                },
            ]
        },
        defectShapeExternalRing: {
            dataState: '',
            activeItem: {
                id: 1,
                value: "Сектор",
                data: "Sector",
            },
            notSelectedItem: {
                id: 0,
                value: "Выберите форму дефекта"
            },
            items: [
                {
                    id: 1,
                    value: "Сектор",
                    data: "Sector",
                },
                {
                    id: 2,
                    value: "Треугольник",
                    data: "Triangle",
                },
            ]
        },
        defectShapeRollingElement: {
            dataState: '',
            activeItem: {
                id: 1,
                value: "Сектор",
                data: "Sector",
            },
            notSelectedItem: {
                id: 0,
                value: "Выберите форму дефекта"
            },
            items: [
                {
                    id: 1,
                    value: "Сектор",
                    data: "Sector",
                },
                {
                    id: 2,
                    value: "Сегмент",
                    data: "Segment",
                },
                {
                    id: 3,
                    value: "Треугольник",
                    data: "Triangle",
                },
            ]
        },
        directionAndMisalignment: {
            dataState: '',
            activeItem: {
                id: 0,
                value: "Выберите вид дефекта"
            },
            notSelectedItem: {
                id: 0,
                value: "Выберите вид дефекта"
            },
            items: [
                {
                    id: 1,
                    value: "Перекос внутреннего кольца",
                },
                {
                    id: 2,
                    value: "Перекос внешнего кольца",
                },
                {
                    id: 3,
                    value: "Несоостность",
                },
                // {
                //     id: 5,
                //     value: "Перекос внешнего кольца",
                // },
            ]
        }
    },
    input: {
        angleInnerRingDefectFirstAngle: {
            text: 'Начальный угол дефекта',
            units: '°',
            value: '',
            correct: true,
        }, // угол 
        angleInnerRingDefectSecondAngle: {
            text: 'Конечный угол дефекта',
            units: '°',
            value: '',
            correct: true,
        }, // угол 
        angleExternalRingDefectFirstAngle: {
            text: 'Начальный угол дефекта',
            units: '°',
            value: '',
            correct: true,
        },
        angleExternalRingDefectSecondAngle: {
            text: 'Конечный угол дефекта',
            units: '°',
            value: '',
            correct: true,
        },
        angleRollingElementDefectFirstAngle: {
            text: 'Начальный угол дефекта',
            units: '°',
            value: '',
            correct: true,
        },
        angleRollingElementDefectSecondAngle: {
            text: 'Конечный угол дефекта',
            units: '°',
            value: '',
            correct: true,
        },
        tiltInnerDirection: {
            text: 'Направление наклона',
            units: '°',
            value: '',
            correct: true,
        },
        angleInnerDirection: {
            text: 'Угол наклона',
            units: '°',
            value: '',
            correct: true,
        },
        tiltExternalDirection: {
            text: 'Направление наклона',
            units: '°',
            value: '',
            correct: true,
        },
        angleExternalDirection: {
            text: 'Угол наклона',
            units: '°',
            value: '',
            correct: true,
        },
        tiltMisalignment: {
            text: 'Направление наклона',
            units: '°',
            value: '',
            correct: true,
        },
        sizeMisalignment: {
            text: 'Размер',
            units: 'мкм',
            value: '',
            correct: true,
        },
        depthInnerRingDefect: {
            text: 'Глубина дефекта',
            units: 'мкм',
            value: '',
            correct: true,
        },
        depthExternalRingDefect: {
            text: 'Глубина дефекта',
            units: 'мкм',
            value: '',
            correct: true,
        },
        depthRollingElementDefect: {
            text: 'Глубина дефекта',
            units: 'мкм',
            value: '',
            correct: true,
        },

    },
    button: {
        add: {
            text: 'добавить',
        },
    },
    calculation: {
        numberRollingElementDefect: {
            title: 'Номер тела качения',
            value: 1,
        }
    },
    defectsForms: {
        innerRingDefect: {
            defectShape: 'defectShapeInnerRing',
            inputFirstAngle: 'angleInnerRingDefectFirstAngle',
            inputSecondAngle: 'angleInnerRingDefectSecondAngle',
            depth: 'depthInnerRingDefect',
            calculation: undefined,
        },
        externalRingDefect: {
            defectShape: 'defectShapeExternalRing',
            inputFirstAngle: 'angleExternalRingDefectFirstAngle',
            inputSecondAngle: 'angleExternalRingDefectSecondAngle',
            depth: 'depthExternalRingDefect',
            calculation: undefined,
        },
        rollingElementDefect: {
            defectShape: 'defectShapeRollingElement',
            inputFirstAngle: 'angleRollingElementDefectFirstAngle',
            inputSecondAngle: 'angleRollingElementDefectSecondAngle',
            depth: 'depthRollingElementDefect',
            calculation: 'numberRollingElementDefect'
        },
        innerRingDistortion: {
            inputFirstAngle: 'tiltInnerDirection',
            inputSecondAngle: 'angleInnerDirection',
        },
        externalRingDistortion: {
            inputFirstAngle: 'tiltExternalDirection',
            inputSecondAngle: 'angleExternalDirection',
        },
        misalignment: {
            inputFirstAngle: 'tiltMisalignment',
            inputSecondAngle: 'sizeMisalignment',
        },
    },
    text: {
        shapeDefect: 'Форма дефекта',
    },
    radioButton: {
        add: {
            text: 'Добавить',
        },
        list: {
            text: 'Список',
        },
    },
    radioGroup: {
        additionAndList: {
            title: '',
            radioButtons: ['add', 'list'],
            checked: 'add'
        }, // Вращение кольца
    },
}

export const FormSettingDefectsSlice = createSlice({
    name: 'FormSettingDefects',
    initialState,
    reducers: {
        dropDownNewActiveItem: (state, action) => {
            state.dropDown[action.payload.type].activeItem.id = action.payload.item.id;
            state.dropDown[action.payload.type].activeItem.value = action.payload.item.value;
            if (action.payload.item.data !== null) {
                state.dropDown[action.payload.type].activeItem.data = action.payload.item.data;
            }
        },
        dropDownUpdate: (state, action) => {
            state.dropDown[action.payload.type].dataState = '';
        },
        onChangeInput: (state, action) => {
            state.input[action.payload.type].value = action.payload.value
        },
        correctInput: (state, action) => {
            state.input[action.payload.type].correct = action.payload.correct
            console.log(action.payload.type, '=>  state.input[type].correct: ', state.input[action.payload.type].correct);
        },
        addInnerRingDefect: (state) => {
            const bearing = RadialBallBearing.getInstanse();
            const defectShape = state.dropDown.defectShapeInnerRing.activeItem.data;
            bearing.newDefectInnerRing(
                defectShape,
                state.input.angleInnerRingDefectFirstAngle.value,
                state.input.angleInnerRingDefectSecondAngle.value,
                state.input.depthInnerRingDefect.value,
            );
            bearing.draw()
        },
        addExternalRingDefect: (state) => {
            const bearing = RadialBallBearing.getInstanse();
            const defectShape = state.dropDown.defectShapeExternalRing.activeItem.data;
            bearing.newDefectExternalRing(
                defectShape,
                state.input.angleExternalRingDefectFirstAngle.value,
                state.input.angleExternalRingDefectSecondAngle.value,
                state.input.depthExternalRingDefect.value,
            );

            bearing.draw();
        },
        addRollingElementDefect: (state) => {
            const bearing = RadialBallBearing.getInstanse();
            const defectShape = state.dropDown.defectShapeRollingElement.activeItem.data;
            bearing.newDefectRollingElement(
                defectShape,
                state.input.angleRollingElementDefectFirstAngle.value,
                state.input.angleRollingElementDefectSecondAngle.value,
                state.input.depthRollingElementDefect.value,
                state.calculation.numberRollingElementDefect.value
            );
            bearing.draw()
        },
        addInnerRingDistortion: (state) => {
            const bearing = RadialBallBearing.getInstanse();
            bearing.newInnerRingDistortion(
                state.input.tiltInnerDirection.value,
                state.input.angleInnerDirection.value
            );
            bearing.draw()
        },
        addExternalRingDistortion: (state) => {
            const bearing = RadialBallBearing.getInstanse();
            bearing.newExternalRingDistortion(
                state.input.tiltExternalDirection.value,
                state.input.angleExternalDirection.value
            );
            bearing.draw()
        },
        addMisalignment: (state) => {
            const bearing = RadialBallBearing.getInstanse();
            bearing.newMisalignment(
                state.input.tiltMisalignment.value,
            );
            bearing.draw()
        },
        calculationMinus: (state, action) => {
            const bearing = RadialBallBearing.getInstanse()
            if (state.calculation[action.payload.type].value > 1) {
                state.calculation[action.payload.type].value -= 1
            }
            else {
                state.calculation[action.payload.type].value = bearing.numberOfRollingElements;
            }
            bearing.chooseRollingElement(state.calculation[action.payload.type].value)
            bearing.draw()
        },
        calculationPlus: (state, action) => {
            const bearing = RadialBallBearing.getInstanse()
            if (state.calculation[action.payload.type].value < bearing.numberOfRollingElements) {
                state.calculation[action.payload.type].value += 1
            }
            else {
                state.calculation[action.payload.type].value = 1;
            }
            bearing.chooseRollingElement(state.calculation[action.payload.type].value)
            bearing.draw()
        },
        setDataState: (state, action) => {
            state.dropDown[action.payload.type].dataState = action.payload.dataState
        },
        exclusionOfActive: (state, action) => {
            for (let i = 0; i < action.payload.arraydataStates.length; i++) {
                if (action.payload.dataState != i) {
                    state.dropDown[action.payload.arraydataStates[i]].dataState = '';
                }
            }
        },
        radioButtonChecked: (state, action) => {
            state.radioGroup[action.payload.typeGroup].checked = action.payload.type
        },
    },
})


export const {
    dropDownNewActiveItem,
    dropDownUpdate,
    onChangeInput,
    correctInput,
    addInnerRingDefect,
    addExternalRingDefect,
    addRollingElementDefect,
    calculationMinus,
    calculationPlus,
    addInnerRingDistortion,
    addExternalRingDistortion,
    addMisalignment,
    setDataState,
    exclusionOfActive,
    radioButtonChecked
} = FormSettingDefectsSlice.actions

export default FormSettingDefectsSlice.reducer