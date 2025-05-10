import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "./api.js";
import { createOverlayWindow } from "./overlayWindow.js";
import { isPacked } from "./utils.js";

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

  if (isPacked()) {
    uiWindow.loadFile(join(__dirname, "index.html"));
  } else {
    uiWindow.loadURL("http://localhost:5173");
    uiWindow.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => {
  createWindow();
});
