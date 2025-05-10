import { contextBridge, ipcRenderer } from "electron";

interface UpdateValue {
  TEMPERATURE: number;
  BRIGHTNESS: number;
}

export const backend = {
  updateValue: <T extends keyof UpdateValue>(key: T, value: UpdateValue[T]) =>
    ipcRenderer.send("update-value", { key, value }),
  onValue: (
    callback: <T extends keyof UpdateValue>(data: {
      key: T;
      value: UpdateValue[T];
    }) => void
  ) => {
    ipcRenderer.on("update-value", (_, msg) => callback(msg));
  },

  store: {
    get<T>(key: string, defaultValue: T) {
      return ipcRenderer.sendSync("electron-store-get", key) ?? defaultValue;
    },
    set<T>(property: string, val: T) {
      ipcRenderer.send("electron-store-set", property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
};

contextBridge.exposeInMainWorld("backend", backend);
