import Store from "electron-store";

interface StoreState {
  brightness: number;
  temperature: number;
}
export const store = new Store<StoreState>();
