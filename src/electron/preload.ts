import { contextBridge, ipcRenderer } from "electron";

interface UpdateValue {
  TEMPERATURE: number;
  BRIGHTNESS: number;
}

export const backend = {
  updateValue: <T extends keyof UpdateValue>(key: T, value: UpdateValue[T]) =>
    ipcRenderer.send("update-value", { key, value }),
};

contextBridge.exposeInMainWorld("backend", backend);
