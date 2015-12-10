// main dannybot script

exec = require('child_process').exec;

function ready() {
    unread = exec('unread', {timeout: 100},
            function (err, stdout, stderr) {
                update_mail_count(''+stdout);
            });
    current_todo = exec('python ./src/todo_helper.py current', {timeout: 1000},
            function (err, stdout, stderr) {
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
