/*eslint-env browser */
require('babel/register');

// spot errors thrown in async code without await
// see http://stackoverflow.com/questions/30649994/can-i-catch-an-error-from-async-without-using-await
// http://web.archive.org/web/20151228062951/http://stackoverflow.com/questions/30649994/can-i-catch-an-error-from-async-without-using-await
process.on('unhandledRejection', err => { throw err; });

require('./statbot.js');
