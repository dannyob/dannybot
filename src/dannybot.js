/*eslint-env browser */
// main dannybot script

var mail = require('./mail');
/* Function to run when DOM loaded */

function ready() {
    init_tab_handler();
    show_counts();
}

window.onload = ready;

/* Tab functions */

function init_tab_handler() {
    var tab_buttons = document.querySelectorAll('#tab-buttons *[data-tab]');
    for(var i = 0; i < tab_buttons.length; ++i) {
        tab_buttons[i].onclick = function () {
            var active = find_active_tab(tab_buttons);
            switch_active_tab(active, this);
        };
    }
}

function find_active_tab(tb) {
    for(var i = 0; i < tb.length; ++i) {
        if (tb[i].classList.contains('active')) {
            return tb[i];
        }
    }
}

function tab_div(tab) {
    var div_id = tab.dataset.tab;
    return document.getElementById(div_id);
}

function switch_active_tab(last_active, new_active) {
    tab_div(last_active).style.display = 'none';
    tab_div(new_active).style.display = 'block';
    last_active.classList.remove('active');
    new_active.classList.add('active');
}

/* Email count updater */

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
