
/** 
 * Класс для отрисовки векторной нагрузки и кругового транспортира на радиальном шариковом подшипнике.
 * @module DrawVectorLoadRadialBallBearing
 * @class 
 */
export default class DrawVectorLoadRadialBallBearing {

    constructor(context) {
        this.context = context;

        this.fullEllipse = [0, 2 * Math.PI] // параметпы для отрисовки полного эллипса
    }

    /**
   * Вычисляет угол альфа для стрелки вектора нагрузки.
   * @method
   * @memberof DrawVectorLoadRadialBallBearing
   * @param {number} angleOffsets - Смещение угла.
   * @returns {number} Угол альфа в радианах.
   */
    _alfaArrow(angleOffsets) {
        const alfaArrow = (-this.angleVectorLoad + angleOffsets) * Math.PI / 180;
        return alfaArrow;
    }

    /**
  * Рисует стрелку для визуализации вектора нагрузки.
  * @method
  * @memberof DrawVectorLoadRadialBallBearing
  * @param {number} centerX - Координата X центра холста.
  * @param {number} centerY - Координата Y центра холста.
  * @param {number} radiusVectorLoadX - Радиус вектора нагрузки по оси X.
  * @param {number} radiusVectorLoadY - Радиус вектора нагрузки по оси Y.
  * @param {number} innerRingRadiusXInnerSide - Радиус внутреннего кольца по оси X.
  * @param {number} innerRingRadiusYInnerSide - Радиус внутреннего кольца по оси Y.
  */
    _arrowVectorLoad(
        centerX,
        centerY,
        radiusVectorLoadX,
        radiusVectorLoadY,
        innerRingRadiusXInnerSide,
        innerRingRadiusYInnerSide,
    ) {
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.setLineDash([]);

        const arrowPoints = [
            { dx: -15, dy: -15, alfa: 3 },
            { dx: 7, dy: 7, alfa: 3 },
            { dx: 7, dy: 7, alfa: -3 },
            { dx: -15, dy: -15, alfa: -3 },
            { dx: -10, dy: -10, alfa: -5 },
            { dx: -10, dy: -10, alfa: -7 },
            { dx: -40, dy: -40, alfa: 0 },
            { dx: -10, dy: -10, alfa: 7 },
            { dx: -10, dy: -10, alfa: 5 },
            { dx: -15, dy: -15, alfa: 3 },
        ];

        for (const point of arrowPoints) {
            const x = (radiusVectorLoadX + point.dx) * Math.cos(this._alfaArrow(point.alfa)) + centerX;
            const y = (radiusVectorLoadY + point.dy) * Math.sin(this._alfaArrow(point.alfa)) + centerY;

            this.context.lineTo(x, y);
        }

        this.context.fillStyle = 'orange';
        this.context.fill();
        this.context.stroke();

        //Линия нагрузки 
        this._drawLoadLines(centerX, centerY, innerRingRadiusXInnerSide, innerRingRadiusYInnerSide, radiusVectorLoadX)
    }

    /**
   * Рисует линии для визуализации нагрузки.
   * @method
   * @memberof DrawVectorLoadRadialBallBearing
   * @param {number} centerX - Координата X центра холста.
   * @param {number} centerY - Координата Y центра холста.
   * @param {number} innerRingRadiusX - Радиус внутреннего кольца по оси X.
   * @param {number} innerRingRadiusY - Радиус внутреннего кольца по оси Y.
   * @param {number} radiusVectorLoadX - Радиус внешнего кольца по оси X.
   */
    _drawLoadLines(centerX, centerY, innerRingRadiusX, innerRingRadiusY, radiusVectorLoadX) {
        this.context.beginPath();
        this.context.strokeStyle = 'orange';
        this.context.lineWidth = 4;
        this.context.setLineDash([10, 10]);

        // Рисуем линии для внешнего кольца
        this.context.moveTo(
            (radiusVectorLoadX) * Math.cos(this._alfaArrow(0)) + centerX,
            (radiusVectorLoadX) * Math.sin(this._alfaArrow(0)) + centerY
        ); // Перемещаем перо в начальную точку
        this.context.lineTo(
            (radiusVectorLoadX - 48) * Math.cos(this._alfaArrow(0)) + centerX,
            (radiusVectorLoadX - 48) * Math.sin(this._alfaArrow(0)) + centerY
        ); // Рисуем линию

        // Рисуем линии для внутреннего кольца
        this.context.moveTo(
            (innerRingRadiusX - 5) * Math.cos(this._alfaArrow(0)) + centerX,
            (innerRingRadiusY - 5) * Math.sin(this._alfaArrow(0)) + centerY
        ); // Перемещаем перо
        this.context.lineTo(
            (innerRingRadiusX - 5) * Math.cos(this._alfaArrow(180)) + centerX,
            (innerRingRadiusY - 5) * Math.sin(this._alfaArrow(180)) + centerY
        ); // Рисуем линию

        this.context.moveTo(
            (radiusVectorLoadX) * Math.cos(this._alfaArrow(180)) + centerX,
            (radiusVectorLoadX) * Math.sin(this._alfaArrow(180)) + centerY
        ); // Перемещаем перо
        this.context.lineTo(
            (radiusVectorLoadX - 48) * Math.cos(this._alfaArrow(180)) + centerX,
            (radiusVectorLoadX - 48) * Math.sin(this._alfaArrow(180)) + centerY
        ); // Рисуем линию

        this.context.stroke(); // Завершаем рисование
    }

    /**
    * Рисует циркуль для измерения углов.
    * @method
    * @memberof DrawVectorLoadRadialBallBearing
    * @param {number} centerX - Координата X центра холста.
    * @param {number} centerY - Координата Y центра холста.
    * @param {number} radiusVectorLoadX - Радиус X циркуля.
    * @param {number} radiusVectorLoadY - Радиус Y циркуля.
    */
    circularProtractor(centerX, centerY, radiusVectorLoadX, radiusVectorLoadY) {
        // Начинаем круговой транспортир 
        this.context.beginPath();
        this.context.strokeStyle = 'black'; // Устанавливаем цвет линии
        this.context.lineWidth = 3; // Устанавливаем ширину линии
        this.context.setLineDash([]); // Отключаем пунктирный стиль линии
        this.context.ellipse(centerX, centerY, radiusVectorLoadX, radiusVectorLoadY, 0, ...this.fullEllipse); // Рисуем эллипс
        this.context.stroke(); // Завершаем рисование контура циркуля

        for (let i = 0; i < 360; i += 5) {
            let angle = -i;
            let Alfa = angle * Math.PI / 180;
            let xFirstEdgeSegmentation = radiusVectorLoadX * Math.cos(Alfa) + centerX;
            let yFirstEdgeSegmentation = radiusVectorLoadY * Math.sin(Alfa) + centerY;

            let xSecondEdgeSegmentation;
            let ySecondEdgeSegmentation;

            this.context.fillStyle = 'black'; // Устанавливаем цвет заливки

            if (angle % 10 == 0) {
                if (angle % 90 == 0) {
                    xSecondEdgeSegmentation = (radiusVectorLoadX - 30) * Math.cos(Alfa) + centerX;
                    ySecondEdgeSegmentation = (radiusVectorLoadY - 30) * Math.sin(Alfa) + centerY;


                    const sizeText = 22;
                    this.context.font = `${this.sizeText}px serif`; // Устанавливаем шрифт и размер текста


                    // Рисуем текстовые метки для главных делений
                    if (angle == 0) {
                        this.context.fillText(-1 * angle, (radiusVectorLoadX + sizeText) * Math.cos(Alfa) + centerX, (radiusVectorLoadY) * Math.sin(Alfa) + centerY + 5);
                    }
                    if (angle == -90) {
                        const maxLabelWidth = (this.context.measureText(Math.abs(angle)).width); // Максимальная ширина текстовой метки

                        this.context.fillText(-1 * angle, (radiusVectorLoadX) * Math.cos(Alfa) + centerX - maxLabelWidth / 2, (radiusVectorLoadY + sizeText) * Math.sin(Alfa) + centerY);
                    }
                    if (angle == -180) {
                        const maxLabelWidth = (this.context.measureText(Math.abs(angle)).width + sizeText); // Максимальная ширина текстовой метки
                        this.context.fillText(-1 * angle, (radiusVectorLoadX + maxLabelWidth) * Math.cos(Alfa) + centerX, (radiusVectorLoadY) * Math.sin(Alfa) + centerY + 5);
                    }
                    if (angle == -270) {
                        const maxLabelWidth = (this.context.measureText(Math.abs(angle)).width); // Максимальная ширина текстовой метки

                        this.context.fillText(-1 * angle, (radiusVectorLoadX) * Math.cos(Alfa) + centerX - maxLabelWidth / 2, (radiusVectorLoadY + sizeText * 2) * Math.sin(Alfa) + centerY);
                    }
                }
                else {
                    xSecondEdgeSegmentation = (radiusVectorLoadX - 20) * Math.cos(Alfa) + centerX;
                    ySecondEdgeSegmentation = (radiusVectorLoadY - 20) * Math.sin(Alfa) + centerY;
                }
            }
            else {
                xSecondEdgeSegmentation = (radiusVectorLoadX - 10) * Math.cos(Alfa) + centerX;
                ySecondEdgeSegmentation = (radiusVectorLoadY - 10) * Math.sin(Alfa) + centerY;
            }

            // Рисуем деления на  круговом транспортире 
            this.context.beginPath();
            this.context.strokeStyle = 'black'; // Устанавливаем цвет линии
            this.context.lineWidth = 3; // Устанавливаем ширину линии
            this.context.setLineDash([]); // Отключаем пунктирный стиль линии
            this.context.moveTo(xFirstEdgeSegmentation, yFirstEdgeSegmentation); // Перемещаем перо в начальную точку
            this.context.lineTo(xSecondEdgeSegmentation, ySecondEdgeSegmentation); // Рисуем линию
            this.context.stroke(); // Завершаем рисование контура
        }
    }

    /**
    * Рисует векторную нагрузку на подшипнике.
    * @method
    * @memberof DrawVectorLoadRadialBallBearing
    * @param {number} centerX - Координата X центра холста.
    * @param {number} centerY - Координата Y центра холста.
    * @param {number} innerRingRadiusXInnerSide - Радиус X внутреннего кольца с внутренней стороны.
    * @param {number} innerRingRadiusYInnerSide - Радиус Y внутреннего кольца с внутренней стороны.
    * @param {number} vectorLoad - Угол векторной нагрузки.
    */
    vectorLoad(centerX, centerY, innerRingRadiusXInnerSide, innerRingRadiusYInnerSide, vectorLoad) {
        const radiusVectorLoadX = 250;
        const radiusVectorLoadY = 250;

        this.angleVectorLoad = +vectorLoad;

        // Рисует стрелку векторной нагрузки
        this._arrowVectorLoad(
            centerX,
            centerY,
            radiusVectorLoadX,
            radiusVectorLoadY,
            innerRingRadiusXInnerSide,
            innerRingRadiusYInnerSide
        );

        // Рисует круговой транспортир 
        this.circularProtractor(centerX, centerY, radiusVectorLoadX, radiusVectorLoadY);
    }
}