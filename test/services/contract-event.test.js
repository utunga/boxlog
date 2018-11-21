const assert = require('assert');
const app = require('../../src/app');

describe('\'contract-event\' service', () => {
  it('registered the service', () => {
    const service = app.service('contract-event');

    assert.ok(service, 'Registered the service');
  });
});
