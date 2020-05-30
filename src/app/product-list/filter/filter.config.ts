export default {
  cpu: [
    {
      filterKey: 'price',
      name: 'Цена, р',
      type: 'range'
    },
    {
      filterKey: 'releaseDate',
      name: 'Дата выхода, год',
      type: 'range'
    },
    {
      filterKey: 'producer',
      name: 'Производитель',
      type: 'select'
    },
    {
      filterKey: 'lineup',
      name: 'Модельный ряд',
      type: 'select'
    },
    {
      filterKey: 'socket',
      name: 'Сокет',
      type: 'select'
    },
    {
      filterKey: 'coreCount',
      name: 'Количествоя ядер',
      type: 'range'
    },
    {
      filterKey: 'threadCount',
      name: 'Количествоя потоков',
      type: 'range'
    },
    {
      filterKey: 'baseClock',
      name: 'Базовая тактовая частота, ГГц',
      type: 'range'
    },
    {
      filterKey: 'maxClock',
      name: 'Максимальная тактовая частота, ГГц',
      type: 'range'
    },
    {
      filterKey: 'TDP',
      name: 'Тепловыделение (TDP), Вт',
      type: 'range'
    },
    {
      filterKey: 'type',
      name: 'Тип поставки',
      type: 'select'
    },
    {
      filterKey: 'techProcess',
      name: 'Техпроцесс, нм',
      type: 'range'
    },
    {
      filterKey: 'includeGraphics',
      name: 'Встроенная графика',
      type: 'checkbox'
    }
  ]
};
