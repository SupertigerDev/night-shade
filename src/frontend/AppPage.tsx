import style from "./AppPage.module.scss";
import { BrightnessPane } from "./components/BrightnessPane";

export const AppPage = () => (
  <div className={style.container}>
    <BrightnessPane />
  </div>
);
