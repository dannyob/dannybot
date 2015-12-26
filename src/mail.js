// notmuch = require('notmuch');
const fs = require('fs');
const _ = require('underscore');

var folders = {};
// read in the folder list

function get_mail_config(config_file, cb) {
    if (!config_file) {
        config_file = process.env.HOME + '/.config/dannybot/mail_config.js';
    }
    fs.readFile(config_file,
            function (err, data) {
                cb(err, JSON.parse(data));
            });
}

// enforce some structure and object structure on folders
function _cleanup(mf) {
    var new_mf = _.mapObject(mf, function (v) {
        if (v.length !== 3 ) { throw new Error('Mail folder definition should be three fields long.' + v); }
        if ((v[0] !== 'threads') && (v[0] !== 'messages')) { throw new Error('Mail folder should specify threads or messages.'); }
        return v;
    });
    return new_mf;
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
