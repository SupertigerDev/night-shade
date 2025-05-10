import style from "./BrightnessPane.module.scss";
import { Slider } from "./Slider";
import TemperatureIcon from "../assets/temperature.svg";
import BrightnessIcon from "../assets/brightness.svg";

export const BrightnessPane = () => {
  return (
    <div className={style.container}>
      <Slider percent={50} onChange={console.log} iconSrc={BrightnessIcon} />
      <Slider percent={50} onChange={console.log} iconSrc={TemperatureIcon} />
    </div>
  );
};
