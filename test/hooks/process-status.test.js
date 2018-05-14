const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processStatus = require('../../src/hooks/process-status');

describe('\'process-status\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      get(id) {
        return Promise.resolve({ id });
      }
    });

    app.service('dummy').hooks({
      before: processStatus()
    });
  });

  it('runs the hook', () => {
    return app.service('dummy').get('test').then(result => {
      assert.deepEqual(result, { id: 'test' });
    });
  });
});
