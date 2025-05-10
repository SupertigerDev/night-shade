import { BrowserWindow } from "electron";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export let overlayWindow: BrowserWindow;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createOverlayWindow = () => {
  overlayWindow = new BrowserWindow({
    thickFrame: false,
    autoHideMenuBar: true,
    transparent: true,
    skipTaskbar: true,
    focusable: false,
    alwaysOnTop: true,
    fullscreen: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  overlayWindow.loadURL("http://localhost:5173?overlay=true");

  // overlayWindow.loadFile(join(__dirname, "index.html"), {
  //   search: "overlay=true",
  // });
  overlayWindow.webContents.openDevTools({ mode: "detach" });

  overlayWindow.setIgnoreMouseEvents(true);
};
