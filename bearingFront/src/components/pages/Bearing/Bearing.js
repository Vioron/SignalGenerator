import styles from './Bearing.module.css';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';


import Canvas from 'components/widgets/Canvas/Canvas';
import Graph from 'components/widgets/Graph/Graph';
import FormStartParameters from 'components/widgets/FormStartParameters/FormStartParameters';

function Bearing() {

  const dispatch = useDispatch()

  return (
    <div className={styles.bearingBody}>
      <div className={styles.canvasAndForm}>
        <Canvas />
        <FormStartParameters />
      </div>
      <div>
        <Graph />
      </div>
    </div>
  );
}

export default Bearing
