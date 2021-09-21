import {useState, useEffect, useRef, useCallback} from "react";
import {Dimensions} from "lib/utils";
import styled from "styled-components";
const
position = (position, middle) => {
  if (typeof position === "undefined" && !middle) return "initial";
  return typeof position !== "undefined" ? position === "boolean" ? 0 : position + "px" : "50%";
},
Docker = styled.div`
position: ${props => props.position};
left: ${props => position(props.left, props.middleX)};
top: ${props => position(props.top, props.middleY)};
right: ${props => !props.middleX && position(props.right, props.middleX)};
bottom: ${props => !props.middleY && position(props.bottom, props.middleY)};
`,
/*
  takes props:
  position="absolute | relative | ..."
  top, left, bottom, right
  middleY, middleX, sticky
 */
Dock = (props) => {
  const
  [dock, setDock] = useState({position: props.position || "absolute"}),
  [height, setHeight] = useState(0),
  docker = useRef(null),
  turnSticky = useCallback((() => {
    const cords = {
      yFixed: false,
      xFixed: false,
      moving: [],
    };
    return () => {
      if (!cords.hasOwnProperty("yPoints") || !cords.hasOwnProperty("xPoints")) {
        const positions = Dimensions.get(docker.current, "position");
        cords.yPoints = [positions.posT];
        cords.xPoints = [positions.posL];
      }

      cords.moving.push(Math.round(window.scrollX), Math.round(window.scrollY));
      if (cords.moving.length <= 4) return null;
      cords.moving.shift(); cords.moving.shift();

      if (cords.moving[0] === cords.moving[2]) { // moving vertically

        if ((cords.xFixed || cords.yFixed) && !Dimensions.areYpointsCrossed(docker.current, ...cords.yPoints)[0]) {
          cords.yFixed = false;
          cords.xFixed = false;
          setDock({position: "absolute", left: Dimensions.get(docker.current, "relativeWidth").Xpls});
        }
        if (!cords.yFixed && Dimensions.areYpointsCrossed(docker.current, ...cords.yPoints)[0]) {
          cords.yFixed = true;
          setDock({height: null, position: "fixed", top: 0, left: Dimensions.get(docker.current, "relativeWidth").Xvls});
        }
      } else { // moving horizontally
        if ((cords.yFixed || cords.xFixed) && !Dimensions.areXpointsCrossed(docker.current, ...cords.xPoints)[0]) {
          cords.xFixed = false;
          cords.yFixed = false;
          setDock({position: "absolute", top: Dimensions.get(docker.current, "relativeHeight").Ypts});
          }

        if (!cords.xFixed && Dimensions.areXpointsCrossed(docker.current, ...cords.xPoints)[0]) {
          cords.xFixed = true;
          setDock({position: "fixed", left: 0, top: Dimensions.get(docker.current, "relativeHeight").Yvts});
        }
      }
    };
  })());

  useEffect(() => {
    if (!props.sticky) return null;
    window.addEventListener("scroll", turnSticky);
    return () => window.removeEventListener("scroll", turnSticky);
  }, []);

  return (
    <Docker
      ref={docker}
      {...props}
      height={height}
      {...dock}
    >
      {props.children}
    </Docker>
  );
};

export default Dock;
