import style from "./BrightnessPane.module.scss";
import { Slider } from "./Slider";
import TemperatureIcon from "../assets/temperature.svg";
import BrightnessIcon from "../assets/brightness.svg";
import { getStore, updateStore } from "../storage";

export const BrightnessPane = () => {
  return (
    <div className={style.container}>
      <Slider
        percent={Math.abs(getStore("brightness", 50) - 100)}
        onChange={(v) => {
          backend.updateValue("brightness", Math.abs(v - 100));
        }}
        onEnd={(v) => updateStore("brightness", Math.abs(v - 100))}
        iconSrc={BrightnessIcon}
      />
      <Slider
        percent={Math.abs(getStore("temperature", 50) - 100)}
        onChange={(v) => backend.updateValue("temperature", Math.abs(v - 100))}
        onEnd={(v) => updateStore("temperature", Math.abs(v - 100))}
        iconSrc={TemperatureIcon}
      />
    </div>
  );
};
