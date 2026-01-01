const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#050505',
        // icon: path.join(__dirname, 'public/favicon.ico'), // Icon disabled until file present
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Load the React build
    // relative to the main file
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));

    // Remove menu bar
    win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
