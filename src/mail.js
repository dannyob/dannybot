// notmuch = require('notmuch');
const fs = require('fs');
const _ = require('underscore');

let folders = {};
// read in the folder list
fs.readFile(process.env.HOME + '/.config/dannybot/mail_config.js', 
        function (err, data) { 
            if (err) throw err;
            folders = JSON.parse(data);
        });

// enforce some structure on folders
function validate_folders(mf) {
    let r = true;
    _.map(mf, function (v) {
        if (v.length !== 3 ) { r = false; }
        if ((v[0] !== "threads") && (v[0] !== "messages")) { r = false; }
    });
   return r;
}

// exports
module.exports.folders = folders;

if (process.env.NODE_ENV === 'test') {
    module.exports._private = {};
    module.exports._private.validate_folders = validate_folders;
}
