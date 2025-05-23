import { useEffect, useMemo, useState } from "react";
import { getStore } from "./storage";

export const OverlayPage = () => {
  const [state, setState] = useState({
    brightness: getStore("brightness", 50) / 100,
    temperature: getStore("temperature", 50) / 100,
  });

  useEffect(() => {
    const unsubscribe = backend.onValue(({ key, value }) => {
      if (key === "brightness") setState({ ...state, brightness: value / 100 });
      if (key === "temperature")
        setState({ ...state, temperature: value / 100 });
    });

    return () => unsubscribe();
  }, [state]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: `rgba(0,0,0,${state.brightness})`,
          position: "absolute",
          zIndex: "111111",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          width: "100%",
          height: "100%",
          backgroundColor: `rgba(255,255,0,${state.temperature / 5})`,
        }}
      ></div>
    </>
  );
};
