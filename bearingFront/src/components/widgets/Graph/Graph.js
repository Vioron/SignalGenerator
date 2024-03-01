import styles from './Graph.module.css';
import classNames from 'classnames';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';

import { setActiveButton } from 'redux/GraphReducer';

const GraphButton = (item) => {

    const activeButton = useSelector((state) => state.Graph.activeButton);
    const dispatch = useDispatch()

    const type = item.item.type
    const key = item.item.key

    const activeStatus = activeButton === key ? styles.active : styles.notActive;

    const text = useSelector((state) => state.Graph.buttons[type])

    useEffect(() => {
        console.log('item => ', item.item.type);
        console.log('text => ', text);
    }, [text])

    const handleClick = () => {
        dispatch(setActiveButton(key));
    }

    return (
        <div
            onClick={handleClick}
            className={classNames(styles.button, activeStatus)}
            key={type === 'rollingElement' ? `${type}${key}` : `${type}`}
        >
            {type === 'rollingElement' ? `${text} ${key}` : `${text}`}
        </div>
    )
}


const Graph = () => {

    const activeButton = useSelector((state) => state.Graph.activeButton);


    const {
        coordinates: {
            x_coordinates_external_ring,
            y_coordinates_external_ring,
            x_coordinates_inner_ring,
            y_coordinates_inner_ring,
            x_coordinates_rolling_elements,
            y_coordinates_rolling_elements
        },
        labelGraph,
        xaxis: {
            title: xaxisTitle,
        },
        yaxis: {
            title: yaxisTitle,
        },
    } = useSelector((state) => state.Graph);


    const {
        status: {
            animation: statusAnimation,
        }
    } = useSelector((state) => state.FormStartParameters);

    const dispatch = useDispatch()

    const [width, setWidth] = useState(window.innerWidth * 0.82);
    const [height, setHeight] = useState(200);

    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1100) {
                setWidth(window.innerWidth * 0.82);
            } else {
                setWidth(window.innerWidth * 0.9);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [dataX, setDataX] = useState([]);
    const [dataY, setDataY] = useState([]);

    useEffect(() => {

        if (!statusAnimation) {
            setDataX([])
            setDataY([])
            dispatch(setActiveButton(null));
        }

        if (activeButton == 'externalRing') {
            setDataX(x_coordinates_external_ring)
            setDataY(y_coordinates_external_ring)
        }
        if (activeButton == 'innerRing') {
            setDataX(x_coordinates_inner_ring)
            setDataY(y_coordinates_inner_ring)
        }

        if (!isNaN(parseFloat(activeButton))) {
            if (activeButton != null) {
            setDataX(x_coordinates_rolling_elements[activeButton - 1])
            setDataY(y_coordinates_rolling_elements[activeButton - 1])
            }
        }

        if (!statusAnimation) {
            setDataX([])
            setDataY([])
            setActiveButton(null)
        }

    }, [activeButton, statusAnimation]);


    useEffect(() => {
        let newButtons = []

        if (statusAnimation) {

            if (x_coordinates_external_ring.length) {
                newButtons.push({ type: 'externalRing', key: 'externalRing' })
            }
            if (x_coordinates_inner_ring.length) {
                newButtons.push({ type: 'innerRing', key: 'innerRing' })
            }

            for (let i = 0; i < x_coordinates_rolling_elements.length; i++) {
                if (x_coordinates_rolling_elements[i].length) {
                    newButtons.push({ type: 'rollingElement', key: i + 1 })
                }
            }
        }

        setButtons(newButtons)

    }, [x_coordinates_external_ring, x_coordinates_inner_ring, x_coordinates_rolling_elements, statusAnimation]);




    const layout = {
        xaxis: {
            title: xaxisTitle,
        },
        yaxis: {
            title: yaxisTitle,
        },
        margin: { t: 15, r: 20, b: 35, l: 40 },
        width: width,
        height: height,
        dragmode: 'pan',
    };

    return (
        <div>
            <div style={{ width: width }}>
                <div className={styles.divGraphButtons}>

                    {
                        statusAnimation ?

                            buttons.map(item => (
                                <GraphButton item={item} />
                            )) :

                            (
                            <p className={styles.stopTitle}>{labelGraph}</p>
                            )
                            
                    }

                </div>
            </div>
            <Plot
                data={[
                    {
                        x: dataX,
                        y: dataY,
                        type: 'scatter',
                        mode: 'lines',
                        name: '',
                    },
                ]}
                layout={layout}
                scrollZoom={true}
                config={{
                    scrollZoom: true,
                    displayModeBar: false,
                }}
            />
        </div>
    );
};

export default Graph;
