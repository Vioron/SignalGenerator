from interfaces import Data
import math
class CenterMassExternalRing:
    # Конструктор класса, инициализация объекта
    def __init__(self, data: Data):
        # Основные параметры
        self.rotationRing = data.allParams.rotationRing
        self.realExternalRingDiameter = data.allParams.realExternalRingDiameter
        self.realExternalRingThickness = data.allParams.realExternalRingThickness
        self.realInnerRingDiameter = data.allParams.realInnerRingDiameter
        self.realInnerRingThickness  = data.allParams.realInnerRingThickness
        self.realRollingElementDiameter  = data.allParams.realRollingElementDiameter
        self.numberOfRollingElements = data.allParams.numberOfRollingElements

        self.realExternalRingRadiusExternalWall = self.realExternalRingDiameter / 2
        self.realExternalRingRadiusInnerWall = self.realExternalRingDiameter / 2 - self.realExternalRingThickness
        self.rollingElementsExternalBorderRadius = self.realExternalRingRadiusExternalWall - self.realExternalRingThickness + self.realRollingElementDiameter / 5;

        # Дефекты
        self.defectsExternalRing = data.allDefects.defectsExternalRing
        self.defectsInnerRing = data.allDefects.defectsInnerRing
        self.defectsRollingElements = data.allDefects.defectsRollingElements

        self.defectsAngles = []
        self.centers_of_mass_of_fragments = []
        self.common_center_of_mass = { 'x': 0, 'y': 0}
        self.A_whole_ring = math.pi * (self.realExternalRingRadiusExternalWall**2 - self.rollingElementsExternalBorderRadius ** 2)


    def __debug_print(self, *args):
        __DEBUG_MODE = True  # Глобальная переменная для включения/выключения дополнительных принтов
        if __DEBUG_MODE:
            print(*args)


    def print_data(self):
        print('rotationRing: ', self.rotationRing)
        print('realExternalRingDiameter: ',self.realExternalRingDiameter)
        print('realExternalRingThickness: ',self.realExternalRingThickness)
        print('realInnerRingDiameter: ',self.realInnerRingDiameter)
        print('realInnerRingThickness: ',self.realInnerRingThickness)
        print('realRollingElementDiameter: ',self.realRollingElementDiameter)
        print('numberOfRollingElements: ', self.numberOfRollingElements)

        print('defectsExternalRing: ', self.defectsExternalRing)
        print('defectsInnerRing: ', self.defectsInnerRing)
        print('defectsRollingElements: ', self.defectsRollingElements)


    def calculation(self):

        # Инициализация структур данных
        self.__debug_print('--------------------start defectsExternalRing--------------------------------')
        self.__debug_print(f'defectsExternalRing: {self.defectsExternalRing}')
        defects_external_ring_len = len(self.defectsExternalRing)
        #self.__debug_print(f'defects_rolling_elements_len: {defects_rolling_elements_len}')

        # Обработка дефектов
        if defects_external_ring_len != 0:
            for defect in self.defectsExternalRing:
                self.__debug_print(f'defect: {defect}')
                if defect.defectShape == 'Sector':
                        self.__sector(self.rollingElementsExternalBorderRadius, self.realExternalRingRadiusExternalWall, defect)
                # if defect.defectShape == 'Segment':
                #     self.__segment(self.realRollingElementDiameter, defect)
                # if defect.defectShape == 'Triangle':
                #     self.__triangle(self.realRollingElementDiameter, defect)

        # Обработка недефективных участков
       # self.__undamaged(self.realExternalRingRadiusInnerWall, self.realExternalRingRadiusExternalWall)
        x_common, y_common = self.__common_center_of_mass()
        self.common_center_of_mass['x'] = x_common
        self.common_center_of_mass['y'] = y_common

        self.__debug_print(f'self.common_center_of_mass: {self.common_center_of_mass}')

        self.__debug_print('--------------------finish defectsExternalRing--------------------------------')
        return self.common_center_of_mass


    def __sector(self, innerWall, externalWall, defect):
        # Вывод информации о дефекте
        self.__debug_print('----------------------------------------------------')

        self.__debug_print('startAngle:', defect.startAngle)
        self.__debug_print('finishAngle:', defect.finishAngle)
        self.__debug_print('innerWall:', innerWall)
        self.__debug_print('externalWall:', externalWall)

        # Преобразование углов в радианы и получение номера элемента
        start_angle_in_radians = math.radians(defect.startAngle)
        finish_angle_in_radians = math.radians(defect.finishAngle)


        self.__debug_print('startAngle_in_radians:', start_angle_in_radians)
        self.__debug_print('finishAngle_in_radians:', finish_angle_in_radians)

        # Добавление углов дефекта в список для данного элемента
        self.defectsAngles.append(
            {'startAngle': start_angle_in_radians, 'finishAngle': finish_angle_in_radians})

        # Вычисление параметров сектора
        range_angle_in_radians = abs(finish_angle_in_radians - start_angle_in_radians)
        innerWall_with_depth = innerWall + defect.depth * 0.001
        sin_difference = math.sin(finish_angle_in_radians) - math.sin(start_angle_in_radians)
        cos_difference = math.cos(start_angle_in_radians) - math.cos(finish_angle_in_radians)

# ===============================================================
        A = (range_angle_in_radians/2) * (innerWall_with_depth ** 2 - innerWall ** 2)
        # множитель
        factor = (innerWall_with_depth ** 3 - innerWall ** 3) / (3 * A)

        x = factor * sin_difference
        y = factor * cos_difference
        # ===============================================================

        # Добавление результатов в список центров масс
        self.centers_of_mass_of_fragments.append({"A": A, "x": x, "y": y})

        # Вывод информации о центрах масс
        self.__debug_print('__sector self.centers_of_mass_of_fragments =====> ', self.centers_of_mass_of_fragments)


    def __common_center_of_mass(self):
        Ax_common, Ay_common, A_common = 0, 0, self.A_whole_ring

        x_common =Ax_common/ A_common

        # Вычисление общего центра масс для заданного элемента
        for i in range(len(self.centers_of_mass_of_fragments)):
            Ax_defect = self.centers_of_mass_of_fragments[i]['x'] * \
                         self.centers_of_mass_of_fragments[i]['A']
            Ay_defect = self.centers_of_mass_of_fragments[i]['y'] * \
                         self.centers_of_mass_of_fragments[i]['A']
            A_defect = self.centers_of_mass_of_fragments[i]['A']

            Ax_common -= Ax_defect
            Ay_common -= Ay_defect
            A_common -= A_defect


       # self.A_whole_ring

        # Вычисление координат общего центра масс
        x_common = Ax_common / A_common
        y_common = Ay_common / A_common

        # Устранение ошибок округления (сравнение с нулем)
        x_common = 0 if -1e-12 < x_common < 1e-12 else x_common
        y_common = 0 if -1e-12 < y_common < 1e-12 else y_common

        # Отладочный вывод
        self.__debug_print('Common Center of Mass:')
        self.__debug_print(f'x_common: {x_common}')
        self.__debug_print(f'y_common: {y_common}')

        return x_common, y_common

