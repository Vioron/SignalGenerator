
/**
 * Класс по отрисовки дефектов
 * @module DefectsRadialBallBearing
 * @class 
 */
export default class DefectsRadialBallBearing {

    constructor(context) {
        this.context = context;
        this.strokeStyleDefect = "#CA1616";
        this.lineWidtDefecth = 4;
    }

    /**
 * Рисует дефект внутреннего кольца подшипника.
 * @method
 * @memberof DefectsRadialBallBearing
 * @param {number} centerX - Координата X центра холста.
 * @param {number} centerY - Координата Y центра дефекта.
 * @param {number} startAngle - Угол начала дефекта (в градусах).
 * @param {number} finishAngle - Угол окончания дефекта (в градусах).
 * @param {string} rotationRing - Направление вращения кольца ('internal' для внутреннего, 'external' для внешнего).
 * @param {number} angleOffsetShaft - Смещение угла вращения вала (в градусах) при внутреннем вращении.
 * @param {number} rollingElementsInnerBorderRadiusX - Радиус X внутренней границы качения элементов.
 * @param {number} rollingElementsInnerBorderRadiusY - Радиус Y внутренней границы качения элементов.
 */
    _defectInnerRing(
        centerX,
        centerY,
        startAngle,
        finishAngle,
        rotationRing,
        angleOffsetShaft,
        rollingElementsInnerBorderRadiusX,
        rollingElementsInnerBorderRadiusY,
    ) {
        // Преобразуем углы в радианы
        const startAlfa = startAngle * Math.PI / 180;
        const finishAlfa = finishAngle * Math.PI / 180;

        let additionalAlfa = 0;
        if (rotationRing === 'internal') {
            // Если внутреннее вращение, добавляем смещение угла
            additionalAlfa = angleOffsetShaft * Math.PI / 180;
        }

        // Начинаем рисовать дефект
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleDefect;
        this.context.lineWidth = this.lineWidtDefecth;
        this.context.fillStyle = "rgba(0, 0, 0, 0)"; // Прозрачный цвет заливки

        // Рисуем эллипс с заданными параметрами
        this.context.ellipse(
            centerX,
            centerY,
            rollingElementsInnerBorderRadiusX,
            rollingElementsInnerBorderRadiusY,
            additionalAlfa,
            startAlfa,
            finishAlfa
        );

        this.context.fill(); // Заливаем фигуру
        this.context.stroke(); // Рисуем контур дефекта
    }

    /**
  * Рисует дефекты внутреннего кольца подшипника.
  * @method
  * @memberof DefectsRadialBallBearing
  * @param {number} centerX - Координата X центра холста.
  * @param {number} centerY - Координата Y центра холста.
  * @param {Array} defectsInnerRing - Массив объектов с углами начала и окончания дефектов.
  * @param {number} startAngle - Угол начала дефекта (в градусах).
  * @param {number} finishAngle - Угол окончания дефекта (в градусах).
  * @param {string} rotationRing - Направление вращения кольца ('internal' для внутреннего, 'external' для внешнего).
  * @param {number} angleOffsetShaft - Смещение угла вращения вала (в градусах) при внутреннем вращении.
  * @param {number} rollingElementsInnerBorderRadiusX - Радиус X внутренней границы качения элементов.
  * @param {number} rollingElementsInnerBorderRadiusY - Радиус Y внутренней границы качения элементов.
  */
    innerRing(
        centerX,
        centerY,
        defectsInnerRing,
        startAngle,
        finishAngle,
        rotationRing,
        angleOffsetShaft,
        rollingElementsInnerBorderRadiusX,
        rollingElementsInnerBorderRadiusY,
    ) {
        // Перебираем массив дефектов внутреннего кольца
        for (let i = 0; i < defectsInnerRing.length; i++) {
            const defect = defectsInnerRing[i];

            // Рисуем дефект внутреннего кольца
            this._defectInnerRing(
                centerX,
                centerY,
                360 - defect.finishAngle,
                360 - defect.startAngle,
                startAngle,
                finishAngle,
                rotationRing,
                angleOffsetShaft,
                rollingElementsInnerBorderRadiusX,
                rollingElementsInnerBorderRadiusY,
            );
        }
    }

    /**
     * Рисует дефекты внешнего кольца подшипника.
     * @method
     * @memberof DefectsRadialBallBearing
     * @param {number} centerX - Координата X центра холста.
     * @param {number} centerY - Координата Y центра холста.
     * @param {number} startAngle - Угол начала дефекта (в градусах).
     * @param {number} finishAngle - Угол окончания дефекта (в градусах).
     * @param {string} rotationRing - Направление вращения кольца ('internal' для внутреннего, 'external' для внешнего).
     * @param {number} angleOffsetShaft - Смещение угла вращения вала (в градусах) при внешнем вращении.
     * @param {number} rollingElementsExternalBorderRadiusX - Радиус X внешней границы качения элементов.
     * @param {number} rollingElementsExternalBorderRadiusY - Радиус Y внешней границы качения элементов.
     */
    _defectExternalRing(
        centerX,
        centerY,
        startAngle,
        finishAngle,
        rotationRing,
        angleOffsetShaft,
        rollingElementsExternalBorderRadiusX,
        rollingElementsExternalBorderRadiusY,
    ) {
        // Преобразуем углы начала и окончания дефекта в радианы
        const startAlfa = startAngle * Math.PI / 180;
        const finishAlfa = finishAngle * Math.PI / 180;

        let additionalAlfa = 0;

        // Если кольцо вращается внешним образом, учитываем смещение угла вращения вала
        if (rotationRing === 'external') {
            additionalAlfa = angleOffsetShaft * Math.PI / 180;
        }

        // Начинаем рисование
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleDefect;
        this.context.lineWidth = this.lineWidtDefecth;
        this.context.fillStyle = "rgb(0, 0, 0, 0)";
        this.context.ellipse(
            centerX,
            centerY,
            rollingElementsExternalBorderRadiusX,
            rollingElementsExternalBorderRadiusY,
            additionalAlfa,
            startAlfa,
            finishAlfa
        );
        this.context.fill();
        this.context.stroke();
    }

    /**
  * Рисует дефекты внешнего кольца подшипника.
  * @method
  * @memberof DefectsRadialBallBearing
  * @param {number} centerX - Координата X центра холста.
  * @param {number} centerY - Координата Y центра холста.
  * @param {Array} defectsExternalRing - Массив объектов с углами начала и окончания дефектов (в градусах).
  * @param {string} rotationRing - Направление вращения кольца ('internal' для внутреннего, 'external' для внешнего).
  * @param {number} angleOffsetShaft - Смещение угла вращения вала (в градусах) при внешнем вращении.
  * @param {number} rollingElementsExternalBorderRadiusX - Радиус X внешней границы качения элементов.
  * @param {number} rollingElementsExternalBorderRadiusY - Радиус Y внешней границы качения элементов.
  */
    externalRing(
        centerX,
        centerY,
        defectsExternalRing,
        rotationRing,
        angleOffsetShaft,
        rollingElementsExternalBorderRadiusX,
        rollingElementsExternalBorderRadiusY,
    ) {
        // Обходим массив дефектов
        for (let i = 0; i < defectsExternalRing.length; i++) {
            // Рисуем каждый дефект, конвертируя углы начала и окончания
            this._defectExternalRing(
                centerX, centerY,
                360 - defectsExternalRing[i].finishAngle,
                360 - defectsExternalRing[i].startAngle,
                rotationRing,
                angleOffsetShaft,
                rollingElementsExternalBorderRadiusX,
                rollingElementsExternalBorderRadiusY,
            );
        }
    }

    /**
   * Рисует дефекты тел качений подшипника.
   * @method
   * @memberof DefectsRadialBallBearing
   * @param {number} centerX - Координата X центра холста.
   * @param {number} centerY - Координата Y центра холста.
   * @param {number} startAngle - Угол начала дефекта (в градусах).
   * @param {number} finishAngle - Угол окончания дефекта (в градусах).
   * @param {number} numberRollingElement - Номер качающегося элемента.
   * @param {number} numberOfRollingElements - Общее количество качающихся элементов.
   * @param {number} angleOffsetSeparator - Смещение угла разделителя (в градусах).
   * @param {number} separatorRadiusX - Радиус X разделителя.
   * @param {number} separatorRadiusY - Радиус Y разделителя.
   * @param {number} angleOffsetRollingElement - Смещение угла качающегося элемента (в градусах).
   * @param {number} rollingElementRadiusX - Радиус X качающегося элемента.
   * @param {number} rollingElementRadiusY - Радиус Y качающегося элемента.
   * @param {number} rotationSign - Знак вращения элемента (-1 для обратного, 1 для прямого).
   */
    _defectRollingElement(
        centerX,
        centerY,
        startAngle,
        finishAngle,
        numberRollingElement,
        numberOfRollingElements,
        angleOffsetSeparator,
        separatorRadiusX,
        separatorRadiusY,
        angleOffsetRollingElement,
        rollingElementRadiusX,
        rollingElementRadiusY,
        rotationSign
    ) {
        // Вычисляем угол сепоратора
        let AlfaSeparator = (angleOffsetSeparator + (numberRollingElement - 1) * 360 / numberOfRollingElements) * Math.PI / 180;

        // Вычисляем координаты тела качения
        let xRollingElement = separatorRadiusX * Math.cos(AlfaSeparator) + centerX;
        let yRollingElement = separatorRadiusY * Math.sin(AlfaSeparator) + centerY;

        // Вычисляем угол дефекта на теле качения
        let AlfaRollingElement = rotationSign * angleOffsetRollingElement * Math.PI / 180;

        // Преобразуем углы в радианы
        let startAlfa = startAngle * Math.PI / 180;
        let finishAlfa = finishAngle * Math.PI / 180;

        // Рисуем дефект в теле качения
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleDefect;
        this.context.lineWidth = this.lineWidtDefecth;
        this.context.fillStyle = "rgb(0, 0, 0, 0)";
        this.context.ellipse(
            xRollingElement,
            yRollingElement,
            rollingElementRadiusX,
            rollingElementRadiusY,
            AlfaRollingElement,
            finishAlfa,
            startAlfa,
        );
        this.context.fill();
        this.context.stroke();
    }

    /**
   * Рисует дефекты в качающемся элементе подшипника.
   * @method
   * @memberof DefectsRadialBallBearing
   * @param {number} centerX - Координата X центра холста.
   * @param {number} centerY - Координата Y центра холста.
   * @param {number} defectsRollingElements - Массив объектов с информацией о дефектах.
   * @param {number} numberOfRollingElements - Общее количество качающихся элементов.
   * @param {number} angleOffsetSeparator - Смещение угла разделителя (в градусах).
   * @param {number} separatorRadiusX - Радиус X разделителя.
   * @param {number} separatorRadiusY - Радиус Y разделителя.
   * @param {number} angleOffsetRollingElement - Смещение угла качающегося элемента (в градусах).
   * @param {number} rollingElementRadiusX - Радиус X качающегося элемента.
   * @param {number} rollingElementRadiusY - Радиус Y качающегося элемента.
   * @param {number} rotationSign - Знак вращения элемента (-1 для обратного, 1 для прямого).
   */
    rollingElement(
        centerX,
        centerY,
        defectsRollingElements,
        numberOfRollingElements,
        angleOffsetSeparator,
        separatorRadiusX,
        separatorRadiusY,
        angleOffsetRollingElement,
        rollingElementRadiusX,
        rollingElementRadiusY,
        rotationSign
    ) {
        for (let i = 0; i < defectsRollingElements.length; i++) {
            this._defectRollingElement(
                centerX, centerY,
                defectsRollingElements[i].startAngle * -1,
                defectsRollingElements[i].finishAngle * -1,
                defectsRollingElements[i].numberRollingElement,
                numberOfRollingElements,
                angleOffsetSeparator,
                separatorRadiusX,
                separatorRadiusY,
                angleOffsetRollingElement,
                rollingElementRadiusX,
                rollingElementRadiusY,
                rotationSign
            );
        }
    }

    /**
  * Рисует стрелку "из" с указанными параметрами.
  * @method
  * @memberof DefectsRadialBallBearing
  * @param {number} centerX - Координата X центра холста.
  * @param {number} centerY - Координата Y центра холста.
  * @param {number} radiusUpToButtX - Радиус до начала заготовки по оси X.
  * @param {number} radiusUpToButtY - Радиус до начала заготовки по оси Y.
  * @param {number} radiusUpToTipX - Радиус до кончика стрелки по оси X.
  * @param {number} radiusUpToTipY - Радиус до кончика стрелки по оси Y.
  * @param {number} AlfaDistortion - Угол искривления стрелки в радианах.
  * @param {number} AlfaBiasButt - Смещение заготовки стрелки в радианах.
  */
    _pointerFrom(
        centerX, centerY,
        radiusUpToButtX,
        radiusUpToButtY,
        radiusUpToTipX,
        radiusUpToTipY,
        AlfaDistortion,
        AlfaBiasButt
    ) {
        let xLeftButt = radiusUpToButtX * Math.cos(AlfaDistortion + AlfaBiasButt) + centerX;
        let yLeftButt = radiusUpToButtY * Math.sin(AlfaDistortion + AlfaBiasButt) + centerY;
        let xRightButt = radiusUpToButtX * Math.cos(AlfaDistortion - AlfaBiasButt) + centerX;
        let yRightButt = radiusUpToButtY * Math.sin(AlfaDistortion - AlfaBiasButt) + centerY;

        let xTip = radiusUpToTipX * Math.cos(AlfaDistortion) + centerX;
        let yTip = radiusUpToTipY * Math.sin(AlfaDistortion) + centerY;

        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.setLineDash([]);
        this.context.moveTo(
            xLeftButt,
            yLeftButt
        ); // Перемещаем перо
        this.context.lineTo(
            xRightButt,
            yRightButt
        ); // Рисуем линию от левой заготовки
        this.context.lineTo(
            xTip,
            yTip
        ); // Рисуем линию до кончика стрелки
        this.context.lineTo(
            xLeftButt,
            yLeftButt
        ); // Замыкаем стрелку

        this.context.fillStyle = 'red';
        this.context.fill(); // Заполняем стрелку цветом

        this.context.stroke(); // Рисуем контур стрелки
    }

    /**
        * Рисует стрелку "в" с указанными параметрами.
        * @method
        * @memberof DefectsRadialBallBearing
        * @param {number} centerX - Координата X центра холста.
        * @param {number} centerY - Координата Y центра холста.
        * @param {number} radiusUpToTipX - Радиус до кончика стрелки по оси X.
        * @param {number} radiusUpToTipY - Радиус до кончика стрелки по оси Y.
        * @param {number} radiusUpToButtX - Радиус до начала заготовки по оси X.
        * @param {number} radiusUpToButtY - Радиус до начала заготовки по оси Y.
        * @param {number} AlfaDistortion - Угол искривления стрелки в радианах.
        * @param {number} AlfaBiasButt - Смещение заготовки стрелки в радианах.
        */
    _pointerIn(
        centerX, centerY,
        radiusUpToTipX,
        radiusUpToTipY,
        radiusUpToButtX,
        radiusUpToButtY,
        AlfaDistortion,
        AlfaBiasButt
    ) {
        let xLeftButt = radiusUpToButtX * Math.cos(AlfaDistortion + AlfaBiasButt) + centerX;
        let yLeftButt = radiusUpToButtY * Math.sin(AlfaDistortion + AlfaBiasButt) + centerY;
        let xRightButt = radiusUpToButtX * Math.cos(AlfaDistortion - AlfaBiasButt) + centerX;
        let yRightButt = radiusUpToButtY * Math.sin(AlfaDistortion - AlfaBiasButt) + centerY;

        let xTip = radiusUpToTipX * Math.cos(AlfaDistortion) + centerX;
        let yTip = radiusUpToTipY * Math.sin(AlfaDistortion) + centerY;

        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.setLineDash([]);
        this.context.moveTo(
            xLeftButt,
            yLeftButt
        ); // Перемещаем перо
        this.context.lineTo(
            xRightButt,
            yRightButt
        ); // Рисуем линию от левой заготовки
        this.context.lineTo(
            xTip,
            yTip
        ); // Рисуем линию до кончика стрелки
        this.context.lineTo(
            xLeftButt,
            yLeftButt
        ); // Замыкаем стрелку

        this.context.fillStyle = 'red';
        this.context.fill(); // Заполняем стрелку цветом

        this.context.stroke(); // Рисуем контур стрелки
    }

    /**
     * Рисует стрелки с учетом заданных параметров (наклон внутреннего кольца).
     * @method
     * @memberof DefectsRadialBallBearing
     * @param {number} centerX - Координата X центра холста.
     * @param {number} centerY - Координата Y центра холста.
     * @param {Object} tiltAndAngleInnerDirection - Объект с параметрами наклона и угла направления для искаженных стрелок.
     * @param {number} innerRingRadiusXInnerSide - Радиус X внутреннего кольца с внутренней стороны.
     * @param {number} innerRingRadiusYInnerSide - Радиус Y внутреннего кольца с внутренней стороны.
     * @param {number} rollingElementsInnerBorderRadiusX - Радиус X граничных элементов внутреннего кольца.
     * @param {number} rollingElementsInnerBorderRadiusY - Радиус Y граничных элементов внутреннего кольца.
     */
    innerRingDistortion(
        centerX, centerY,
        tiltAndAngleInnerDirection,
        innerRingRadiusXInnerSide,
        innerRingRadiusYInnerSide,
        rollingElementsInnerBorderRadiusX,
        rollingElementsInnerBorderRadiusY
    ) {

        if (tiltAndAngleInnerDirection !== null) {

            let AlfaDistortionFrom = -1 * tiltAndAngleInnerDirection.tiltDirection * Math.PI / 180;
            let AlfaDistortionIn = (-1 * tiltAndAngleInnerDirection.tiltDirection - 180) * Math.PI / 180;

            let AlfaBiasButtFrom = 7 * Math.PI / 180;
            let AlfaBiasButtIn = 5 * Math.PI / 180;


            // Рисуем  стрелку от центра 
            this._pointerFrom(
                centerX, centerY,
                innerRingRadiusXInnerSide,
                innerRingRadiusYInnerSide,
                rollingElementsInnerBorderRadiusX,
                rollingElementsInnerBorderRadiusY,
                AlfaDistortionFrom,
                AlfaBiasButtFrom
            );

            // Рисуем  стрелку в центре
            this._pointerIn(
                centerX, centerY,
                innerRingRadiusXInnerSide,
                innerRingRadiusYInnerSide,
                rollingElementsInnerBorderRadiusX,
                rollingElementsInnerBorderRadiusY,
                AlfaDistortionIn,
                AlfaBiasButtIn
            );
        }
    }

    /**
  * Рисует стрелки с учетом заданных параметров (наклон внешнего кольца).
  * @method
  * @memberof DefectsRadialBallBearing
  * @param {number} centerX - Координата X центра холста.
  * @param {number} centerY - Координата Y центра холста.
  * @param {Object} tiltAndAngleExternalDirection - Объект с параметрами наклона и угла направления для искаженных стрелок.
  * @param {number} innerRingRadiusXInnerSide - Радиус X внутреннего кольца с внутренней стороны.
  * @param {number} innerRingRadiusYInnerSide - Радиус Y внутреннего кольца с внутренней стороны.
  * @param {number} rollingElementsInnerBorderRadiusX - Радиус X граничных элементов внутреннего кольца.
  * @param {number} rollingElementsInnerBorderRadiusY - Радиус Y граничных элементов внутреннего кольца.
  */
    externalRingDistortion(
        centerX, centerY,
        tiltAndAngleExternalDirection,
        innerRingRadiusXInnerSide,
        innerRingRadiusYInnerSide,
        rollingElementsInnerBorderRadiusX,
        rollingElementsInnerBorderRadiusY
    ) {

        if (tiltAndAngleExternalDirection !== null) {

            let AlfaDistortionFrom = -1 * tiltAndAngleExternalDirection.tiltDirection * Math.PI / 180;
            let AlfaDistortionIn = (-1 * tiltAndAngleExternalDirection.tiltDirection - 180) * Math.PI / 180;

            let AlfaBiasButtFrom = 6 * Math.PI / 180;
            let AlfaBiasButtIn = 5 * Math.PI / 180;

            // Рисуем стрелку от центра 
            this._pointerFrom(
                centerX, centerY,
                innerRingRadiusXInnerSide,
                innerRingRadiusYInnerSide,
                rollingElementsInnerBorderRadiusX,
                rollingElementsInnerBorderRadiusY,
                AlfaDistortionFrom,
                AlfaBiasButtFrom
            );

            // Рисуем стрелку в центре
            this._pointerIn(
                centerX, centerY,
                innerRingRadiusXInnerSide,
                innerRingRadiusYInnerSide,
                rollingElementsInnerBorderRadiusX,
                rollingElementsInnerBorderRadiusY,
                AlfaDistortionIn,
                AlfaBiasButtIn
            );
        }
    }

    /**
    * Рисует стрелки для отображения направления несоосности.
    * @method
    * @memberof DefectsRadialBallBearing
    * @param {number} centerX - Координата X центра холста.
    * @param {number} centerY - Координата Y центра холста.
    * @param {number} tilt - Угол напровления несоосности.
    * @param {number} innerRingRadiusXInnerSide - Радиус X внутреннего кольца с внутренней стороны.
    * @param {number} innerRingRadiusYInnerSide - Радиус Y внутреннего кольца с внутренней стороны.
    * @param {number} rollingElementsInnerBorderRadiusX - Радиус X граничных элементов внутреннего кольца.
    * @param {number} rollingElementsInnerBorderRadiusY - Радиус Y граничных элементов внутреннего кольца.
    * @param {number} externalRingRadiusXExternalSide - Радиус X внешнего кольца с внешней стороны.
    * @param {number} externalRingRadiusYExternalSide - Радиус Y внешнего кольца с внешней стороны.
    * @param {number} rollingElementsExternalBorderRadiusX - Радиус X граничных элементов внешнего кольца.
    * @param {number} rollingElementsExternalBorderRadiusY - Радиус Y граничных элементов внешнего кольца.
    */
    misalignment(
        centerX, centerY,
        tilt,
        innerRingRadiusXInnerSide,
        innerRingRadiusYInnerSide,
        rollingElementsInnerBorderRadiusX,
        rollingElementsInnerBorderRadiusY,
        externalRingRadiusXExternalSide,
        externalRingRadiusYExternalSide,
        rollingElementsExternalBorderRadiusX,
        rollingElementsExternalBorderRadiusY
    ) {

        if (tilt !== null) {

            let AlfaDistortionFrom = -1 * tilt * Math.PI / 180;
            let AlfaDistortionIn = -1 * tilt * Math.PI / 180;

            let AlfaBiasButtFrom = 6 * Math.PI / 180;
            let AlfaBiasButtIn = 3 * Math.PI / 180;

            // Рисуем искаженную стрелку от центра по направлению
            this._pointerFrom(
                centerX, centerY,
                innerRingRadiusXInnerSide,
                innerRingRadiusYInnerSide,
                rollingElementsInnerBorderRadiusX,
                rollingElementsInnerBorderRadiusY,
                AlfaDistortionFrom,
                AlfaBiasButtFrom
            );

            // Рисуем искаженную стрелку в центре
            this._pointerIn(
                centerX, centerY,
                rollingElementsExternalBorderRadiusX,
                rollingElementsExternalBorderRadiusY,
                externalRingRadiusXExternalSide,
                externalRingRadiusYExternalSide,
                AlfaDistortionIn,
                AlfaBiasButtIn
            );
        }
    }

}