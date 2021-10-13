import {useEffect, useState} from "react";
import {useEventListener} from "lib/hooks";
import styled from "styled-components";

const
Wrapper = styled.div`
transform-origin: left top;
width: min-content;
font-size: var(--font-root-regular);
position: absolute;
transform: scale(${(props) => props.scale})
`;

export
const
useScale = (initConfig) => {
  const
  [scale, setScale] = useState(initConfig),
  [mounted, setMounted] = useState(false);

  useEffect(() => {
    // if (mounted) return;
    // const clientScroll = document.documentElement.scrollWidth,
    //       clientWidth = document.documentElement.clientWidth;

    // console.log(clientScroll);
    // console.log(clientWidth);
    // if (clientScroll > clientWidth) setScale(scale - 0.1);
    // if (clientScroll === clientWidth) setMounted(true);
  }, [scale]);

  return {
    Scale: ({children}) => {
      return (
        <Wrapper scale={scale}>
          {children}
        </Wrapper>
      );
    },
    incr: (incr) => setScale(scale + incr),
    decr: (decr) => setScale(scale - decr),
  };
};
