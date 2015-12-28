/*eslint-disable no-unused-vars, no-console*/
// notmuch = require('notmuch');
const fs = require('fs');
const child_process = require('child_process');
const _ = require('underscore');
const q  = require('q');


var readFile = q.nbind(fs.readFile);
var exec = q.nbind(child_process.exec);
var folders = {};

function _cleanup(mf) {
    var new_mf = _.mapObject(mf, function (v) {
        if (v.length !== 3 ) { throw new Error('Mail folder definition should be three fields long.' + v); }
        if ((v[0] !== 'threads') && (v[0] !== 'messages')) { throw new Error('Mail folder should specify threads or messages.'); }
        return {
            description: v[2],
            search_terms: v[1],
            message_only: (v[0]==='messages'),
            count : async function() {
                var answer = await exec('notmuch count '+this.search_terms, {timeout: 1000});
                return parseInt(answer[0]);
            }
        };
    });
    return new_mf;
}


async function get_mail_config(config_file) {
        if (!config_file) {
            config_file = process.env.HOME + '/.config/dannybot/mail_config.js';
        }
        try {
            var data = await readFile(config_file);
        } catch (e) {
            throw e;
        }
        return  _cleanup(JSON.parse(data));
}

// exports
module.exports.folders = folders;
module.exports.get_mail_config = get_mail_config;

if (process.env.NODE_ENV === 'test') {
    module.exports._private = {};
    module.exports._private.cleanup  = _cleanup;
    module.exports._private.get_mail_config = get_mail_config;
}
