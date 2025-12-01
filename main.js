const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const i18next = require('i18next');

// i18nextの初期化
const localesDir = path.join(__dirname, 'public', 'locales');
const enTranslation = JSON.parse(fs.readFileSync(path.join(localesDir, 'en', 'translation.json'), 'utf8'));
const jaTranslation = JSON.parse(fs.readFileSync(path.join(localesDir, 'ja', 'translation.json'), 'utf8'));

i18next.init({
  lng: 'ja', // デフォルト言語
  resources: {
    en: {
      translation: enTranslation
    },
    ja: {
      translation: jaTranslation
    }
  }
});

function createMenu() {
  const menuTemplate = [
    {
      label: i18next.t('menu.file'),
      submenu: [
        {
          label: i18next.t('menu.exit'),
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: i18next.t('menu.view'),
      submenu: [
        {
          label: i18next.t('menu.reload'),
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: i18next.t('menu.toggle_dev_tools'),
          accelerator: 'CmdOrCtrl+Shift+I',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools();
            }
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  createMenu();

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});