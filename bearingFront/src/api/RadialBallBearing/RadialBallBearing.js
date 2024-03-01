import DrawRadialBallBearing from './DrawRadialBallBearing';
import DrawDefectsRadialBallBearing from './DrawDefectsRadialBallBearing';
import DrawVectorLoadRadialBallBearing from './DrawVectorLoadRadialBallBearing';
import DrawScalingConventions from './DrawScalingConventions';

/**
 * Класс, представляющий радиальный шариковый подшипник.
 * @module DrawVectorLoadRadialBallBearing
 * @class 
 */
export default class RadialBallBearing {

    static #instance;

    /**
     * Получение экземпляра класса (singleton).
     * @method
     * @memberof RadialBallBearing
     * @returns {RadialBallBearing} Экземпляр класса RadialBallBearing.
     */
    static getInstanse() {
        if (!RadialBallBearing.instance) {
            RadialBallBearing.instance = new RadialBallBearing();
        }
        return RadialBallBearing.instance;
    }

    /**
     * Создание холста для отображения подшипника.
     * @method
     * @memberof RadialBallBearing
     * @param {HTMLCanvasElement} canvas - Элемент холста.
     */
    createCanvasBearing(canvas) {
        this.context = canvas.getContext('2d');
        this.drawBearing = new DrawRadialBallBearing(this.context)
        this.drawDefectsBearing = new DrawDefectsRadialBallBearing(this.context);
        this.drawVectorLoad = new DrawVectorLoadRadialBallBearing(this.context);
        this.drawScalingConventions = new DrawScalingConventions(this.context);
    }

    /**
      * Создает экземпляр автомобиля.
      * @constructor
      */
    constructor() {
        this.statusCreateParams = false;
        this.angleOffsetShaft = 0
        this.angleOffsetSeparator = 0;
        this.angleOffsetRollingElement = 0;
        this.defectsInnerRing = [];
        this.defectsExternalRing = [];
        this.defectsRollingElements = [];
        this.tiltAndAngleInnerDirection = null;
        this.tiltAndAngleExternalDirection = null;
        this.tiltMisalignment = null;
    }

    /**
     * Инициализация параметров подшипника.
     * @method
     * @memberof RadialBallBearing
     * @param {string} rotationRing - Направление вращения кольца ('internal' или 'external').
     * @param {number} rpm - Обороты в минуту.
     * @param {number} externalRingDiameter - Диаметр внешнего кольца.
     * @param {number} innerRingDiameter - Диаметр внутреннего кольца.
     * @param {number} rollingElementDiameter - Диаметр тела качения.
     * @param {number} externalRingThickness - Толщина внешнего кольца.
     * @param {number} innerRingThickness - Толщина внутреннего кольца.
     * @param {number} numberOfRollingElements - Количество тел качения.
     * @param {number} numberOfRollingElementFaces - Число граней тел качения.
     * @param {number} contactAngleOfRollingElements - Угол контакта тел качения.
     * @param {number} elasticModulus - Модуль упругости.
     * @param {number} specificDensityOfRollingElement - Удельная плотность тела качения.
     * @param {number} vectorLoad - Векторная нагрузка.
     */
    setNewStartParams(
        rotationRing, // Вращение кольца
        rpm, // Обороты в минуту
        externalRingDiameter, // диаметр внешнего кольца
        innerRingDiameter, // диаметр внутреннего кольца
        rollingElementDiameter, // диаметр тела качения
        externalRingThickness, // Толщина внешнего кольца
        innerRingThickness, // Толщина внутреннего кольца
        numberOfRollingElements, // количество тел качения
        numberOfRollingElementFaces, // число граней тел качения
        contactAngleOfRollingElements, // угол контакта тел качения
        elasticModulus, // модуль упругости
        specificDensityOfRollingElement, // удельная плотность тела качения
        vectorLoad // векторная нагрузка
    ) {
        // Сбрасываем все предыдущие параметры
        this.angleOffsetShaft = 0;
        this.angleOffsetSeparator = 0;
        this.angleOffsetRollingElement = 0;
        this.defectsInnerRing = [];
        this.defectsExternalRing = [];
        this.defectsRollingElements = [];
        this.tiltAndAngleInnerDirection = null;
        this.tiltAndAngleExternalDirection = null;
        this.tiltMisalignment = null;

        // Задаем параметры вращения
        this.rotationRing = rotationRing;
        this.rotationSign = this.rotationRing === 'internal' ? -1 : 1; // Знак вращения

        // Задаем параметры деталей подшипника
        this.realExternalRingDiameter = +externalRingDiameter;  // диаметр внешнего кольца внешней стенки
        this.realInnerRingDiameter = +innerRingDiameter; // диаметр внутреннего кольца внутренней стенки
        this.realRollingElementDiameter = +rollingElementDiameter; // диаметр тела качения
        this.realInnerRingThickness = +innerRingThickness; // толщина внутреннего кольца
        this.realExternalRingThickness = +externalRingThickness; // толщина внешнего кольца

        // Задаем коэффициент масштабирования и масштабируем размеры деталей
        this.scaleOuterRing = 400; // масштаб внешнего кольца
        this.scalingFactor = this.scaleOuterRing / +externalRingDiameter;
        this.rpm = +rpm;
        this.externalRingDiameter = +externalRingDiameter * this.scalingFactor;
        this.innerRingDiameter = +innerRingDiameter * this.scalingFactor;
        this.rollingElementDiameter = +rollingElementDiameter * this.scalingFactor;
        this.innerRingThickness = +innerRingThickness * this.scalingFactor;
        this.externalRingThickness = +externalRingThickness * this.scalingFactor;
        this.vectorLoad = +vectorLoad;

        // Задаем радиусы деталей
        this.rollingElementRadiusX = this.rollingElementDiameter / 2;
        this.rollingElementRadiusY = this.rollingElementDiameter / 2;
        this.externalRingRadiusXExternalSide = this.externalRingDiameter / 2;
        this.externalRingRadiusYExternalSide = this.externalRingDiameter / 2;
        this.externalRingRadiusXInnerSide = this.externalRingRadiusXExternalSide - this.externalRingThickness;
        this.externalRingRadiusYInnerSide = this.externalRingRadiusYExternalSide - this.externalRingThickness;
        this.innerRingRadiusXInnerSide = this.innerRingDiameter / 2;
        this.innerRingRadiusYInnerSide = this.innerRingDiameter / 2;
        this.innerRingRadiusXExternalSide = this.innerRingRadiusXInnerSide + this.innerRingThickness;
        this.innerRingRadiusYExternalSide = this.innerRingRadiusYInnerSide + this.innerRingThickness;

        // Задаем радиусы границ тела качения
        this.rollingElementsExternalBorderRadiusX = this.externalRingRadiusXExternalSide - this.externalRingThickness + this.rollingElementDiameter / 5; // Радиус внешней границы тела качения
        this.rollingElementsExternalBorderRadiusY = this.externalRingRadiusYExternalSide - this.externalRingThickness + this.rollingElementDiameter / 5; // Радиус внешней границы тела качения
        this.rollingElementsInnerBorderRadiusX = this.innerRingRadiusXInnerSide + this.innerRingThickness - this.rollingElementDiameter / 5; // Радиус внутренней границы тела качения
        this.rollingElementsInnerBorderRadiusY = this.innerRingRadiusYInnerSide + this.innerRingThickness - this.rollingElementDiameter / 5; // Радиус внутренней границы тела качения

        // Вычисляем радиус сепаратора
        this.separatorRadiusX = (this.rollingElementsExternalBorderRadiusX + this.rollingElementsInnerBorderRadiusX) / 2;
        this.separatorRadiusY = (this.rollingElementsExternalBorderRadiusY + this.rollingElementsInnerBorderRadiusY) / 2;
        this.separatorDiameterX = this.separatorRadiusX * 2;
        this.separatorDiameterY = this.separatorRadiusY * 2;

        // Задаем остальные параметры
        this.numberOfRollingElements = numberOfRollingElements;
        this.numberOfRollingElementFaces = numberOfRollingElementFaces;
        this.contactAngleOfRollingElements = contactAngleOfRollingElements;
        this.elasticModulus = elasticModulus;
        this.specificDensityOfRollingElement = specificDensityOfRollingElement;

        // Вычисляем частоты
        this.shaftFrequency = this.rpm / 60; // Частота вала в секундах
        this.separatorFrequency = this.shaftFrequency *
            (1 / 2 * (1 + this.rotationSign * this.rollingElementDiameter /
                this.separatorDiameterX * Math.cos(this.contactAngleOfRollingElements))); // Частота сепаратора
        this.rollingElementFrequency = this.shaftFrequency * this.separatorDiameterX
            / (1 * this.rollingElementDiameter) * (1 - (this.rollingElementDiameter
                / this.separatorDiameterX * Math.cos(this.contactAngleOfRollingElements)) ** 2); // Частота тел качения

        // this.separatorFrequency = this.shaftFrequency *
        //     (1 / 2 * (1 + this.rotationSign * this.realRollingElementDiameter /
        //         this.separatorDiameterX * Math.cos(this.contactAngleOfRollingElements))); // Частота сепаратора без маштабирования
        // this.rollingElementFrequency = this.shaftFrequency * this.separatorDiameterX
        //     / (1 * this.realRollingElementDiameter) * (1 - (this.realRollingElementDiameter
        //         / this.separatorDiameterX * Math.cos(this.contactAngleOfRollingElements)) ** 2); // Частота тел качения без маштабирования



        // Устанавливаем статус параметров
        this.statusCreateParams = true;
    }


    updateAngleToStarting() {
        this.angleOffsetShaft = 0
        this.angleOffsetSeparator = 0;
        this.angleOffsetRollingElement = 0;
    }

    /**
      * Выбор элемента и перерисовка.
      * @method
      * @memberof RadialBallBearing
      * @param {string} element - Название выбранного элемента (например, 'innerRing', 'externalRing', 'rollingElement').
      */
    selectElement(element) {
        this.drawBearing.selectElement(element);
        this.draw();
    }

    /**
    * Выбор номера активного тела качения для отображения.
    * @method
    * @memberof RadialBallBearing
    * @param {number} numberSelected - Номер выбранного тела качения.
    */
    chooseRollingElement(numberSelected) {
        if (this.drawBearing) {
            this.drawBearing.numberSelectedRollingElement = numberSelected;
        }
    }

    /**
   * Добавление нового дефекта во внутреннее кольцо.
   * @method
   * @memberof RadialBallBearing
   * @param {number} defectShape - Форма дефекта
   * @param {number} startAngle - Начальный угол дефекта.
   * @param {number} finishAngle - Конечный угол дефекта.
   * @param {number} depth - Глубина дефекта.
   */
    newDefectInnerRing(defectShape, startAngle, finishAngle, depth) {
        this.defectsInnerRing.push({ defectShape, startAngle, finishAngle, depth });
    }

    /**
     * Добавление нового дефекта во внешнее кольцо.
     * @method
     * @memberof RadialBallBearing
     * @param {number} defectShape - Форма дефекта
     * @param {number} startAngle - Начальный угол дефекта.
     * @param {number} finishAngle - Конечный угол дефекта.
     * @param {number} depth - Глубина дефекта.
     */
    newDefectExternalRing(defectShape, startAngle, finishAngle, depth) {
        this.defectsExternalRing.push({ defectShape, startAngle, finishAngle, depth });
    }

    /**
     * Добавление нового дефекта в тело качения.
     * @method
     * @memberof RadialBallBearing
     * @param {number} defectShape - Форма дефекта
     * @param {number} startAngle - Начальный угол дефекта.
     * @param {number} finishAngle - Конечный угол дефекта.
     * @param {number} depth - Глубина дефекта.
     * @param {number} numberRollingElement - Номер тела качения.
     */
    newDefectRollingElement(defectShape, startAngle, finishAngle, depth, numberRollingElement) {
        this.defectsRollingElements.push({
            defectShape, startAngle, finishAngle, depth, numberRollingElement
        });
    }

    /**
    * Добавление новой деформации (наклона) во внутреннее кольцо.
    * @method
    * @memberof RadialBallBearing
    * @param {number} tiltDirection - Направление наклона.
    * @param {number} angleDirection - Угол наклона.
    */
    newInnerRingDistortion(tiltDirection, angleDirection) {
        this.tiltAndAngleInnerDirection = {
            tiltDirection,
            angleDirection
        };
        this.tiltAndAngleExternalDirection = null;
        this.tiltMisalignment = null;
    }

    /**
    * Добавление новой деформации (наклона) во внешнее кольцо.
    * @method
    * @memberof RadialBallBearing
    * @param {number} tiltDirection - Направление наклона.
    * @param {number} angleDirection - Угол наклона.
    */
    newExternalRingDistortion(tiltDirection, angleDirection) {
        this.tiltAndAngleInnerDirection = null;
        this.tiltAndAngleExternalDirection = {
            tiltDirection,
            angleDirection
        };
        this.tiltMisalignment = null;
    }

    /**
    * Добавление новой несоосности кольца.
    * @method
    * @memberof RadialBallBearing
    * @param {number} tilt - Значение несоосности.
    */
    newMisalignment(tilt) {
        this.tiltAndAngleInnerDirection = null;
        this.tiltAndAngleExternalDirection = null;
        this.tiltMisalignment = tilt;
    }

    deleteDefect(nameListDefects, index) {
        this[nameListDefects].splice(index, 1);
    }

    get allDefects() {
        return {
            defectsInnerRing: this.defectsInnerRing,
            defectsExternalRing: this.defectsExternalRing,
            defectsRollingElements: this.defectsRollingElements,
        }
    }

    get allParams() {
        return {
            rotationRing: this.rotationRing, // направление Вращения кольца
            rpm: this.rpm,
            realExternalRingDiameter: this.realExternalRingDiameter, // диаметр внешнего кольца внешней стенки
            realInnerRingDiameter: this.realInnerRingDiameter, // диаметр внутреннего кольца внутренней стенки
            realRollingElementDiameter: this.realRollingElementDiameter, // диаметр тела качения
            realInnerRingThickness: this.realInnerRingThickness, // толшина внутреннего кольца
            realExternalRingThickness: this.realExternalRingThickness, // толшина внешнего кольца
            numberOfRollingElements: this.numberOfRollingElements, // количество тел качения
            contactAngleOfRollingElements: this.contactAngleOfRollingElements, // угол контакта тел качения
        }
    }

    /**
     * Отрисовка состояния подшипника.
     * @method
     * @memberof RadialBallBearing
     */
    draw() {
        if (this.drawBearing) {
            this.drawBearing.drawList();

            if (this.statusCreateParams) {
                const centerX = this.drawBearing.center().centerX;
                const centerY = this.drawBearing.center().centerY;

                // Рисуем границы
                this.drawScalingConventions.borders(
                    centerX,
                    centerY,
                    this.externalRingRadiusXExternalSide,
                    this.externalRingRadiusYExternalSide,
                    this.realExternalRingDiameter
                );

                // Рисуем внешнее кольцо
                this.drawBearing.externalRing(
                    centerX, centerY,
                    this.rotationRing,
                    this.angleOffsetShaft,
                    this.externalRingRadiusXExternalSide,
                    this.externalRingRadiusYExternalSide,
                    this.externalRingRadiusXInnerSide,
                    this.externalRingRadiusYInnerSide
                );

                // Рисуем внутреннее кольцо
                this.drawBearing.innerRing(
                    centerX, centerY,
                    this.rotationRing,
                    this.angleOffsetShaft,
                    this.innerRingRadiusXExternalSide,
                    this.innerRingRadiusYExternalSide,
                    this.innerRingRadiusXInnerSide,
                    this.innerRingRadiusYInnerSide
                );

                // Рисуем границы тел качения
                this.drawBearing.rollingElementsBorders(
                    centerX, centerY,
                    this.rollingElementsExternalBorderRadiusX,
                    this.rollingElementsExternalBorderRadiusY,
                    this.rollingElementsInnerBorderRadiusX,
                    this.rollingElementsInnerBorderRadiusY
                );

                // Рисуем тела качения
                this.drawBearing.rollingElement(
                    centerX, centerY,
                    this.angleOffsetSeparator,
                    this.separatorRadiusX,
                    this.separatorRadiusY,
                    this.numberOfRollingElements,
                    this.angleOffsetRollingElement,
                    this.rollingElementRadiusX,
                    this.rollingElementRadiusY,
                    this.rotationSign
                );

                // Рисуем дефекты на внутреннем кольце
                this.drawDefectsBearing.innerRing(
                    centerX, centerY,
                    this.defectsInnerRing,
                    this.rotationRing,
                    this.angleOffsetShaft,
                    this.rollingElementsInnerBorderRadiusX,
                    this.rollingElementsInnerBorderRadiusY,
                );

                // Рисуем дефекты на внешнем кольце
                this.drawDefectsBearing.externalRing(
                    centerX, centerY,
                    this.defectsExternalRing,
                    this.rotationRing,
                    this.angleOffsetShaft,
                    this.rollingElementsExternalBorderRadiusX,
                    this.rollingElementsExternalBorderRadiusY,
                );

                // Рисуем дефекты на телах качения
                this.drawDefectsBearing.rollingElement(
                    centerX, centerY,
                    this.defectsRollingElements,
                    this.numberOfRollingElements,
                    this.angleOffsetSeparator,
                    this.separatorRadiusX,
                    this.separatorRadiusY,
                    this.angleOffsetRollingElement,
                    this.rollingElementRadiusX,
                    this.rollingElementRadiusY,
                    this.rotationSign
                );

                // Рисуем дефекты искривления на внутреннем кольце
                this.drawDefectsBearing.innerRingDistortion(
                    centerX, centerY,
                    this.tiltAndAngleInnerDirection,
                    this.innerRingRadiusXInnerSide,
                    this.innerRingRadiusYInnerSide,
                    this.rollingElementsInnerBorderRadiusX,
                    this.rollingElementsInnerBorderRadiusY
                );

                // Рисуем дефекты искривления на внешнем кольце
                this.drawDefectsBearing.externalRingDistortion(
                    centerX, centerY,
                    this.tiltAndAngleExternalDirection,
                    this.rollingElementsExternalBorderRadiusX,
                    this.rollingElementsExternalBorderRadiusY,
                    this.externalRingRadiusXExternalSide,
                    this.externalRingRadiusYExternalSide
                );

                // Рисуем дефекты наклона
                this.drawDefectsBearing.misalignment(
                    centerX, centerY,
                    this.tiltMisalignment,
                    this.innerRingRadiusXInnerSide,
                    this.innerRingRadiusYInnerSide,
                    this.rollingElementsInnerBorderRadiusX,
                    this.rollingElementsInnerBorderRadiusY,
                    this.externalRingRadiusXExternalSide,
                    this.externalRingRadiusYExternalSide,
                    this.rollingElementsExternalBorderRadiusX,
                    this.rollingElementsExternalBorderRadiusY
                );

                // Рисуем векторную нагрузку
                this.drawVectorLoad.vectorLoad(
                    centerX,
                    centerY,
                    this.innerRingRadiusXInnerSide,
                    this.innerRingRadiusYInnerSide,
                    this.vectorLoad
                );
            }
        }
    }

    /**
    * Рассчет шага анимации для вала, сепаратора и тел качения.
    * @method
    * @memberof RadialBallBearing
    * @private
    */
    _animationStepCalculation() {

        // Вычисляем шаг анимации в градусах для сепаратора
        const stepSeparator = (this.separatorFrequency) * 360 * this.animationSpeed / 1000;

        // Вычисляем шаг анимации в градусах для вала
        const stepShaft = (this.shaftFrequency) * 360 * this.animationSpeed / 1000;

        // Вычисляем шаг анимации в градусах для тел качения
        const stepRollingElement = (this.rollingElementFrequency) * 360 * this.animationSpeed / 1000;

        // Обновляем угол вала с учетом шага
        this.angleOffsetShaft = (this.angleOffsetShaft + stepShaft) % 360;

        // Обновляем угол сепаратора с учетом шага
        this.angleOffsetSeparator = (this.angleOffsetSeparator + stepSeparator) % 360;

        // Обновляем угол тела качения с учетом шага
        this.angleOffsetRollingElement = (this.angleOffsetRollingElement + stepRollingElement) % 360;
    }

    /**
     * Запуск или остановка анимации.
     * @method
     * @memberof RadialBallBearing
     * @param {boolean} statusAnimation - Флаг запуска (true) или остановки (false) анимации.
     */
    animation(statusAnimation) {
        // Если требуется запустить анимацию и она еще не запущена
        if (statusAnimation && !this.animationInterval) {
            this.animationSpeed = 30; // Скорость анимации (в миллисекундах)
            this.animationInterval = setInterval(() => {
                this._animationStepCalculation(); // Выполняем расчет шага анимации
                this.draw(); // Отрисовываем текущее состояние
            }, this.animationSpeed); // Устанавливаем интервал анимации
        }
        else {
            // Если требуется остановить анимацию и она запущена
            clearInterval(this.animationInterval); // Останавливаем интервал анимации
            this.animationInterval = false; // Устанавливаем флаг остановки анимации
        }
    }

}