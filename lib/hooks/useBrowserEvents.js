import {useState, useEffect} from "react";
import {useEventListener} from "lib/hooks";

export
const
useHover = () => {
  const [hovered, set] = useState(false);
  return {
    hovered,
    bindHover: {
      onMouseEnter: () => set(true),
      onMouseLeave: () => set(false),
    },
  };
},
useFocus = () => {
  const [focused, set] = useState(false);
  return {
    focused,
    bindFocus: {
      onFocus: () => set(true),
      onBlur: () => set(false),
    },
  };
},
useResize = () => {
  const [resize, setResize] = useState("");
  useEventListener("resize", () => {
    setResize((Math.random() + 1).toString(36).substring(7));
  });
  return resize;
};
