import { createSlice } from '@reduxjs/toolkit'

import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing'

const initialState = {
    status: {
        animation: false,
        statusCorrectData: false,
        statusCreateSystem: false,
    },
    input: {
        rpm: {
            text: 'Обороты в минуту',
            units: 'об/мин',
            value: 10,
            correct: true,
        }, // обороты в минуту
        externalRingDiameter: {
            text: 'Диаметр внешнего кольца внешней стенки',
            units: 'мм',
            value: 400,
            correct: true,
        }, // диаметр внешнего кольца
        externalRingThickness: {
            text: 'Толщина внешнего кольца',
            units: 'мм',
            value: 35,
            correct: true,
        },// Толщина внешнего кольца
        innerRingDiameter: {
            text: 'Диаметр внутреннего кольца внутренней стенки',
            units: 'мм',
            value: 200,
            correct: true,
        },  // диаметр внутреннего кольца
        innerRingThickness: {
            text: 'Толщина внутреннего кольца',
            units: 'мм',
            value: 35,
            correct: true,
        },// Толщина внутреннего кольца
        rollingElementDiameter: {
            text: 'Диаметр тела качения',
            units: 'мм',
            value: 50,
            correct: true,
        }, // диаметр тела качения
        numberOfRollingElements: {
            text: 'Количество тел качения',
            units: 'шт',
            value: 9,
            correct: true,
        }, // количество тел качения
        numberOfRollingElementFaces: {
            text: 'Число граней тел качения',
            units: 'шт',
            value: 9999,
            correct: true,
        }, // число граней тел качения
        contactAngleOfRollingElements: {
            text: 'Угол контакта тел качения',
            units: '°',
            value: 30,
            correct: true,
        }, // угол контакта тел качения
        elasticModulus: {
            text: 'Модуль упругости',
            units: 'Па',
            value: 999,
            correct: true,
        }, // модуль упругости
        specificDensityOfRollingElement: {
            text: 'Удельная плотность тела качения',
            units: 'кг/м^3',
            value: 999,
            correct: true,
        }, // удельная плотность тела качения
        vectorLoad: {
            text: 'Векторная нагрузка',
            units: '°',
            value: 90,
            correct: true,
        }, // векторная нагрузка
    },
    radioButton: {
        external: {
            text: 'Внешнее',
        },
        internal: {
            text: 'Внутреннее',
        },
        options: {
            text: 'Параметры'
        },
        defects: {
            text: 'Дефекты'
        }
    },
    radioGroup: {
        rotationRing: {
            title: 'Вращаение кольца',
            radioButtons: ['external', 'internal'],
            checked: 'external'
        }, // Вращение кольца
        optionsAndDefects: {
            radioButtons: ['options', 'defects'],
            checked: 'options'
        }, // Вращение кольца
    },
    button: {
        createSystem: {
            text: 'Отрисовать новую'
        },
        startSystem: {
            text: 'Запустить систему'
        },
        stopSystem: {
            text: 'Остановить систему'
        },
        updateSystem: {
            text: 'Обновить систему'
        }

    },
}

export const FormStartParametersSlice = createSlice({
    name: 'FormStartParameters',
    initialState,
    reducers: {
        onChangeInput: (state, action) => {
            const { type, value } = action.payload;

            // Обновляем значение входного поля
            state.input[type].value = value;

            // Извлекаем необходимые значения из состояния
            const {
                externalRingDiameter,
                innerRingDiameter,
                rollingElementDiameter,
                numberOfRollingElements,
                innerRingThickness,
                externalRingThickness
            } = state.input;


            // Преобразуем все значения в числа
            const extRingDiameter = Number(externalRingDiameter.value);
            const intRingDiameter = Number(innerRingDiameter.value);
            const rollElementDiameter = Number(rollingElementDiameter.value);
            const numRollingElements = Number(numberOfRollingElements.value);
            const intRingThick = Number(innerRingThickness.value);
            const extRingThick = Number(externalRingThickness.value);

            // Вычисляем толщину внутреннего и внешнего кольца, если изменяются диаметры
            if (type === 'externalRingDiameter' || type === 'innerRingDiameter' || type === 'rollingElementDiameter') {
                const thickness = ((extRingDiameter - intRingDiameter) / 2 - rollElementDiameter) / 2 + (rollElementDiameter / 5);

                // Обновляем значения толщин и их корректность
                state.input.externalRingThickness.value = thickness;
                state.input.innerRingThickness.value = thickness;
                state.input.externalRingThickness.correct = thickness > 0 && thickness > (rollElementDiameter / 5);
                state.input.innerRingThickness.correct = thickness > 0 && thickness > (rollElementDiameter / 5);
            }

            // Вычисляем толщину внутреннего кольца, если изменяется толщина внешнего кольца
            if (type === 'externalRingThickness') {
                state.input.innerRingThickness.value = ((extRingDiameter - intRingDiameter) / 2 - rollElementDiameter) - extRingThick + (rollElementDiameter / 5) * 2;
                // Обновляем корректность толщины внутреннего кольца
                state.input.innerRingThickness.correct = state.input.innerRingThickness.value > 0 && state.input.innerRingThickness.value > (rollElementDiameter / 5);
                state.input.externalRingThickness.correct = value > (rollElementDiameter / 5);
            }

            // Вычисляем толщину внешнего кольца, если изменяется толщина внутреннего кольца
            if (type === 'innerRingThickness') {
                state.input.externalRingThickness.value = ((extRingDiameter - intRingDiameter) / 2 - rollElementDiameter) - intRingThick + (rollElementDiameter / 5) * 2;

                // Обновляем корректность толщины внешнего кольца
                state.input.externalRingThickness.correct = state.input.externalRingThickness.value > 0 && state.input.externalRingThickness.value > (rollElementDiameter / 5);
                state.input.innerRingThickness.correct = value > (rollElementDiameter / 5);
            }

            // Проверяем корректность диаметров и количества элементов
            state.input.innerRingDiameter.correct = intRingDiameter < extRingDiameter && intRingDiameter > 0;
            //state.input.rollingElementDiameter.correct = extRingDiameter / 2 - intRingDiameter / 2 - +state.input.externalRingThickness.value  - +state.input.innerRingThickness.value + (rollElementDiameter / 5) * 2 > rollElementDiameter && rollElementDiameter > 0;
            console.log('+=+=> ', extRingDiameter / 2 - intRingDiameter / 2 - +state.input.externalRingThickness.value - +state.input.innerRingThickness.value + (rollElementDiameter / 5) * 2)
            //- +state.input.externalRingThickness - +state.input.innerRingThickness.value + (+rollElementDiameter / 5) * 2);

            // Вычисляем радиус сепаратора и проверяем количество элементов
            const rollingElementsExternalBorderDiameter = extRingDiameter - extRingThick;
            const rollingElementsInnerBorderDiameter = intRingDiameter + intRingThick;
            const separatorDiameter = (rollingElementsExternalBorderDiameter + rollingElementsInnerBorderDiameter) / 2;

            state.input.numberOfRollingElements.correct = Math.floor(Math.PI * separatorDiameter / rollElementDiameter) >= numRollingElements && numRollingElements > 0;



        },
        radioButtonChecked: (state, action) => {
            state.radioGroup[action.payload.typeGroup].checked = action.payload.type
        },
        changeStatus: (state, action) => {
            state.status[action.payload.type] = action.payload.value
        },
    },
})


export const {
    onChangeInput,
    radioButtonChecked,
    changeStatus
} = FormStartParametersSlice.actions

export default FormStartParametersSlice.reducer