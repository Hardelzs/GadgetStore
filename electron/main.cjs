const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  // Production build: Load index.html from dist
  win.loadFile(path.join(__dirname, '../dist/index.html'));

  // Enable devtools to debug blank screen
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
console.log('Loading from:', path.join(__dirname, '../dist/index.html'));

