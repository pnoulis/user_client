import React, {useState, useEffect, useCallback} from "react";
import {useTimeout} from "lib/hooks";
import Flashes from "./Flashes";
import {APP_STORE} from "lib/stores";
import {Dimensions, SORTING_FUNCTIONS} from "lib/utils";
import Docker from "components/Docker";
import styled from "styled-components";

const
FlashMessagesWrapper = styled.article`
font-size: var(--font-root-regular);
width: ${props => props.width ? props.width + "px" : "auto"};
box-sizing: border-box;
max-width: 100vw;
display: flex;
flex-flow: column nowrap;
z-index: 50;
padding: 0 10px;
`,
FlashMessages = ({container, children}) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(
      Dimensions.get(document.getElementById(container), "width")("Wop")
    );
  }, [setWidth]);

  return (
    <FlashMessagesWrapper width={width}>
      {children}
    </FlashMessagesWrapper>
  );
},
sortFlashes = (flashes) => SORTING_FUNCTIONS.order.decr("config.order", flashes),
addFlash = (fms, flashes) => {
  const lastAdded = {...fms[fms.length - 1]};
  const duplicate = flashes.findIndex(flash => flash.config.flashId === lastAdded.flashId);
  return (duplicate === -1)
    ? [flashes.length, [...flashes, Flashes[lastAdded.flashId](lastAdded)]]
    : [duplicate, flashes.map((flash, i) => i !== duplicate ? flash : Flashes[lastAdded.flashId](lastAdded))];
},
rmFlash = (fms, flashes) => flashes.filter(flash => fms.some(fm => fm.flashId === flash.config.flashId)),
ListFlashMessages = ({container}) => {
  const {app, setApp} = APP_STORE.useAppContext();
  const {fms} = app;
  const [flashes, setFlashes] = useState([]);
  const flashTimeout = useTimeout();

  useEffect(() => {
    if (flashes.length === fms.length) return null;
    if (fms.length < flashes.length) {
      return setFlashes(sortFlashes(rmFlash(fms, flashes)));
    }
    if (fms.length > flashes.length) {
      const [index, newFlashes] = addFlash(fms, flashes);
      const {flashId, timeAlive} = newFlashes[index].config;
      timeAlive && flashTimeout(() => setApp("rmFlash", flashId), flashId, timeAlive);
      newFlashes.length === flashes.length && setTimeout(() => setApp("popFlash"), 1000);
      setFlashes(sortFlashes(newFlashes));
    }
  }, [fms]);

  return (
    <Docker bottom left container={container}>
      <FlashMessages container={container}>
        {flashes.map((flash, i) => flash.get(i))}
      </FlashMessages>
    </Docker>
  );
};

export default ListFlashMessages;
