import { useCallback, useEffect, useRef, useState } from "react";
import style from "./Slider.module.scss";

interface SliderProps {
  onChange?: (percent: number) => void;
  onEnd?: (percent: number) => void;
  percent: number;
  iconSrc?: string;
}
export const Slider = (props: SliderProps) => {
  const startPos = useRef(0);
  const startWidth = useRef(0);
  const slider = useRef<HTMLDivElement>(null);
  const wasMouseDown = useRef(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const getPercentage = useCallback(() => {
    const containerWidth = container!.offsetWidth - 36;
    const sliderWidth = slider.current!.offsetWidth - 36;

    return Math.round((sliderWidth / containerWidth) * 100);
  }, [container]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const distance = e.clientX - startPos.current;
      let newWidth = startWidth.current + distance;
      if (newWidth <= 36) {
        newWidth = 36;
      }
      slider.current!.style.width = newWidth + `px`;
      props.onChange?.(getPercentage());
    },
    [getPercentage, props]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      wasMouseDown.current = true;
      startPos.current = e.clientX;
      startWidth.current = slider.current!.offsetWidth;
      document.addEventListener("mousemove", onMouseMove);
    },
    [onMouseMove]
  );

  const onMouseUp = useCallback(() => {
    if (wasMouseDown.current) {
      document.removeEventListener("mousemove", onMouseMove);
      props.onEnd?.(getPercentage());
    }
    wasMouseDown.current = false;
  }, [onMouseMove, props, getPercentage]);

  const percentToWidth = (percentage: number) => {
    if (!container) {
      return 36;
    }
    const containerWidth = container!.offsetWidth;

    const effectiveMaxPx = Math.max(36, containerWidth);

    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    if (effectiveMaxPx === 36) {
      return 36;
    }

    const pixelRange = effectiveMaxPx - 36;

    const decimalPercentage = clampedPercentage / 100;

    const calculatedPx = 36 + decimalPercentage * pixelRange;

    return Math.round(calculatedPx);
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp]);

  return (
    <div
      className={style.container}
      onMouseDown={onMouseDown}
      ref={setContainer}
    >
      <div className={style.track}></div>
      <div
        className={style.slider}
        style={{ width: `${percentToWidth(props.percent)}px` }}
        ref={slider}
      >
        <img src={props.iconSrc} className={style.icon} />
      </div>
    </div>
  );
};
