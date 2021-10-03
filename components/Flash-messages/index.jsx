import {useState, useEffect} from "react";
import {Dimensions, SORTING_FUNCTIONS} from "lib/utils";
import {APP_STORE} from "lib/stores";
import {FLASHES} from "./Flashes";
import Dock from "components/Docker";
import styled from "styled-components";
import {useResizeEvent} from "lib/hooks";

const
makeFTimers = () => {
  const FTimers = {};
  return {
    add: (flashId, timerId) => FTimers[flashId] = timerId,
    get: (flashId) => FTimers[flashId],
    del: (flashId) => delete FTimers[flashId],
    show: () => FTimers,
  };
},
FSystem = {};
FSystem.timers = makeFTimers();
FSystem.setTimer = function(flash, appReducer) {
  this.timers.add(
    flash.config.flashId,
    setTimeout(() => appReducer("removeFlash", flash.config.flashId),
               flash.config.timeAlive),
  );
};
FSystem.renewTimer = function(flash, appReducer) {
  window.clearTimeout(this.timers.get(flash.config.flashId));
  this.setTimer(flash, appReducer);
};
FSystem.sortFlashes = (flashMessages) => SORTING_FUNCTIONS.order.decr("config.order", flashMessages);
FSystem.add = function(flashMessages, appReducer) {
  let copy = flashMessages.map(fm => FLASHES[fm.flashId](fm));
  const lastAdded = copy.pop();

  if (copy.some(fm => fm.config.flashId === lastAdded.config.flashId)) {
    lastAdded.config.timeAlive && this.renewTimer(lastAdded, appReducer);
  } else {
    copy.push(lastAdded);
    lastAdded.config.timeAlive && this.setTimer(lastAdded, appReducer);
  }

  return this.sortFlashes(copy);
};
FSystem.remove = (fms) => FSystem.sortFlashes(fms.map(fm => FLASHES[fm.flashId](fm)));

const
FlashMessages= styled.article`
font-size: var(--font-root-regular);
width: ${props => props.width ? props.width + "px" : "auto"};
display: flex;
flex-flow: column nowrap;
z-index: 50;
padding: 0 10px;
`,
FixWidth = (props) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(
      Dimensions.get(document.getElementById("main-content"), "width")("Wop")
    );
  }, []);

  return <FlashMessages width={width}>
           {props.children}
         </FlashMessages>;
};

export default function ListFlashMessages() {
  const
  {app, setApp} = APP_STORE.useAppContext(),
  [flashes, setFlashes] = useState([]),
  resize = useResizeEvent();

  useEffect(() => {
    if (app.flashMessages.length === flashes.length) return null;
    return setFlashes(
      (app.flashMessages.length > flashes.length) ? FSystem.add(app.flashMessages, setApp) :
        FSystem.remove(app.flashMessages)
    );
  }, [app.flashMessages]);

  return !app.flashMessages.length ? null :
    <Dock key={resize + app.flashMessages.length} bottom left container="main-content">
      <FixWidth>
        {flashes.length && flashes.map((fm, i) => fm.get(i))}
      </FixWidth>
    </Dock>;
}
