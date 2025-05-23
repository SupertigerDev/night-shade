import { ipcMain } from "electron";
import { overlayWindow } from "./overlayWindow.js";
import { store } from "./store.js";

let _brightness = 0;
let _temperature = 0;

ipcMain.on("update-value", (_, msg) => {
  const { key, value } = msg;
  overlayWindow.webContents.send("update-value", { key, value });
  _brightness = store.get("brightness", 50);
  _temperature = store.get("temperature", 50);

  if (key === "brightness") {
    _brightness = value;
  }
  if (key === "temperature") {
    _temperature = value;
  }
  if (_brightness === 0 && _temperature === 0) {
    overlayWindow.hide();
  } else {
    overlayWindow.show();
  }
});

ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on("electron-store-set", async (_, key, val) => {
  store.set(key, val);
});
