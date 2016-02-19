/*eslint no-console: 0 */
var electron = require('electron');
var globalShortcut = electron.globalShortcut;
var menubar = require('menubar');
var mb = menubar({dir:'src', preload: true, icon: 'src/icon.png', width: 640, height: 512});

var shortcut = 'super+0'; // our shortcut

if (process.argv[2] === 'repl') {
    var replify = require('replify');
    var replServer = replify('statbot', null, {statbot:global, mb : mb});
    replServer.on('listening', function handleReplServerListen () {
        var socketPath = replServer.address();
        console.log('Debug repl opened at "%s". This should be accessible via `npm run debug-repl`', socketPath);
    });
}

mb.on('ready', function() {
    var ret = globalShortcut.register(shortcut, function () {
        mb.showWindow();
        // mb.window.webContents.openDevTools();
    });
    if (!ret) {
        console.log('Oh no! I could not register '+shortcut+' as a default shortcut.');
    }
});

mb.on('will-quit', function() {
    globalShortcut.unregister(shortcut);
    globalShortcut.unregisterAll();
});
