"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const __dirname = path_1.default.resolve();
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#050505',
        icon: path_1.default.join(__dirname, 'public/favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.loadFile(path_1.default.join(__dirname, 'dist', 'index.html'));
    win.setMenuBarVisibility(false);
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
