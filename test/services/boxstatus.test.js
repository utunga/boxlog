const assert = require('assert');
const app = require('../../src/app');

describe('\'boxstatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('box');

    assert.ok(service, 'Registered the service');
  });
});
