/** 
 * Класс для отрисовки подшипника.
 * @module DrawRadialBallBearing
 * @class 
 */
export default class DrawRadialBallBearing {

    constructor(context) {
        // this.defectsRadialBallBearing = new DefectsRadialBallBearing(context);
        this.context = context;
        this.numberSelectedRollingElement = 1;

        this.strokeStyleSelectedRollingElement = 'black';
        this.lineWidthSelectedRollingElement = 3;
        this.strokeStyleNotSelectedRollingElement = 'black';
        this.lineWidthNotSelectedRollingElement = 3;

        this.strokeStyleExternalRing = 'black';
        this.lineWidthExternalRing = 3;
        this.strokeStyleInnerRing = 'black';
        this.lineWidthInnerRing = 3;

        this.fullEllipse = [0, 2 * Math.PI] // параметпы для отрисовки полного эллипса

        this.context.canvas.width = this.context.canvas.width * 2.5;
        this.context.canvas.height = this.context.canvas.height * 5;
    }

    /**
   * Очищает холст и заполняет его заданным цветом.
   * @method
   * @memberof DrawRadialBallBearing
   */
    drawList() {
        // Очищаем холст, устанавливая прозрачность
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        // Заполняем холст цветом (в данном случае, белым цветом с полной непрозрачностью)
        this.context.fillStyle = '#ffffffff';
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    /**
    * Вычисляет и возвращает координаты центра холста.
    * @method
    * @memberof DrawRadialBallBearing
    * @returns {Object} Объект с координатами centerX и centerY.
    */
    center() {
        // Вычисляем координаты центра холста
        let centerX = this.context.canvas.width / 2;
        let centerY = this.context.canvas.height / 2.2;

        // Возвращаем объект с координатами центра
        return { centerX, centerY };
    }

    /**
  * Выбирает элемент для отображения на холсте и устанавливает соответствующие стили и цвета.
  * @method
  * @memberof DrawRadialBallBearing
  * @param {string} element - Название выбранного элемента (например, 'innerRingDefect', 'externalRingDefect', 'rollingElementDefect', 'innerRingDistortion', 'externalRingDistortion', 'misalignment' или 'default').
  */
    selectElement(element) {
        // Устанавливаем стили и цвета по умолчанию
        this.strokeStyleInnerBorder = 'black';
        this.lineWidthInnerBorder = 3;
        this.strokeStyleExternalBorder = 'black';
        this.lineWidthExternalBorder = 3;
        this.strokeStyleSelectedRollingElement = 'black';
        this.lineWidthSelectedRollingElement = 3;
        this.fillStyleInnerBorder = 'gradient';
        this.fillStyleExternalBorder = 'gradient';

        // Проверяем переданный элемент и устанавливаем соответствующие стили и цвета
        if (element === 'default') {
            return; // Возвращаемся, не изменяя стили и цвета
        }

        if (element === 'innerRingDefect') {
            this.strokeStyleInnerBorder = 'blue';
            this.lineWidthInnerBorder = 4;
        }
        if (element === 'externalRingDefect') {
            this.strokeStyleExternalBorder = 'blue';
            this.lineWidthExternalBorder = 4;
        }
        if (element === 'rollingElementDefect') {
            this.strokeStyleSelectedRollingElement = 'blue';
            this.lineWidthSelectedRollingElement = 4;
        }
        if (element === 'innerRingDistortion') {
            this.fillStyleInnerBorder = 'blue';
        }
        if (element === 'externalRingDistortion') {
            this.fillStyleExternalBorder = 'blue';
        }
        if (element === 'misalignment') {
            this.fillStyleInnerBorder = 'blue';
            this.fillStyleExternalBorder = 'blue';
        }
    }

    /**
   * Создает и возвращает линейный градиент на холсте с заданными параметрами.
   * @method
   * @memberof DrawRadialBallBearing
   * @param {number} xPixel45 - Координата X точки, соответствующей углу 45 градусов.
   * @param {number} yPixel45 - Координата Y точки, соответствующей углу 45 градусов.
   * @param {number} xPixel225 - Координата X точки, соответствующей углу 225 градусов.
   * @param {number} yPixel225 - Координата Y точки, соответствующей углу 225 градусов.
   * @returns {CanvasGradient} Линейный градиент на холсте.
   */
    _gradientParameters(xPixel45, yPixel45, xPixel225, yPixel225) {
        // Создаем линейный градиент с заданными координатами
        const gradient = this.context.createLinearGradient(
            xPixel45,
            yPixel45,
            xPixel225,
            yPixel225
        );

        // Добавляем цветовые остановки к градиенту
        gradient.addColorStop(0, "rgb(150, 150, 150)");
        gradient.addColorStop(0.3, "rgb(190, 190, 190)");
        gradient.addColorStop(1, "rgb(210, 210, 210)");

        return gradient; // Возвращаем созданный градиент
    }

    /**
   * Отрисовывает внешнее кольцо и его внутреннюю стенку на холсте.
   * @method
   * @memberof DrawRadialBallBearing
   * @param {number} centerX - Координата X центра кольца.
   * @param {number} centerY - Координата Y центра кольца.
   * @param {string} rotationRing - Определяет вращение кольца ('external' для внешнего кольца).
   * @param {number} angleOffsetShaft - Угол смещения вала.
   * @param {number} externalRingRadiusXExternalSide - Радиус X внешней стенки кольца.
   * @param {number} externalRingRadiusYExternalSide - Радиус Y внешней стенки кольца.
   * @param {number} externalRingRadiusXInnerSide - Радиус X внутренней стенки кольца.
   * @param {number} externalRingRadiusYInnerSide - Радиус Y внутренней стенки кольца.
   */
    externalRing(
        centerX,
        centerY,
        rotationRing,
        angleOffsetShaft,
        externalRingRadiusXExternalSide,
        externalRingRadiusYExternalSide,
        externalRingRadiusXInnerSide,
        externalRingRadiusYInnerSide,
    ) {
        // ------------------ Внешняя стенка внешнего кольца ------------------
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleExternalRing;
        this.context.lineWidth = this.lineWidthExternalRing;
        this.context.setLineDash([]);
        this.context.ellipse(
            centerX, centerY,
            externalRingRadiusXExternalSide,
            externalRingRadiusYExternalSide, 0,
            ...this.fullEllipse
        );

        // Вращение градиента внешнего кольца   
        if (rotationRing == 'external') {
            let AlfaExternalRing45 = (45 + angleOffsetShaft) * Math.PI / 180;
            let AlfaexternalRing225 = (225 + angleOffsetShaft) * Math.PI / 180;
            let xPixelExternalRing45 = externalRingRadiusXExternalSide * Math.cos(AlfaExternalRing45) + centerX;
            let yPixelExternalRing45 = externalRingRadiusYExternalSide * Math.sin(AlfaExternalRing45) + centerY;
            let xPixelExternalRing225 = externalRingRadiusXExternalSide * Math.cos(AlfaexternalRing225) + centerX;
            let yPixelExternalRing225 = externalRingRadiusYExternalSide * Math.sin(AlfaexternalRing225) + centerY;

            if (this.fillStyleExternalBorder == 'gradient') {
                const gradient = this._gradientParameters(
                    xPixelExternalRing45,
                    yPixelExternalRing45,
                    xPixelExternalRing225,
                    yPixelExternalRing225
                );
                this.context.fillStyle = gradient;
            }
            else {
                this.context.fillStyle = this.fillStyleExternalBorder;
            }
        }
        else {
            let AlfaExternalRing45 = 45 * Math.PI / 180;
            let AlfaexternalRing225 = 225 * Math.PI / 180;
            let xPixelExternalRing45 = externalRingRadiusXExternalSide * Math.cos(AlfaExternalRing45) + centerX;
            let yPixelExternalRing45 = externalRingRadiusYExternalSide * Math.sin(AlfaExternalRing45) + centerY;
            let xPixelExternalRing225 = externalRingRadiusXExternalSide * Math.cos(AlfaexternalRing225) + centerX;
            let yPixelExternalRing225 = externalRingRadiusYExternalSide * Math.sin(AlfaexternalRing225) + centerY;

            if (this.fillStyleExternalBorder == 'gradient') {
                const gradient = this._gradientParameters(
                    xPixelExternalRing45,
                    yPixelExternalRing45,
                    xPixelExternalRing225,
                    yPixelExternalRing225
                );
                this.context.fillStyle = gradient;
            }
            else {
                this.context.fillStyle = this.fillStyleExternalBorder;
            }
        }

        this.context.fill();
        this.context.stroke();
        // ---------------------------------------------------------------------

        // ------------------ Внутренняя стенка внешнего кольца ------------------
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleExternalRing;
        this.context.lineWidth = this.lineWidthExternalRing;
        this.context.setLineDash([]);
        this.context.ellipse(centerX, centerY, externalRingRadiusXInnerSide, externalRingRadiusYInnerSide, 0, ...this.fullEllipse);
        this.context.fillStyle = "white";
        this.context.fill();
        this.context.stroke();
        // // ---------------------------------------------------------------------
    } // отрисовка внешнего кольца

    /**
 * Отрисовывает внутреннее кольцо и его внутреннюю стенку на холсте.
 * @method
 * @memberof DrawRadialBallBearing
 * @param {number} centerX - Координата X центра кольца.
 * @param {number} centerY - Координата Y центра кольца.
 * @param {string} rotationRing - Определяет вращение кольца ('internal' для внутреннего кольца).
 * @param {number} angleOffsetShaft - Угол смещения вала.
 * @param {number} innerRingRadiusXExternalSide - Радиус X внешней стенки кольца.
 * @param {number} innerRingRadiusYExternalSide - Радиус Y внешней стенки кольца.
 * @param {number} innerRingRadiusXInnerSide - Радиус X внутренней стенки кольца.
 * @param {number} innerRingRadiusYInnerSide - Радиус Y внутренней стенки кольца.
 */
    innerRing(
        centerX, centerY,
        rotationRing,
        angleOffsetShaft,
        innerRingRadiusXExternalSide,
        innerRingRadiusYExternalSide,
        innerRingRadiusXInnerSide,
        innerRingRadiusYInnerSide,
    ) {
        // ------------------ Внешняя стенка внутреннего кольца ------------------
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleInnerRing;
        this.context.lineWidth = this.lineWidthInnerRing;
        this.context.setLineDash([]);
        this.context.ellipse(
            centerX, centerY,
            innerRingRadiusXExternalSide,
            innerRingRadiusYExternalSide,
            0, ...this.fullEllipse
        );

        // Вращение градиента внутреннего кольца   
        if (rotationRing == 'internal') {
            let AlfaInnerRing45 = (45 + angleOffsetShaft) * Math.PI / 180;
            let AlfaInnerRing225 = (225 + angleOffsetShaft) * Math.PI / 180;
            let xPixelInnerRing45 = innerRingRadiusXInnerSide * Math.cos(AlfaInnerRing45) + centerX;
            let yPixelInnerRing45 = innerRingRadiusYInnerSide * Math.sin(AlfaInnerRing45) + centerY;
            let xPixelInnerRing225 = innerRingRadiusXInnerSide * Math.cos(AlfaInnerRing225) + centerX;
            let yPixelInnerRing225 = innerRingRadiusYInnerSide * Math.sin(AlfaInnerRing225) + centerY;

            if (this.fillStyleInnerBorder == 'gradient') {
                const gradient = this._gradientParameters(
                    xPixelInnerRing45,
                    yPixelInnerRing45,
                    xPixelInnerRing225,
                    yPixelInnerRing225
                );
                this.context.fillStyle = gradient;
            }
            else {
                this.context.fillStyle = this.fillStyleInnerBorder;
            }
        }
        else {
            let AlfaExternalRing45 = 45 * Math.PI / 180;
            let AlfaexternalRing225 = 225 * Math.PI / 180;
            let xPixelInnerRing45 = innerRingRadiusXExternalSide * Math.cos(AlfaExternalRing45) + centerX;
            let yPixelInnerRing45 = innerRingRadiusYExternalSide * Math.sin(AlfaExternalRing45) + centerY;
            let xPixelInnerRing225 = innerRingRadiusXExternalSide * Math.cos(AlfaexternalRing225) + centerX;
            let yPixelInnerRing225 = innerRingRadiusYExternalSide * Math.sin(AlfaexternalRing225) + centerY;

            if (this.fillStyleInnerBorder == 'gradient') {
                const gradient = this._gradientParameters(
                    xPixelInnerRing45,
                    yPixelInnerRing45,
                    xPixelInnerRing225,
                    yPixelInnerRing225
                );
                this.context.fillStyle = gradient;
            }
            else {
                this.context.fillStyle = this.fillStyleInnerBorder;
            }
        }

        this.context.fill();
        this.context.stroke();
        // ---------------------------------------------------------------------

        // ------------------ Внутренняя стенка внутреннего кольца ------------------ 
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleInnerRing;
        this.context.lineWidth = this.lineWidthInnerRing;
        this.context.setLineDash([]);
        this.context.ellipse(centerX, centerY, innerRingRadiusXInnerSide, innerRingRadiusYInnerSide, 0, ...this.fullEllipse);
        this.context.fillStyle = "white";
        this.context.fill();
        this.context.stroke();
        // // ---------------------------------------------------------------------
    } // отрисовка внутреннего кольца


    /**
   * Отрисовывает границы тел качения на холсте.
   * @method
   * @memberof DrawRadialBallBearing
   * @param {number} centerX - Координата X центра холста.
   * @param {number} centerY - Координата Y центра холста.
   * @param {number} rollingElementsExternalBorderRadiusX - Радиус X внешней границы тел качения.
   * @param {number} rollingElementsExternalBorderRadiusY - Радиус Y внешней границы тел качения.
   * @param {number} rollingElementsInnerBorderRadiusX - Радиус X внутренней границы тел качения.
   * @param {number} rollingElementsInnerBorderRadiusY - Радиус Y внутренней границы тел качения.
   */
    rollingElementsBorders(
        centerX, centerY,
        rollingElementsExternalBorderRadiusX,
        rollingElementsExternalBorderRadiusY,
        rollingElementsInnerBorderRadiusX,
        rollingElementsInnerBorderRadiusY
    ) {
        // Радиус внешней границы тел качения
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleExternalBorder;
        this.context.lineWidth = this.lineWidthExternalBorder;
        this.context.setLineDash([10, 5]);
        this.context.ellipse(
            centerX, centerY,
            rollingElementsExternalBorderRadiusX,
            rollingElementsExternalBorderRadiusY,
            0, ...this.fullEllipse
        );
        this.context.stroke();

        // Радиус внутренней границы тел качения 
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyleInnerBorder;
        this.context.lineWidth = this.lineWidthInnerBorder;
        this.context.setLineDash([10, 5]);
        this.context.ellipse(
            centerX, centerY,
            rollingElementsInnerBorderRadiusX,
            rollingElementsInnerBorderRadiusY,
            0, ...this.fullEllipse
        );
        this.context.stroke();
    }// отрисовка границ тел качения


    /**
   * Отрисовывает элементы вращающихся тел на холсте.
   * @method
   * @memberof DrawRadialBallBearing
   * @param {number} centerX - Координата X центра холста.
   * @param {number} centerY - Координата Y центра холста.
   * @param {number} angleOffsetSeparator - Угол смещения сепаратора.
   * @param {number} separatorRadiusX - Радиус X сепаратора.
   * @param {number} separatorRadiusY - Радиус Y сепаратора.
   * @param {number} numberOfRollingElements - Количество вращающихся элементов.
   * @param {number} angleOffsetRollingElement - Угол смещения вращающихся элементов.
   * @param {number} rollingElementRadiusX - Радиус X вращающихся элементов.
   * @param {number} rollingElementRadiusY - Радиус Y вращающихся элементов.
   * @param {number} rotationSign - Знак вращения.
   */
    rollingElement(
        centerX, centerY,
        angleOffsetSeparator,
        separatorRadiusX,
        separatorRadiusY,
        numberOfRollingElements,
        angleOffsetRollingElement,
        rollingElementRadiusX,
        rollingElementRadiusY,
        rotationSign
    ) {
        let AlfaSeparator;
        let xPixelSeparator;
        let yPixelSeparator;

        // Сепаратор
        AlfaSeparator = angleOffsetSeparator * Math.PI / 180;

        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.setLineDash([5, 5]);
        this.context.ellipse(centerX, centerY, separatorRadiusX, separatorRadiusY, AlfaSeparator, 0, 2 * Math.PI);
        this.context.stroke();

        let stepAngle = 360 / numberOfRollingElements;
        let AlfaStepRollingElement;

        for (let i = 1; i <= numberOfRollingElements; i++) {
            // Рассчитываем угол для текущего вращающегося элемента
            AlfaStepRollingElement = (angleOffsetSeparator + (i - 1) * stepAngle) * Math.PI / 180;

            xPixelSeparator = separatorRadiusX * Math.cos(AlfaStepRollingElement) + centerX;
            yPixelSeparator = separatorRadiusY * Math.sin(AlfaStepRollingElement) + centerY;

            this.context.beginPath();

            // Устанавливаем стиль линии и цвет в зависимости от выбранного или не выбранного элемента
            if (this.numberSelectedRollingElement == i) {
                this.context.strokeStyle = this.strokeStyleSelectedRollingElement;
                this.context.lineWidth = this.lineWidthSelectedRollingElement;
            } else {
                this.context.strokeStyle = this.strokeStyleNotSelectedRollingElement;
                this.context.lineWidth = this.lineWidthNotSelectedRollingElement;
            }
            this.context.setLineDash([]);

            // Рассчитываем углы для вращения градиента
            let AlfaShaft45 = rotationSign * (45 + angleOffsetRollingElement) * Math.PI / 180;
            let AlfaShaft225 = rotationSign * (225 + angleOffsetRollingElement) * Math.PI / 180;

            // Рассчитываем координаты точек для градиентного заполнения
            let xPixelRollingElement45 = xPixelSeparator + rollingElementRadiusX * Math.cos(AlfaShaft45);
            let yPixelRollingElement45 = yPixelSeparator + rollingElementRadiusY * Math.sin(AlfaShaft45);
            let xPixelRollingElement225 = xPixelSeparator + rollingElementRadiusX * Math.cos(AlfaShaft225);
            let yPixelRollingElement225 = yPixelSeparator + rollingElementRadiusY * Math.sin(AlfaShaft225);

            this.context.ellipse(
                xPixelSeparator,
                yPixelSeparator,
                rollingElementRadiusX,
                rollingElementRadiusY,
                0, ...this.fullEllipse
            );

            // Создаем градиент для заполнения вращающегося элемента
            const gradient = this._gradientParameters(
                xPixelRollingElement45,
                yPixelRollingElement45,
                xPixelRollingElement225,
                yPixelRollingElement225
            );

            this.context.fillStyle = gradient;

            this.context.fill();
            this.context.stroke();

            // Рассчитываем координаты центральной точки сепаратора
            let stepPoint = (stepAngle * (i - 1) + stepAngle * i) / 2;
            let AlfaPoint = (stepPoint + angleOffsetSeparator) * Math.PI / 180;
            let xCenterPoint = separatorRadiusX * Math.cos(AlfaPoint) + centerX;
            let yCenterPoint = separatorRadiusY * Math.sin(AlfaPoint) + centerY;

            // Отрисовываем центральную точку
            this.context.beginPath();
            this.context.setLineDash([]);
            this.context.strokeStyle = 'black';
            this.context.lineWidth = 2;
            this.context.ellipse(
                xCenterPoint,
                yCenterPoint,
                3, 3, 0,
                ...this.fullEllipse
            );
            this.context.fillStyle = "black";
            this.context.fill();
            this.context.stroke();
        }
    }
}