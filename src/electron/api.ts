import { ipcMain } from "electron";
import { overlayWindow } from "./overlayWindow.js";
import Store from "electron-store";
ipcMain.on("update-value", (event, msg) => {
  const { key, value } = msg;
  overlayWindow.webContents.send("update-value", { key, value });
});

const store = new Store();
ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on("electron-store-set", async (_, key, val) => {
  store.set(key, val);
});
