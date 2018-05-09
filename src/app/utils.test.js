import * as utils from './utils';

// check for exports
test('check for exports', () => {
  expect(utils).toEqual(expect.objectContaining({
    timeToMins: expect.any(Function),
    minsToTime: expect.any(Function),
    calcDuration: expect.any(Function),
    calcBlockPlace: expect.any(Function),
    splitBlock: expect.any(Function),
    checkIntersection: expect.any(Function),
  }))
});

test('check checkIntersection false', () => {
  expect(utils.checkIntersection(
    {
      id: 1,
      time1: '05:15',
      time2: '06:15',
    },
    [
      {
        id: 2,
        time1: '01:00',
        time2: '05:15',
      },
      {
        id: 3,
        time1: '06:15',
        time2: '07:15',
      },
    ]
    )).toEqual(false)
});

test('check checkIntersection true inside', () => {
  expect(utils.checkIntersection(
    { id: 1, time1: '05:15', time2: '06:15' },
    [{ id: 2, time1: '01:00', time2: '08:15' }]
  )).toEqual(true)
});

test('check checkIntersection true left side', () => {
  expect(utils.checkIntersection(
    { id: 1, time1: '05:15', time2: '06:15' },
    [{ id: 2, time1: '01:00', time2: '05:16' }]
  )).toEqual(true)
});

test('check checkIntersection true left side', () => {
  expect(utils.checkIntersection(
    { id: 1, time1: '05:15', time2: '06:15' },
    [{ id: 2, time1: '06:14', time2: '06:15' }]
  )).toEqual(true)
});

test('check checkIntersection false itself', () => {
  expect(utils.checkIntersection(
    { id: 1, time1: '05:15', time2: '06:15' },
    [{ id: 1, time1: '05:15', time2: '06:15' }, { id: 2, time1: '07:14', time2: '08:15' }]
  )).toEqual(false)
});
