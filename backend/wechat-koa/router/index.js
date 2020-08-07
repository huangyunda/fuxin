const { inquiry } = require('./inquiry');
const { upload, download } = require('./excel');

const routes = [
  { method: 'post', path: '/inquiry', fn: inquiry },
  { method: 'post', path: '/upload', fn: upload },
  { method: 'get', path: '/download', fn: download },
];

module.exports = routes;
