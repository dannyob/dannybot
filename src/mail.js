// notmuch = require('notmuch');
const fs = require('fs');
const _ = require('underscore');
const q  = require('q');

var readFile = q.nbind(fs.readFile);
var folders = {};

// enforce some structure and object structure on folders
function _cleanup(mf) {
    var new_mf = _.mapObject(mf, function (v) {
        if (v.length !== 3 ) { throw new Error('Mail folder definition should be three fields long.' + v); }
        if ((v[0] !== 'threads') && (v[0] !== 'messages')) { throw new Error('Mail folder should specify threads or messages.'); }
        return v;
    });
    return new_mf;
}


async function _get_mail_config(config_file) {
        if (!config_file) {
            config_file = process.env.HOME + '/.config/dannybot/mail_config.js';
        }
        try {
            var data = await readFile(config_file);
        } catch (e) {
            throw e;
        }
        var result = _cleanup(JSON.parse(data));
        return result;
}
// exports
module.exports.folders = folders;

if (process.env.NODE_ENV === 'test') {
    module.exports._private = {};
    module.exports._private.cleanup  = _cleanup;
    module.exports._private.get_mail_config = _get_mail_config;
} else {
    _get_mail_config('').then(function(d) { console.log(_cleanup(d)); } );
}
