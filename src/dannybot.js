/*eslint-env browser */
// main dannybot script

const mail = require('./mail');
const storage = require('electron-json-storage');
const fs = require('fs');
const q  = require('q');

var readFile = q.nbind(fs.readFile);
/* Function to run when DOM loaded */

function ready() {
    init_tab_handler();
    show_counts();
    construct_checklist(document.getElementById('checklist'));
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

/* Checklist */
async function construct_checklist(hn) {
    hn.classList.add('checklist-container');
    var cl = await read_checklist();
    var a_checklist = cl.evening;
    Object.keys(a_checklist).forEach(function (k) {
        var item = a_checklist[k];
        var div = document.createElement('div');
        div.classList.add('checklist-item');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `evening${k}`;
        checkbox.name = `evening${k}`;
        checkbox.value = '1';
        if (item.value) {
            checkbox.checked = true;
        }
        checkbox.onchange = function () {
            item.value = this.checked;
            write_checklist(cl);
        };
        div.appendChild(checkbox);
        div.appendChild(document.createTextNode(item.text));
        hn.appendChild(div);
    });
    var reset = document.createElement('button');
    reset.type = 'reset';
    reset.innerText = 'Clear';
    reset.onclick = function () {
        Object.keys(a_checklist).forEach(function (k) {
            var item = a_checklist[k];
            item.value = false;
            });
        var buttons = hn.querySelectorAll('.checklist-container input[type=checkbox]');
        for (var i = 0; i < buttons.length; ++i) {
            buttons[i].checked = false;
        }
        write_checklist(cl);
    };
    hn.appendChild(reset);
}

async function read_checklist() {
    var url = await storage.get('checklist_url');
    if (!url) {
        var url_json = await readFile('/home/danny/Private/lifehacking/checklist-url.js');
        url = JSON.parse(url_json).api;
        storage.set('checklist_url', url);
    }
    var response = await window.fetch(url);
    var checklist = await response.json();
    return checklist;
}

async function write_checklist(checklist) {
    var url = await storage.get('checklist_url');
    if (!url) {
        var url_json = await readFile('/home/danny/Private/lifehacking/checklist-url.js');
        url = JSON.parse(url_json).api;
        storage.set('checklist_url', url);
    }
    console.log(JSON.stringify(checklist));
    var response = await window.fetch(url, { method: 'PUT',  headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(checklist)});
    console.log(response.status);
}
