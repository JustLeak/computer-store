export default {
  cpu: [
    {
      name: 'Общая информация',
      rows: [
        {
          value: 'releaseDate',
          name: 'Дата выхода на рынок',
          postfix: 'г.'
        }
      ]
    },
    {
      name: 'Технические характеристики',
      rows: [
        {
          value: 'producer',
          name: 'Производитель'
        },
        {
          value: 'lineup',
          name: 'Модельный ряд'
        },
        {
          value: 'socket',
          name: 'Сокет'
        },
        {
          value: 'coreCount',
          name: 'Количествоя ядер'
        },
        {
          value: 'threadCount',
          name: 'Количествоя потоков'
        },
        {
          value: 'baseClock',
          name: 'Базовая тактовая частота',
          postfix: 'ГГц'
        },
        {
          value: 'maxClock',
          name: 'Максимальная тактовая частота',
          postfix: 'ГГц'
        },
        {
          value: 'TDP',
          name: 'Тепловыделение (TDP)',
          postfix: 'Вт'
        },
        {
          value: 'type',
          name: 'Тип поставки'
        },
        {
          value: 'techProcess',
          name: 'Техпроцесс',
          postfix: 'нм'
        },
        {
          value: 'includeGraphics',
          name: 'Встроенная графика',
          isBoolean: true
        }
      ]
    }
  ]
};
