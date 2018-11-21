const process_contract_event = require('../../hooks/process-contract-event');
const after_contract_event = require('../../hooks/post-contract-event-logic');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [process_contract_event()],
    update: [process_contract_event()],
    patch: [process_contract_event()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [after_contract_event()],
    update: [after_contract_event()],
    patch: [after_contract_event()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
