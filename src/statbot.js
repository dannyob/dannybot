/*eslint-env browser */
// main dannybot script

var exec = require('child_process').exec;

function ready() {
   exec('unread', {timeout: 100},
            function (err, stdout) {
                update_mail_count(''+stdout);
            });
   exec('python ./src/todo_helper.py current', {timeout: 1000},
            function (err, stdout) {
                 var result = JSON.parse(''+stdout);
                 update_current_todo(result.above.join('<br>'));
            });
          }

function update_mail_count(s) {
    document.getElementById('inbox_num').innerHTML = s;
}

function update_current_todo(s) {
    document.getElementById('todo_now').innerHTML = s;
}

window.onload = ready;
