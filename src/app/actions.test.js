import * as actions from './actions';

// check for exports
test('check for exports', () => {
  expect(actions).toEqual(expect.objectContaining({
    downloadFile: expect.any(Function),
  }))
});
