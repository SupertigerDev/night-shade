import { contextBridge, ipcRenderer } from "electron";

interface UpdateValue {
  temperature: number;
  brightness: number;
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
    const cb = <U extends keyof UpdateValue>(
      _: unknown,
      msg: { key: U; value: UpdateValue[U] }
    ) => callback(msg);
    ipcRenderer.on("update-value", cb);

    return () => {
      ipcRenderer.off("update-value", cb);
    };
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
