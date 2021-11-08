import {useEffect, useState} from "react";
import {useEventListener} from "lib/hooks";

export function useTouchStart() {
  const [touched, setTouched] = useState(false);
  useEventListener("touchstart", e => {
    e.preventDefault();
    setTouched(!touched);
  });
  return touched;
}
