import {useEffect, useState, useCallback} from "react";
import {Dimensions} from "lib/utils";
import styled from "styled-components";

const SizeWrapper = styled.div`
padding-top: ${props => props.padding + 50 + "px"};
padding-bottom: ${props => props.padding + "px"};
height: ${props => props.height ? props.height + "px" : "100%"};
`;
function Size({parentId, children}) {
  const [size, setSize] = useState({}),
        resize = useCallback(() => {
          let height = Math.round(Dimensions.get(document.getElementById(parentId), "visible")("cy"));
          let padding = Math.round((height - (height * 0.9)) / 2);
          setSize({height, padding});
        });

  useEffect(() => {
    let height = Math.round(Dimensions.get(document.getElementById(parentId), "visible")("cy"));
    let padding = Math.round((height - (height * 0.9)) / 2);
    if (height > 1700) {
      padding += Math.round((height - 1700) / 2);
    }
    setSize({height, padding});
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <SizeWrapper key={size.height} {...size}>
      {children}
    </SizeWrapper>
  );
}

export {Size};
