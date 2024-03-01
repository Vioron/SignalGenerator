from interfaces import Data
import math
class CenterMassInnerRing:
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

        self.realInnerRingRadiusInnerWall = self.realInnerRingDiameter / 2
        self.realInnerRingRadiusExternalWall = self.realInnerRingDiameter / 2 + self.realInnerRingThickness
        self.rollingElementsInnerBorderRadius = self.realInnerRingRadiusInnerWall + self.realInnerRingThickness - self.realRollingElementDiameter / 5;

        # Дефекты
        self.defectsExternalRing = data.allDefects.defectsExternalRing
        self.defectsInnerRing = data.allDefects.defectsInnerRing
        self.defectsRollingElements = data.allDefects.defectsRollingElements

        self.A_whole_ring = math.pi * (
                    self.rollingElementsInnerBorderRadius ** 2 - self.realInnerRingRadiusInnerWall ** 2)
        self.defectsAngles = []
        self.centers_of_mass_of_fragments = []
        self.common_center_of_mass = { 'x': 0, 'y': 0}


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
        self.__debug_print('---------------------------InnerRing-----------------------')
        self.__debug_print(f'defectsInnerRing: {self.defectsInnerRing}')
        defects_inner_ring_len = len(self.defectsInnerRing)
        #self.__debug_print(f'defects_rolling_elements_len: {defects_rolling_elements_len}')

        # Обработка дефектов
        if defects_inner_ring_len != 0:
            for defect in self.defectsInnerRing:
                self.__debug_print(f'defect: {defect}')
                if defect.defectShape == 'Sector':
                        self.__sector(self.realInnerRingRadiusInnerWall , self.rollingElementsInnerBorderRadius, defect)
                if defect.defectShape == 'Segment':
                    self.__segment(self.realInnerRingRadiusInnerWall , self.rollingElementsInnerBorderRadius, defect)
                if defect.defectShape == 'Triangle':
                    self.__triangle(self.realInnerRingRadiusInnerWall , self.rollingElementsInnerBorderRadius, defect)

        # Обработка недефективных участков
        #self.__undamaged(self.realInnerRingRadiusInnerWall, self.realInnerRingRadiusExternalWall)
        x_common, y_common = self.__common_center_of_mass()
        self.common_center_of_mass['x'] = x_common
        self.common_center_of_mass['y'] = y_common

        self.__debug_print(f'self.common_center_of_mass: {self.common_center_of_mass}')

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
        externalWall_with_depth = externalWall - defect.depth * 0.001
        sin_difference = math.sin(finish_angle_in_radians) - math.sin(start_angle_in_radians)
        cos_difference = math.cos(start_angle_in_radians) - math.cos(finish_angle_in_radians)

        # ===============================================================
        A = (range_angle_in_radians / 2) * (externalWall ** 2 - externalWall_with_depth ** 2)
        # множитель
        factor = (externalWall ** 3 - externalWall_with_depth ** 3) / (3 * A)

        x = factor * sin_difference
        y = factor * cos_difference
        # ===============================================================

        # Добавление результатов в список центров масс
        self.centers_of_mass_of_fragments.append({"A": A, "x": x, "y": y})

        # Вывод информации о центрах масс
        self.__debug_print('__sector self.centers_of_mass_of_fragments =====> ', self.centers_of_mass_of_fragments)


    def __segment(self, innerWall, externalWall, defect):
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

        # Расчет углового диапазона в радианах
        range_angle_in_radians = abs(finish_angle_in_radians - start_angle_in_radians)
        # angle_centers_of_mass = ((defect.startAngle + defect.finishAngle) / 2 + 180) % 360

        # площадь сегмента
        A_segment = 0.5 * (externalWall ** 2) * (range_angle_in_radians - math.sin(range_angle_in_radians))
        self.__debug_print('A_segment:', A_segment)

        # центр массы сегмента
        half_range_angle = range_angle_in_radians / 2
        segment_center_of_mass_X_without_transfer = ((2 * externalWall * math.sin(half_range_angle) ** 3) /
                                                     (3 * (half_range_angle - math.sin(half_range_angle) *
                                                           math.cos(half_range_angle))))

        segment_center_of_mass_X = segment_center_of_mass_X_without_transfer * math.cos(
            start_angle_in_radians + half_range_angle)
        segment_center_of_mass_Y = segment_center_of_mass_X_without_transfer * math.sin(
            start_angle_in_radians + half_range_angle)

        self.__debug_print('segment_center_of_mass_X:', segment_center_of_mass_X)
        self.__debug_print('segment_center_of_mass_Y:', segment_center_of_mass_Y)

        A = A_segment
        x = segment_center_of_mass_X
        y = segment_center_of_mass_Y

        # Добавление результатов в список центров масс
        self.centers_of_mass_of_fragments.append(
            {"A": A, "x": x, "y": y})

        # Вывод информации о центрах масс
        self.__debug_print('__segment self.centers_of_mass_of_fragments =====> ', self.centers_of_mass_of_fragments)


    def __triangle(self, innerWall, externalWall, defect):
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

        # Расчет углового диапазона в радианах
        range_angle_in_radians = abs(finish_angle_in_radians - start_angle_in_radians)
        # angle_centers_of_mass = ((defect.startAngle + defect.finishAngle) / 2 + 180) % 360

        externalWall_with_defect = externalWall - defect.depth * 0.001

        # центр массы треугольника
        vertex_of_triangle_first_angle_X = externalWall * math.cos(start_angle_in_radians)
        vertex_of_triangle_first_angle_Y = externalWall * math.sin(start_angle_in_radians)

        vertex_of_triangle_second_angle_X = externalWall * math.cos(finish_angle_in_radians)
        vertex_of_triangle_second_angle_Y = externalWall * math.sin(finish_angle_in_radians)

        vertex_of_height_X = externalWall_with_defect * math.cos(start_angle_in_radians + range_angle_in_radians / 2)
        vertex_of_height_Y = externalWall_with_defect * math.sin(start_angle_in_radians + range_angle_in_radians / 2)

        triangle_center_of_mass_X = (vertex_of_triangle_first_angle_X + vertex_of_triangle_second_angle_X + vertex_of_height_X) / 3
        triangle_center_of_mass_Y = (vertex_of_triangle_first_angle_Y + vertex_of_triangle_second_angle_Y + vertex_of_height_Y) / 3

        self.__debug_print('triangle_center_of_mass_X:', triangle_center_of_mass_X)
        self.__debug_print('triangle_center_of_mass_Y:', triangle_center_of_mass_Y)

        # площадь треугольника
        triangle_edge_from_first_angle = math.sqrt(
            (vertex_of_height_X - vertex_of_triangle_first_angle_X) ** 2 +
                      (vertex_of_height_Y - vertex_of_triangle_first_angle_Y) ** 2
        )

        triangle_edge_from_second_angle = math.sqrt(
            (vertex_of_height_X - vertex_of_triangle_second_angle_X) ** 2 +
            (vertex_of_height_Y - vertex_of_triangle_second_angle_Y) ** 2
        )

        base_of_triangle = math.sqrt(
            (vertex_of_triangle_second_angle_X - vertex_of_triangle_first_angle_X) ** 2 +
            (vertex_of_triangle_second_angle_Y - vertex_of_triangle_first_angle_Y) ** 2
        )

        semiperimeter = (triangle_edge_from_first_angle + triangle_edge_from_second_angle + base_of_triangle)/2

        self.__debug_print('semiperimeter:', semiperimeter)
        self.__debug_print('triangle_edge_from_first_angle:', triangle_edge_from_first_angle)
        self.__debug_print('triangle_edge_from_second_angle:', triangle_edge_from_second_angle)
        self.__debug_print('base_of_triangle:', base_of_triangle)

        A_triangle = math.sqrt(
            semiperimeter * (semiperimeter - triangle_edge_from_first_angle) *
            (semiperimeter - triangle_edge_from_second_angle) *
            (semiperimeter - base_of_triangle)
        )

        self.__debug_print('A_triangle:', A_triangle)

        # площадь сегмента
        A_segment = 0.5 * (externalWall ** 2) * (range_angle_in_radians - math.sin(range_angle_in_radians))
        self.__debug_print('A_segment:', A_segment)

        # центр массы сегмента
        half_range_angle = range_angle_in_radians / 2
        segment_center_of_mass_X_without_transfer = ((2 * externalWall * math.sin(half_range_angle) ** 3)/
                                                     (3 *(half_range_angle - math.sin(half_range_angle) *
                                                          math.cos(half_range_angle))))

        segment_center_of_mass_X = segment_center_of_mass_X_without_transfer * math.cos(start_angle_in_radians+ half_range_angle)
        segment_center_of_mass_Y = segment_center_of_mass_X_without_transfer * math.sin(start_angle_in_radians + half_range_angle)

        self.__debug_print('segment_center_of_mass_X:', segment_center_of_mass_X)
        self.__debug_print('segment_center_of_mass_Y:', segment_center_of_mass_Y)

        A = A_segment + A_triangle
        x = (segment_center_of_mass_X*A_segment + triangle_center_of_mass_X *A_triangle) / A
        y = (segment_center_of_mass_Y*A_segment + triangle_center_of_mass_Y *A_triangle) / A

        # Добавление результатов в список центров масс
        self.centers_of_mass_of_fragments.append(
             {"A": A,  "x": x, "y": y})

        # Вывод информации о центрах масс
        self.__debug_print('__triangle self.centers_of_mass_of_fragments =====> ', self.centers_of_mass_of_fragments)


    def __common_center_of_mass(self):
        Ax_common, Ay_common, A_common = 0, 0, self.A_whole_ring

        x_common = Ax_common / A_common

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
