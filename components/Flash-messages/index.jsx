import {useState, useEffect} from "react";
import {Dimensions} from "lib/utils";
import {APP_STORE} from "lib/stores";
import {FLASHES} from "./Flashes";
import Dock from "components/Docker";
import styled from "styled-components";
import {useResizeEvent} from "lib/hooks";

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
  {app} = APP_STORE.useAppContext(),
  resize = useResizeEvent();

  return !app.flashMessages.length ? null :
    <Dock key={resize + app.flashMessages.length} bottom left container="main-content">
      <FixWidth>
          {app.flashMessages.map((fm, i) => (
            FLASHES[fm.flashId](i, fm)
          ))}
      </FixWidth>
    </Dock>;
}
