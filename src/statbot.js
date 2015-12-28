/*eslint-env browser */
// main dannybot script

var mail = require('./mail');

function ready() {
    Promise.resolve(show_counts());
}

async function show_counts() {
    try {
        var folders = await mail.get_mail_config();
        var counts = '';
        for (var k in folders) {
            var f = folders[k];
            counts = counts + ' ' + await f.count();
            update_mail_count(counts);
        }
    } catch (e) {
        throw e;
    }
}


function update_mail_count(s) {
    document.getElementById('inbox_num').innerHTML = s;
}

window.onload = ready;
