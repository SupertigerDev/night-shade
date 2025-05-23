import { BrowserWindow } from "electron";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { isPacked } from "./utils.js";
import { store } from "./store.js";

export let overlayWindow: BrowserWindow;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createOverlayWindow = () => {
  const isOff =
    store.get("brightness", 50) === 0 && store.get("temperature", 50) === 0;

  overlayWindow = new BrowserWindow({
    thickFrame: false,
    autoHideMenuBar: true,
    transparent: true,
    skipTaskbar: true,
    focusable: false,
    show: !isOff,
    alwaysOnTop: true,
    fullscreen: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  if (isPacked()) {
    overlayWindow.loadFile(join(__dirname, "index.html"), {
      search: "overlay=true",
    });
  } else {
    overlayWindow.loadURL("http://localhost:5173?overlay=true");
    overlayWindow.webContents.openDevTools({ mode: "detach" });
  }

  overlayWindow.setIgnoreMouseEvents(true);
};
