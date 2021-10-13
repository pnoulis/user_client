import {useEffect, useRef, useState, useCallback} from "react";
import {createPersistedState} from "lib/hooks";
const usePersistentEvents = createPersistedState("scheduledEvents");
export const runMostRecentCb = (done = () => {}) => {
  let timeoutSet = false;
  let current = null;
  const registerCallback = (callback, time, ...args) => {
    callback.time = Date.now();
    callback.args = args;
    current = callback;
    if (timeoutSet) return;
    setTimeout(() => {
      if (callback.time === current.time) {
        timeoutSet = false;
        current(...args);
        return done();
      }
      timeoutSet = false;
      registerCallback(current, time - (Date.now() - current.time), current.args);
    }, time);
    timeoutSet = true;
  };
  return registerCallback;
};
export const usePersistentTimeout = () => {
  const scheduledEvents = useRef();
  const [events, setEvent] = usePersistentEvents({});

  const notify = useCallback((id) => {
    const removeCompletedEvent = {...scheduledEvents.current};
    delete removeCompletedEvent[id];
    scheduledEvents.current = removeCompletedEvent;
    setEvent(removeCompletedEvent);
  }, [setEvent]);

  const scheduleEvent = useCallback((cb, id, time, ...args) => {
    const scheduledEvent = scheduledEvents.current[id]
          ? scheduledEvents.current[id][0]
          : null;
    if (scheduledEvent) {
      setEvent({...scheduledEvents.current, [id]: [scheduledEvent, Date.now() + time]});
      return scheduledEvent(cb, time, ...args);
    }
    const schedule = runMostRecentCb(() => notify(id));
    setEvent({...scheduledEvents.current, [id]: [schedule, Date.now() + time]});
    const hangingEvent = parseInt(scheduledEvents.current[id] && scheduledEvents.current[id][1]);
    schedule(
      cb,
      hangingEvent ? Date.now() > hangingEvent ? 0 : hangingEvent - Date.now() : time,
      ...args
    );
  }, [setEvent]);

  useEffect(() => {
    scheduledEvents.current = events;
  }, [events]);

  return scheduleEvent;
};
export const useTimeout = () => {
  const scheduledEvents = useRef();
  const [events, setEvent] = useState({});

  const notify = useCallback((id) => {
    const removeCompletedEvent = {...scheduledEvents.current};
    delete removeCompletedEvent[id];
    scheduledEvents.current = removeCompletedEvent;
    setEvent(removeCompletedEvent);
  }, [setEvent]);

  const scheduleEvent = useCallback((cb, id, time, ...args) => {
    if (scheduledEvents.current[id]) return scheduledEvents.current[id](cb, time, ...args);
    const schedule = runMostRecentCb(() => notify(id));
    setEvent({...scheduledEvents.current, [id]: schedule});
    schedule(cb, time, ...args);
  }, [setEvent]);

  useEffect(() => {
    scheduledEvents.current = events;
  }, [events]);

  return scheduleEvent;
};
