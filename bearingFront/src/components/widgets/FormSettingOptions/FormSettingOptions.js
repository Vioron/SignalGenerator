import styles from './FormSettingOptions.module.css';

import { useSelector, useDispatch } from 'react-redux';

import FormSettingOptionsInput from 'components/entities/FormSettingOptionsInput/FormSettingOptionsInput';
import FormSettingOptionsButton from 'components/entities/FormSettingOptionsButton/FormSettingOptionsButton';
import FormSettingOptionsRadioGroup from 'components/features/FormSettingOptionsRadioGroup/FormSettingOptionsRadioGroup';

import { changeStatus } from 'redux/FormStartParametersReducer';
import { newDataGraph } from 'redux/GraphReducer';


import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing'
import { useEffect, useState } from 'react';

function FormSettingOptions() {

    const dispatch = useDispatch()

    const {
        radioGroup: { rotationRing },
        input: {
            rpm,
            externalRingDiameter,
            innerRingDiameter,
            rollingElementDiameter,
            innerRingThickness,
            externalRingThickness,
            numberOfRollingElements,
            numberOfRollingElementFaces,
            contactAngleOfRollingElements,
            elasticModulus,
            specificDensityOfRollingElement,
            vectorLoad
        },
        status: {
            animation: statusAnimation,
            statusCorrectData,
            statusCreateSystem
        }
    } = useSelector((state) => state.FormStartParameters);


    function createSystem() {
        dispatch(changeStatus({ type: 'animation', value: false }));

        const bearing = RadialBallBearing.getInstanse();
        bearing.setNewStartParams(
            rotationRing.checked,
            rpm.value, // обороты в минуту
            externalRingDiameter.value, // диаметр внешнего кольца
            innerRingDiameter.value, // диаметр внутреннего кольца
            rollingElementDiameter.value, // диаметр тела качения
            externalRingThickness.value,
            innerRingThickness.value,
            numberOfRollingElements.value, // количество тел качения
            numberOfRollingElementFaces.value, // количество граней тел качения
            contactAngleOfRollingElements.value, // угол контакта тел качения
            elasticModulus.value, // модуль упругости
            specificDensityOfRollingElement.value, // удельная плотность тела качения
            vectorLoad.value, // векторная нагрузка
        );
        bearing.draw()
        dispatch(changeStatus({ type: 'statusCreateSystem', value: true }))
    }

    useEffect(() => {
        const bearing = RadialBallBearing.getInstanse();

        const areValuesEqual =
            rotationRing.checked === bearing.rotationRing &&
            +rpm.value === +bearing.rpm &&
            +externalRingDiameter.value === +bearing.realExternalRingDiameter &&
            +innerRingDiameter.value === +bearing.realInnerRingDiameter &&
            +rollingElementDiameter.value === +bearing.realRollingElementDiameter &&
            +numberOfRollingElements.value === +bearing.numberOfRollingElements &&
            +numberOfRollingElementFaces.value === +bearing.numberOfRollingElementFaces &&
            +contactAngleOfRollingElements.value === +bearing.contactAngleOfRollingElements &&
            +elasticModulus.value === +bearing.elasticModulus &&
            +specificDensityOfRollingElement.value === +bearing.specificDensityOfRollingElement &&
            +vectorLoad.value === +bearing.vectorLoad &&
            +innerRingThickness.value === +bearing.realInnerRingThickness &&
            +externalRingThickness.value === +bearing.realExternalRingThickness;

        //console.log("areValuesEqual ====> ",  bearing.realExternalRingDiameter);

        const areValuesCorrect =
            ![
                rpm,
                externalRingDiameter,
                innerRingDiameter,
                rollingElementDiameter,
                numberOfRollingElements,
                numberOfRollingElementFaces,
                contactAngleOfRollingElements,
                elasticModulus,
                specificDensityOfRollingElement,
                vectorLoad,
                innerRingThickness,
                externalRingThickness,
            ].some((param) => param.value === '' || param.correct === false);

        dispatch(changeStatus({ type: 'statusCreateSystem', value: areValuesEqual }));
        dispatch(changeStatus({ type: 'statusCorrectData', value: areValuesCorrect }));
    }, [
        rotationRing,
        rpm,
        externalRingDiameter,
        innerRingDiameter,
        rollingElementDiameter,
        numberOfRollingElements,
        numberOfRollingElementFaces,
        contactAngleOfRollingElements,
        elasticModulus,
        specificDensityOfRollingElement,
        vectorLoad,
    ]);


    async function startSystem() {
        try {
          
            dispatch(changeStatus({ type: 'animation', value: true }));
            dispatch(changeStatus({ type: 'statusStartSystem', value: true }));

            const bearing = RadialBallBearing.getInstanse();
       
            const postData = {
                allParams: bearing.allParams,
                allDefects: bearing.allDefects
            };

            const apiUrl = 'http://localhost:8000/example';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            dispatch(newDataGraph({
                x_coordinates_rolling_elements: data.coordinates.x_coordinates_rolling_elements,
                y_coordinates_rolling_elements: data.coordinates.y_coordinates_rolling_elements,
                x_coordinates_inner_ring: data.coordinates.x_coordinates_inner_ring,
                y_coordinates_inner_ring: data.coordinates.y_coordinates_inner_ring,
                x_coordinates_external_ring: data.coordinates.x_coordinates_external_ring,
                y_coordinates_external_ring: data.coordinates.y_coordinates_external_ring
            }));

        } catch (error) {
            console.error('Error:', error);
        }

    }



    function stopSystem() {
        dispatch(changeStatus({ type: 'animation', value: false }))
        dispatch(changeStatus({ type: 'statusStartSystem', value: false }))
    }

    function updateSystem() {
        dispatch(changeStatus({ type: 'animation', value: false }))
        const bearing = RadialBallBearing.getInstanse();
        bearing.updateAngleToStarting()
        bearing.draw()
    }

    const arrayForFormSettingOptionsInput = [
        "rpm", "externalRingDiameter", "innerRingDiameter",
        "rollingElementDiameter", "externalRingThickness",
        "innerRingThickness", "numberOfRollingElements",
        "numberOfRollingElementFaces", "contactAngleOfRollingElements",
        "elasticModulus", "specificDensityOfRollingElement", "vectorLoad"
    ]

    return (
        <>
            <div className={styles.inputs}>
                <FormSettingOptionsRadioGroup type='rotationRing' />
                {arrayForFormSettingOptionsInput.map(type => (
                    <FormSettingOptionsInput key={type} type={type} />
                ))}
            </div>
            <div className={styles.button}>

                {!statusAnimation && (
                    <FormSettingOptionsButton
                        type='startSystem'
                        onClick={startSystem}
                        disabled={!statusCreateSystem}
                    />
                )}


                {statusAnimation && (
                    <FormSettingOptionsButton
                        type='stopSystem'
                        onClick={stopSystem}
                        disabled={!statusCreateSystem}
                    />
                )}


                <FormSettingOptionsButton
                    type='updateSystem'
                    onClick={updateSystem}
                    disabled={!statusCreateSystem}
                />


                {/* {!statusAnimation && ( */}
                <FormSettingOptionsButton
                    type='createSystem'
                    onClick={createSystem}
                    disabled={!statusCorrectData}
                />
                {/* )} */}

                {/* <FormSettingOptionsButton
                    type={statusAnimation ? 'stopSystem' : 'createSystem'}
                    onClick={statusAnimation ? stopSystem : createSystem}
                    disabled={!statusCorrectData || (statusAnimation && !statusCreateSystem)}
                /> */}

            </div>
        </>
    );
}

export default FormSettingOptions
