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

test('check checkIntersection true inside 1', () => {
  expect(utils.checkIntersection(
    { id: 1, time1: '05:15', time2: '06:15' },
    [{ id: 2, time1: '01:00', time2: '08:15' }]
  )).toEqual(true)
});

test('check checkIntersection true inside 2', () => {
  expect(utils.checkIntersection(
    { id: 2, time1: '01:00', time2: '08:15' },
    [{ id: 1, time1: '05:15', time2: '06:15' }],
  )).toEqual(true)
});

test('check checkIntersection true with slide', () => {
  expect(utils.checkIntersection(
    { id: 1, time1: '23:30', time2: '00:33' },
    [{ id: 2, time1: '00:30', time2: '08:00' }, { id: 2, time1: '20:30', time2: '23:30' }]
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

test('check checkIntersection true same time', () => {
  expect(utils.checkIntersection(
    { id: 1, time1: '05:15', time2: '06:15' },
    [{ id: 5, time1: '05:15', time2: '06:15' }, { id: 2, time1: '07:14', time2: '08:15' }]
  )).toEqual(true)
});

test('check checkIntersection false across midnight', () => {
  expect(utils.checkIntersection(
    { id: 1, time1: '23:30', time2: '00:30' },
    [{ id: 5, time1: '20:00', time2: '23:30' }, { id: 2, time1: '00:30', time2: '08:15' }]
  )).toEqual(false)
});
