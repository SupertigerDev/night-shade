import { ipcMain } from "electron";
import { overlayWindow } from "./overlayWindow.js";
import { store } from "./store.js";

ipcMain.on("update-value", (_, msg) => {
  const { key, value } = msg;
  overlayWindow.webContents.send("update-value", { key, value });
  if (key === "brightness" && value === 0) overlayWindow.hide();
  else overlayWindow.show();
});

ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on("electron-store-set", async (_, key, val) => {
  store.set(key, val);
});
