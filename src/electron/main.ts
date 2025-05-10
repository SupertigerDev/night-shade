import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "./api.js";
import { createOverlayWindow } from "./overlayWindow.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  createOverlayWindow();
  const uiWindow = new BrowserWindow({
    width: 400,
    height: 600,
    autoHideMenuBar: true,
    transparent: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  uiWindow.loadURL("http://localhost:5173");

  // uiWindow.loadFile(join(__dirname, "index.html"));
  uiWindow.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(() => {
  createWindow();
});
