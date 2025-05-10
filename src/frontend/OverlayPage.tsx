import { useEffect, useState } from "react";
import { getStore } from "./storage";

export const OverlayPage = () => {
  const [state, setState] = useState({
    brightness: getStore("brightness", 50) / 100,
    temperature: getStore("temperature", 50) / 100,
  });

  useEffect(() => {
    const unsubscribe = backend.onValue(({ key, value }) => {
      if (key === "BRIGHTNESS") setState({ ...state, brightness: value / 100 });
    });

    return () => unsubscribe();
  }, [state]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: `rgba(0,0,0,${state.brightness})`,
      }}
    ></div>
  );
};
