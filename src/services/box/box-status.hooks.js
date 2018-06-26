const process_status = require('../../hooks/process-status');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [process_status()],
    update: [process_status()],
    patch: [process_status()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
