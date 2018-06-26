const assert = require('assert');
const app = require('../../src/app');

describe('\'ContractType\' service', () => {
  it('registered the service', () => {
    const service = app.service('contract-type');

    assert.ok(service, 'Registered the service');
  });
});
