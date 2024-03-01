/**
 * Класс для отрисовки элементов демонстрирующих маштабирование.
 * @module DrawScalingConventions
 * @class 
 */
export default class DrawScalingConventions {

    constructor(context) {
        this.context = context;
        this.fullEllipse = [0, 2 * Math.PI] // параметпы для отрисовки полного эллипса
    }

    /**
     * Отрисовывает двустороннюю стрелку.
     * @method
     * @memberof DrawScalingConventions
     * @param {number} centerX - Координата X центра холста.
     * @param {number} centerY - Координата Y центра холста.
     * @param {number} externalRingRadiusXExternalSide - Радиус X внешнего кольца.
     * @param {number} externalRingRadiusYExternalSide - Радиус Y внешнего кольца.
     */
    doubleSidedArrow(
        centerX,
        centerY,
        externalRingRadiusXExternalSide,
        externalRingRadiusYExternalSide
    ) {
        // Углы для левой и правой точек стрелки
        const leftAngle = 180 * Math.PI / 180;
        const rightAngle = 0 * Math.PI / 180;

        // Вычисление координат левой и правой нижних точек стрелки
        const leftX = externalRingRadiusXExternalSide * Math.cos(leftAngle) + centerX;
        const leftY = externalRingRadiusYExternalSide * Math.sin(leftAngle) + centerY + 320;
        const rightX = externalRingRadiusXExternalSide * Math.cos(rightAngle) + centerX;
        const rightY = externalRingRadiusYExternalSide * Math.sin(rightAngle) + centerY + 320;

        // Координаты точек для левой и правой части стрелки
        const leftArrowPoints = [
            { x: 20, y: -10 },
            { x: 0, y: 0 },
            { x: 20, y: 10 },
        ];
        const rightArrowPoints = [
            { x: -20, y: -10 },
            { x: 0, y: 0 },
            { x: -20, y: 10 },
        ];

        this.context.strokeStyle = 'grey';
        this.context.lineWidth = 3;
        this.context.setLineDash([]);

        // Отрисовка левой части стрелки
        this.context.beginPath();
        this.context.moveTo(leftX, leftY);
        for (let i = 0; i < leftArrowPoints.length; i++) {
            this.context.lineTo(leftX + leftArrowPoints[i].x, leftY + leftArrowPoints[i].y);
        }
        this.context.stroke();

        // Отрисовка правой части стрелки
        this.context.beginPath();
        this.context.moveTo(rightX, rightY);
        for (let i = 0; i < rightArrowPoints.length; i++) {
            this.context.lineTo(rightX + rightArrowPoints[i].x, rightY + rightArrowPoints[i].y);
        }
        this.context.stroke();

        // Отрисовка горизонтальной линии между левой и правой частями стрелки
        this.context.beginPath();
        this.context.moveTo(leftX, leftY);
        this.context.lineTo(rightX, rightY);
        this.context.stroke();
    }

    /**
  * Отрисовывает текст на холсте между двумя точками линии.
  * @method
  * @memberof DrawScalingConventions
  * @param {number} centerX - Координата X центра стрелки.
  * @param {number} centerY - Координата Y центра стрелки.
  * @param {number} externalRingRadiusXExternalSide - Радиус X внешнего кольца.
  * @param {number} externalRingRadiusYExternalSide - Радиус Y внешнего кольца.
  * @param {string} text - Текст для отображения.
  * @param {string} [textColor='grey'] - Цвет текста.
  */
    sizeInText(centerX, centerY, externalRingRadiusXExternalSide, externalRingRadiusYExternalSide, text, textColor = 'grey') {
        // Вычисление смещения текста

        const textOffset = String(text).length * 22 / 4

        // Углы для левой и правой точек стрелки
        const leftAngle = 180 * Math.PI / 180;
        const rightAngle = 0 * Math.PI / 180;

        // Вычисление координат левой и правой нижних точек стрелки
        const leftX = externalRingRadiusXExternalSide * Math.cos(leftAngle) + centerX;
        const leftY = externalRingRadiusYExternalSide * Math.sin(leftAngle) + centerY + 320;
        const rightX = externalRingRadiusXExternalSide * Math.cos(rightAngle) + centerX;
        const rightY = externalRingRadiusYExternalSide * Math.sin(rightAngle) + centerY + 320;

        // Вычисление координаты текста
        const xPixel = (leftX + rightX) / 2 - textOffset;
        const yPixel = (leftY + rightY) / 2 + 25;

        // Установка стиля текста и отрисовка
        this.context.fillStyle = textColor;
        this.context.font = "22px serif";
        this.context.fillText(String(text), xPixel, yPixel);
    }

    /**
     * Отрисовывает стрелку и текст.
     * @method
     * @memberof DrawScalingConventions
     * @param {number} centerX - X-координата центра холста.
     * @param {number} centerY - Y-координата центра холста.
     * @param {number} externalRingRadiusXExternalSide - Внешний радиус X-стороны.
     * @param {number} externalRingRadiusYExternalSide - Внешний радиус Y-стороны.
     * @param {string} text - Текст для отображения.
     */
    borders(
        centerX,
        centerY,
        externalRingRadiusXExternalSide,
        externalRingRadiusYExternalSide,
        text
    ) {
        this.doubleSidedArrow(
            centerX,
            centerY,
            externalRingRadiusXExternalSide,
            externalRingRadiusYExternalSide
        )
        this.sizeInText(
            centerX,
            centerY,
            externalRingRadiusXExternalSide,
            externalRingRadiusYExternalSide,
            text
        )
    }

}