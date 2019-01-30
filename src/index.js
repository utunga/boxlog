/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

const server = app.listen(app.get('port'));
server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), app.get('port'))
);
