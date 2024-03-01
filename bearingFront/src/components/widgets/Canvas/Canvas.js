import styles from './Canvas.module.css';

import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing';


const Canvas = props => {

  const dispatch = useDispatch()

  const canvasRef = useRef(null)

  const statusAnimation = useSelector((state) => state.FormStartParameters.status.animation)

  const pageWidth = document.documentElement.scrollWidth
  const pageHeight = document.documentElement.scrollHeight

  useEffect(() => {
    const canvas = canvasRef.current;
    const bearing = RadialBallBearing.getInstanse();
    bearing.createCanvasBearing(canvas);
    bearing.draw();
  }, [])

  useEffect(() => {
    const bearing = RadialBallBearing.getInstanse();
    bearing.draw();
  }, [pageWidth, pageHeight])

  useEffect(() => {
    const bearing = RadialBallBearing.getInstanse();
    bearing.animation(statusAnimation)
  }, [statusAnimation])

  return (
    <div className={styles.divCanvas}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )

}

export default Canvas