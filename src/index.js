const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');

function createWindow() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const mainWindow = new BrowserWindow({
    width: 320, // Use consistent width
    height: 400,
    x: Math.floor((width - 320) / 2), // Center horizontally
    y: height, // Start below the screen
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
  });

  mainWindow.loadFile('src/index.html');

  // Animate window moving up
  let targetY = Math.floor((height - 400) / 2); // Center vertically
  let currentY = height;
  let interval = setInterval(() => {
    if (currentY <= targetY) {
      clearInterval(interval);
      return;
    }
    currentY -= 10;
    mainWindow.setBounds({ x: mainWindow.getBounds().x, y: currentY, width: 320, height: 400 });
  }, 10);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
