from interfaces import Data
import math

class SignalGenerator:
     # Конструктор класса, инициализация объекта

    def __init__(self, data,  common_center_of_mass):

        # Основные параметры
        self.rotationRing = data.allParams.rotationRing
        self.rpm = data.allParams.rpm
        self.realExternalRingDiameter = data.allParams.realExternalRingDiameter
        self.realExternalRingThickness = data.allParams.realExternalRingThickness
        self.realInnerRingDiameter = data.allParams.realInnerRingDiameter
        self.realInnerRingThickness = data.allParams.realInnerRingThickness
        self.realRollingElementDiameter = data.allParams.realRollingElementDiameter
        self.numberOfRollingElements = data.allParams.numberOfRollingElements
        self.contactAngleOfRollingElements = data.allParams.contactAngleOfRollingElements;

        # Дефекты
        self.defectsExternalRing = data.allDefects.defectsExternalRing
        self.defectsInnerRing = data.allDefects.defectsInnerRing
        self.defectsRollingElements = data.allDefects.defectsRollingElements

        # Центры масс
        self.common_center_of_mass_rolling_elements = common_center_of_mass['common_center_of_mass_rolling_elements']
        self.common_center_of_mass_inner_ring = common_center_of_mass['common_center_of_mass_inner_ring']
        self.common_center_of_mass_external_ring = common_center_of_mass['common_center_of_mass_external_ring']

        self.step_descritization = 0.02;
        self.total_signal_values = 1000;

    def additional_parameter_calculations(self):
        # радиус до внешней стенки внешнего кольца
        self.realExternalRingRadiusExternalWall = self.realExternalRingDiameter / 2
        # верхняя граница соприкосновения тел качения с внешнем кольцом
        self.rollingElementsExternalBorderRadius = self.realExternalRingRadiusExternalWall - self.realExternalRingThickness + self.realRollingElementDiameter / 5;

        # радиус до внутренней стенки внутреннего кольца
        self.realInnerRingRadiusInnerWall = self.realInnerRingDiameter / 2
        # внутренняя граница соприкосновения тел качения с внутренним кольцом
        self.rollingElementsInnerBorderRadius = self.realInnerRingRadiusInnerWall + self.realInnerRingThickness - self.realRollingElementDiameter / 5;

        # Радиус сепоратора
        self.separatorRadius = (self.rollingElementsExternalBorderRadius + self.rollingElementsInnerBorderRadius) / 2;
        # Диаметр сепоратора
        self.separatorDiameter = self.separatorRadius * 2;
        # Частота вала в секундах
        self.shaftFrequency = self.rpm / 60
        # Частота тел качения
        self.rollingElementFrequency = \
            (self.shaftFrequency * self.separatorDiameter / (1 * self.realRollingElementDiameter) *
             (1 - (self.realRollingElementDiameter / self.separatorDiameter *
                   math.cos(self.contactAngleOfRollingElements)) ** 2));


    def calculation(self):
        self.additional_parameter_calculations()
        print(self.rollingElementFrequency)
        # x_result, y_result = self.__result_with_zeros()

        self.rotationSign = -1 if self.rotationRing == 'internal' else 1;

        #x_coordinates, y_coordinates = (
        x_coordinates_rolling_elements, y_coordinates_rolling_elements = [] , []

        x_coordinates_rolling_elements, y_coordinates_rolling_elements = self.__rolling_elements(self.rotationSign)
        #)

        x_coordinates_inner_ring, y_coordinates_inner_ring = [], []
        x_coordinates_external_ring, y_coordinates_external_ring = [], []

        if self.rotationRing == 'internal':
            x_coordinates_inner_ring, y_coordinates_inner_ring = self.__inner_ring()
        else:
            x_coordinates_external_ring, y_coordinates_external_ring = self.__external_ring()

        return {
            'x_coordinates_rolling_elements': x_coordinates_rolling_elements,
            'y_coordinates_rolling_elements': y_coordinates_rolling_elements,
            'x_coordinates_inner_ring': x_coordinates_inner_ring,
            'y_coordinates_inner_ring': y_coordinates_inner_ring,
            'x_coordinates_external_ring': x_coordinates_external_ring,
            'y_coordinates_external_ring': y_coordinates_external_ring
        }


    def __rolling_elements(self, rotationSign):
        len_common_center_of_mass_rolling_elements= len(self.common_center_of_mass_rolling_elements)

        x_coordinates_rolling_elements = []
        y_coordinates_rolling_elements = []

        print('self.common_center_of_mass_rolling_elements ====>>> ', self.common_center_of_mass_rolling_elements)
        for i in range(0, len_common_center_of_mass_rolling_elements):
            x = self.common_center_of_mass_rolling_elements[i]['x']
            y = self.common_center_of_mass_rolling_elements[i]['y']

            print('x => ', x)
            print('y => ', y)

            # Вычисляем угол в радианах
            angle_rad = math.atan2(y, x)

            # Переводим угол из радиан в градусы
            angle_deg = math.degrees(angle_rad)

            # Обрабатываем отрицательные углы
            if angle_deg < 0:
                angle_deg += 360

            print('angle_deg => ' , angle_deg)

            eccentricity = math.sqrt(x ** 2 + y ** 2)
            print('eccentricity => ',eccentricity)

            x_coordinates_rolling_elements.append([])
            y_coordinates_rolling_elements.append([])

            if (x != 0 and y != 0):
                for step in range(0, self.total_signal_values):
                    x = step * self.step_descritization
                    y = eccentricity * math.cos(
                        x * (2 * math.pi) * self.rollingElementFrequency + angle_rad)  # / self.rollingElementFrequency

                    x_coordinates_rolling_elements[i].append(x)
                    y_coordinates_rolling_elements[i].append(y)

        return  (x_coordinates_rolling_elements, y_coordinates_rolling_elements)


    def __inner_ring(self):

        print('self.common_center_of_mass_inner_ring ====>>> ', self.common_center_of_mass_inner_ring)

        x = self.common_center_of_mass_inner_ring['x']
        y = self.common_center_of_mass_inner_ring['y']

        print('x => ', x)
        print('y => ', y)

        # Вычисляем угол в радианах
        angle_rad = math.atan2(y, x)

        # Переводим угол из радиан в градусы
        angle_deg = math.degrees(angle_rad)

        # Обрабатываем отрицательные углы
        if angle_deg < 0:
            angle_deg += 360

        print('angle_deg => ', angle_deg)

        eccentricity = math.sqrt(x ** 2 + y ** 2)
        print('eccentricity => ', eccentricity)

        x_coordinates_inner_ring = []
        y_coordinates_inner_ring = []

        if (x != 0 and y != 0):
            for step in range(0, self.total_signal_values):
                x = step * self.step_descritization
                y = eccentricity * math.cos(x    *(2 * math.pi) * self.shaftFrequency+ angle_rad)  # / self.rollingElementFrequency
                # y=math.cos(step * self.step_descritization)
                x_coordinates_inner_ring.append(x)
                y_coordinates_inner_ring.append(y)

        return (x_coordinates_inner_ring, y_coordinates_inner_ring)


    def __external_ring(self):

         print('self.common_center_of_mass_inner_ring ====>>> ', self.common_center_of_mass_external_ring)

         x = self.common_center_of_mass_external_ring['x']
         y = self.common_center_of_mass_external_ring['y']

         print('x => ', x)
         print('y => ', y)

         # Вычисляем угол в радианах
         angle_rad = math.atan2(y, x)

         # Переводим угол из радиан в градусы
         angle_deg = math.degrees(angle_rad)

         # Обрабатываем отрицательные углы
         if angle_deg < 0:
             angle_deg += 360

         print('angle_deg => ', angle_deg)

         eccentricity = math.sqrt(x ** 2 + y ** 2)
         print('eccentricity => ', eccentricity)

         x_coordinates_external_ring = []
         y_coordinates_external_ring = []

         if (x != 0 and y != 0):
             print('shaftFrequency => ', self.shaftFrequency)
             for step in range(0, self.total_signal_values):
                 x = step * self.step_descritization
                 y = eccentricity * math.cos(x   *(2 * math.pi) * self.shaftFrequency + angle_rad)  # / self.rollingElementFrequency
                 # y=math.cos(step * self.step_descritization)
                 x_coordinates_external_ring.append(x)
                 y_coordinates_external_ring.append(y)

         print('rollingElementFrequency +++++>>>> ', self.common_center_of_mass_external_ring)
         return (x_coordinates_external_ring, y_coordinates_external_ring)


