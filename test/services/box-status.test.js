const assert = require('assert');
const app = require('../../src/app');

describe('\'box-status\' service', () => {
  it('registered the service', () => {
    const service = app.service('box-status');

    assert.ok(service, 'Registered the service');
  });
});
