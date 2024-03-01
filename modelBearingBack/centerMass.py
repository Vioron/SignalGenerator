from interfaces import Data
import math

from centerMassRollingElements import CenterMassRollingElements
from centerMassInnerRing import CenterMassInnerRing
from centerMassExternalRing import CenterMassExternalRing
class CenterMass:
    # Конструктор класса, инициализация объекта
    def __init__(self, data: Data):
        # Основные параметры
        self.data = data

        common_center_of_mass_rolling_element = []

    def __debug_print(self, *args):
        __DEBUG_MODE = True  # Глобальная переменная для включения/выключения дополнительных принтов
        if __DEBUG_MODE:
            print(*args)


    def calculation(self):
        self.__debug_print('-------------start-----------')
        center_of_mass_rolling_elements = CenterMassRollingElements(self.data)
        center_of_mass_inner_ring = CenterMassInnerRing(self.data)
        center_of_mass_external_ring = CenterMassExternalRing(self.data)

        common_center_of_mass_rolling_elements = center_of_mass_rolling_elements.calculation()
        common_center_of_mass_inner_ring = center_of_mass_inner_ring.calculation()
        common_center_of_mass_external_ring = center_of_mass_external_ring.calculation()

        self.__debug_print('-------------end-----------')
        return {
            'common_center_of_mass_rolling_elements' : common_center_of_mass_rolling_elements,
            'common_center_of_mass_inner_ring': common_center_of_mass_inner_ring,
            'common_center_of_mass_external_ring' : common_center_of_mass_external_ring,
        }