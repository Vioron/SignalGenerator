from interfaces import Data
import math
class CenterMassRollingElements:
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


        # Дефекты
        self.defectsExternalRing = data.allDefects.defectsExternalRing
        self.defectsInnerRing = data.allDefects.defectsInnerRing
        self.defectsRollingElements = data.allDefects.defectsRollingElements


        self.defectsAngles = {}
        self.centers_of_mass_of_fragments = {}
        self.common_center_of_mass_all_elements = []


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
        for i in range(1, self.numberOfRollingElements + 1):
            self.centers_of_mass_of_fragments[f'{i}'] = []
            self.defectsAngles[f'{i}'] = []
            self.common_center_of_mass_all_elements.append({'number': i , 'x': 0, 'y': 0})

        self.__debug_print(f'defectsRollingElements: {self.defectsRollingElements}')
        defects_rolling_elements_len = len(self.defectsRollingElements)
        #self.__debug_print(f'defects_rolling_elements_len: {defects_rolling_elements_len}')

        # Обработка дефектов
        if defects_rolling_elements_len != 0:
            for defect in self.defectsRollingElements:
                self.__debug_print(f'defect: {defect}')
                if defect.defectShape == 'Sector':
                        self.__sector(self.realRollingElementDiameter, defect)
                if defect.defectShape == 'Segment':
                    self.__segment(self.realRollingElementDiameter, defect)
                if defect.defectShape == 'Triangle':
                    self.__triangle(self.realRollingElementDiameter, defect)

        # Обработка недефективных участков
        for i in range(1, self.numberOfRollingElements + 1):
            self.__undamaged(self.realRollingElementDiameter, i)
            x_common, y_common = self.__common_center_of_mass(i)
            self.common_center_of_mass_all_elements[i - 1]['x'] = x_common
            self.common_center_of_mass_all_elements[i - 1]['y'] = y_common

        self.__debug_print('-------------calculation common_center_of_mass_all_elements-----------')
        self.__debug_print(f'common_center_of_mass_all_elements: {self.common_center_of_mass_all_elements}')

        return self.common_center_of_mass_all_elements


    def __sector(self, diameter, defect):
        # Вывод информации о дефекте
        self.__debug_print('----------------------------------------------------')
        self.__debug_print('startAngle:', defect.startAngle)
        self.__debug_print('finishAngle:', defect.finishAngle)
        self.__debug_print('diameter:', defect.finishAngle)

        # Преобразование углов в радианы и получение номера элемента
        start_angle_in_radians = math.radians(defect.startAngle)
        finish_angle_in_radians = math.radians(defect.finishAngle)
        number_element = defect.numberRollingElement

        self.__debug_print('startAngle_in_radians:', start_angle_in_radians)
        self.__debug_print('finishAngle_in_radians:', finish_angle_in_radians)

        # Добавление углов дефекта в список для данного элемента
        self.defectsAngles[f'{number_element}'].append(
            {'startAngle': start_angle_in_radians, 'finishAngle': finish_angle_in_radians})

        # Вычисление параметров сектора
        range_angle_in_radians = abs(finish_angle_in_radians - start_angle_in_radians)

        radius_with_depth = diameter / 2 - defect.depth * 0.001

        A = range_angle_in_radians * (radius_with_depth ** 2) / 2
        x = (2 * radius_with_depth) / (3 * range_angle_in_radians) * (
                    math.sin(finish_angle_in_radians) - math.sin(start_angle_in_radians))
        y = (2 * radius_with_depth) / (3 * range_angle_in_radians) * (
                    math.cos(start_angle_in_radians) - math.cos(finish_angle_in_radians))

        self.__debug_print('A:', A)
        self.__debug_print('x:', x)
        self.__debug_print('y:', y)

        # Добавление результатов в список центров масс
        self.centers_of_mass_of_fragments[f'{number_element}'].append({"A": A,  "x": x, "y": y})

        # Вывод информации о центрах масс
        self.__debug_print('__sector self.centers_of_mass_of_fragments =====> ', self.centers_of_mass_of_fragments)


    def __segment(self, diameter, defect):
        # Вывод информации о дефекте
        self.__debug_print('startAngle:', defect.startAngle)
        self.__debug_print('finishAngle:', defect.finishAngle)

        # Преобразование углов в радианы и получение номера элемента
        start_angle_in_radians = math.radians(defect.startAngle)
        finish_angle_in_radians = math.radians(defect.finishAngle)
        number_element = defect.numberRollingElement

        self.__debug_print('startAngle_in_radians:', start_angle_in_radians)
        self.__debug_print('finishAngle_in_radians:', finish_angle_in_radians)

        # Добавление углов дефекта в список для данного элемента
        self.defectsAngles[f'{number_element}'].append(
            {'startAngle': start_angle_in_radians, 'finishAngle': finish_angle_in_radians})

        # Вычисление параметров сегмента
        range_angle_in_radians = abs(finish_angle_in_radians - start_angle_in_radians)

        radius = diameter / 2

        p = radius + 0.5 * radius * math.sqrt(2-2 * math.cos(range_angle_in_radians))
        A = (p-radius) * math.sqrt(p**2 - p*radius * math.sqrt(2 - 2 * math.cos(range_angle_in_radians)))

        x = (radius * (math.cos(finish_angle_in_radians)+math.cos(start_angle_in_radians))) / 3
        y = (radius * (math.sin(finish_angle_in_radians)+math.sin(start_angle_in_radians))) / 3

        # Добавление результатов в список центров масс
        self.centers_of_mass_of_fragments[f'{number_element}'].append({"A": A, "x": x, "y": y})

        # Вывод информации о центрах масс
        self.__debug_print('__sector self.centers_of_mass_of_fragments =====> ', self.centers_of_mass_of_fragments)


    def __triangle(self, diameter, defect):
        # Вывод информации о дефекте
        self.__debug_print('startAngle:', defect.startAngle)
        self.__debug_print('finishAngle:', defect.finishAngle)

        # Преобразование углов в радианы и получение номера элемента
        start_angle_in_radians = math.radians(defect.startAngle)
        finish_angle_in_radians = math.radians(defect.finishAngle)
        number_element = defect.numberRollingElement

        self.__debug_print('startAngle_in_radians:', start_angle_in_radians)
        self.__debug_print('finishAngle_in_radians:', finish_angle_in_radians)

        # Добавление углов дефекта в список для данного элемента
        self.defectsAngles[f'{number_element}'].append({
            'startAngle': start_angle_in_radians,
            'finishAngle': finish_angle_in_radians
        })

        # Расчет углового диапазона в радианах
        range_angle_in_radians = abs(finish_angle_in_radians - start_angle_in_radians)

        # Расчет радиуса и других связанных значений
        radius = diameter / 2
        p = radius + 0.5 * radius * math.sqrt(2 - 2 * math.cos(range_angle_in_radians))
        A_segment = (p - radius) * math.sqrt(p ** 2 - p * radius * math.sqrt(2 - 2 * math.cos(range_angle_in_radians)))

        # Расчет центра масс сегмента
        x_segment_center_mass = (radius * (math.cos(finish_angle_in_radians) + math.cos(start_angle_in_radians))) / 3
        y_segment_center_mass = (radius * (math.sin(finish_angle_in_radians) + math.sin(start_angle_in_radians))) / 3

        # Расчет скорректированного радиуса с учетом глубины дефекта
        defect_depth_mm = defect.depth * 0.001
        radius_with_depth = radius - defect_depth_mm

        # Расчет вершины треугольника внутри сегмента
        x_vertex_of_triangle = radius_with_depth * math.cos(range_angle_in_radians / 2)
        y_vertex_of_triangle = radius_with_depth * math.sin(range_angle_in_radians / 2)

        # Расчет центра масс маленького треугольника
        x_little_triangle = (radius * (
                    math.cos(finish_angle_in_radians) + math.cos(start_angle_in_radians)) + x_vertex_of_triangle) / 3
        y_little_triangle = (radius * (
                    math.sin(finish_angle_in_radians) + math.sin(start_angle_in_radians)) + y_vertex_of_triangle) / 3

        # Расчет высоты и площади маленького треугольника
        height_little_triangle = defect_depth_mm - radius * (1 - math.cos(range_angle_in_radians / 2))
        A_little_triangle = 0.5 * radius * math.sqrt(2 - 2 * math.cos(range_angle_in_radians)) * height_little_triangle

        # Расчет центра масс всего треугольника и площади
        A  = A_segment - A_little_triangle
        x = (A_segment * x_segment_center_mass - A_little_triangle * x_little_triangle) / A
        y = (A_segment * y_segment_center_mass - A_little_triangle * y_little_triangle) / A

        # Добавление результатов в список центров масс
        self.centers_of_mass_of_fragments[f'{number_element}'].append({"A": A,"x": x, "y": y})

        # Вывод информации о центрах масс
        self.__debug_print('__triangle self.centers_of_mass_of_fragments =====> ', self.centers_of_mass_of_fragments)


    def __undamaged(self, diameter, numberElement):
        # Вывод информации о входных данных
        self.__debug_print('----------------------------------------------------')
        self.__debug_print(f'Executing __undamaged for element {numberElement}')
        self.__debug_print(f'self.defectsAngles: {self.defectsAngles}')

        A, x, y = 0 , 0, 0
        defects_angles = self.defectsAngles.get(f'{numberElement}', [])

        # Вычисление площади и центра масс, если дефекты отсутствуют
        if not defects_angles:
            A = math.pi * (diameter / 2) ** 2
            # Добавление результатов в список центров масс
            self.centers_of_mass_of_fragments[f'{numberElement}'].append({"A": A,  "x": x, "y": y})
        else:
            # Сортировка углов дефектов по начальному углу
            sorted_defects_angles = sorted(defects_angles, key=lambda angle: angle['startAngle'])
            self.__debug_print(f'sorted_defects_angles: {sorted_defects_angles}')
            self.__debug_print(f'Number of defects: {len(sorted_defects_angles)}')

            # Обработка каждой целой части
            for i in range(0, len(sorted_defects_angles)):
                start_angle_in_radians = sorted_defects_angles[i - 1]['finishAngle']
                finish_angle_in_radians = sorted_defects_angles[i]['startAngle']

                self.__debug_print(f'start_angle_in_radians: {start_angle_in_radians}')
                self.__debug_print(f'finish_angle_in_radians: {finish_angle_in_radians}')

                # Обработка случая перехода через 360 градусов
                if finish_angle_in_radians < start_angle_in_radians:
                    finish_angle_in_radians += 2 * math.pi

                # Пропуск итерации, если углы совпадают
                if finish_angle_in_radians == start_angle_in_radians:
                    self.__debug_print('__undamaged: continue')
                    continue

                self.__debug_print(f'start_angle_in_radians: {start_angle_in_radians}')
                self.__debug_print(f'finish_angle_in_radians: {finish_angle_in_radians}')

                # Вычисление разницы углов и других параметров
                range_angle_in_radians = abs(finish_angle_in_radians - start_angle_in_radians)
                self.__debug_print(f'range_angle_in_radians: {range_angle_in_radians}')

                radius = diameter / 2
                A = range_angle_in_radians * (radius ** 2) / 2
                x = (2 * radius) / (3 * range_angle_in_radians) * (
                            math.sin(finish_angle_in_radians) - math.sin(start_angle_in_radians))
                y = (2 * radius) / (3 * range_angle_in_radians) * (
                            math.cos(start_angle_in_radians) - math.cos(finish_angle_in_radians))

                # Добавление результатов в список центров масс
                self.centers_of_mass_of_fragments[f'{numberElement}'].append({"A": A, 'angle': None,  "x": x, "y": y})


        self.__debug_print(f'__undamaged self.centers_of_mass_of_fragments: {self.centers_of_mass_of_fragments}')


    def __common_center_of_mass(self, numberElement):
        Ax_common, Ay_common, A_common = 0, 0, 0

        # Вычисление общего центра масс для заданного элемента
        for i in range(len(self.centers_of_mass_of_fragments[f'{numberElement}'])):
            Ax_common += self.centers_of_mass_of_fragments[f'{numberElement}'][i]['x'] * \
                         self.centers_of_mass_of_fragments[f'{numberElement}'][i]['A']
            Ay_common += self.centers_of_mass_of_fragments[f'{numberElement}'][i]['y'] * \
                         self.centers_of_mass_of_fragments[f'{numberElement}'][i]['A']
            A_common += self.centers_of_mass_of_fragments[f'{numberElement}'][i]['A']


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

