import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    coordinates: {
        x_coordinates_rolling_elements: [],
        y_coordinates_rolling_elements: [],
        x_coordinates_inner_ring: [],
        y_coordinates_inner_ring: [],
        x_coordinates_external_ring: [],
        y_coordinates_external_ring: []
    },
    activeButton: null,
    labelGraph:'Запустите систему для отображение графиков',
    buttons: {
        externalRing: 'Внешнее кольцо',
        innerRing: 'Внутренее кольцо',
        rollingElement: 'Тело качения'
    },
    xaxis: {
        title: 'Время, сек',
    },
    yaxis: {
        title: 'Амплитуда, мм',
    },
}

export const GraphSlice = createSlice({
    name: 'Graph',
    initialState,
    reducers: {
        newDataGraph: (state, action) => {
            state.coordinates.x_coordinates_rolling_elements = action.payload.x_coordinates_rolling_elements
            state.coordinates.y_coordinates_rolling_elements = action.payload.y_coordinates_rolling_elements
            state.coordinates.x_coordinates_inner_ring = action.payload.x_coordinates_inner_ring
            state.coordinates.y_coordinates_inner_ring = action.payload.y_coordinates_inner_ring
            state.coordinates.x_coordinates_external_ring = action.payload.x_coordinates_external_ring
            state.coordinates.y_coordinates_external_ring = action.payload.y_coordinates_external_ring
        },
        setActiveButton: (state, action) => {
            state.activeButton = action.payload
        },
    },
})


export const {
    newDataGraph,
    setActiveButton
} = GraphSlice.actions

export default GraphSlice.reducer