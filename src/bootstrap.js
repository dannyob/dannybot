/*eslint-env browser */
require('babel/register');
var s = require('./statbot.js');
window.onload = s.ready;
