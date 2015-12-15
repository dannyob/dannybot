// notmuch = require('notmuch');
var fs = require('fs');

fs.readFile(process.env.HOME + '/.config/dannybot/mail_config.js', 
        function (err, data) { 
            if (err) throw err; 
            module.exports.folders = JSON.parse(data);
        });
