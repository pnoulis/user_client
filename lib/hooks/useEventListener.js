import {useEffect, useRef} from "react";
export const useEventListener = (
  eventName, handler, element = global, options = {}
) => {
  const savedHandler = useRef();
  const {capture, passive, once} = options;

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (element && !element.addEventListener) return null;
    const eventListener = e => savedHandler.current(e);
    const opts = {capture, passive, once};
    window.addEventListener(eventName, eventListener, opts);
    return () => window.removeEventListener(eventName, eventListener);
  }, [eventName, element, capture, passive, once]);
};
