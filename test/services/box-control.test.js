const assert = require('assert');
const app = require('../../src/app');

describe('\'box-control\' service', () => {
  it('registered the service', () => {
    const service = app.service('box-control');

    assert.ok(service, 'Registered the service');
  });
});
