import {useState, useEffect, useRef} from "react";
import {Dimensions} from "lib/utils";
import styled from "styled-components";

const
formatProps = (position, middle) => {
  if (typeof position === "undefined" && middle) return "50%";
  if (typeof position === "undefined" || position === "initial") return "initial";
  if (typeof position === "boolean") return 0 + "px";
  return position + "px";
},
formatCoordinates = (coordinates) => ({
  position: "", bottom: "initial", top: "initial",
  right: "initial", left: "initial", ...coordinates,
}),
DockerVehicle = styled.div`
position: ${props => props.position || "absolute"};
left: ${props => formatProps(props.left, props.middleX)};
top: ${props => formatProps(props.top, props.middleY)};
right: ${props => formatProps(props.right, props.middleX)};
bottom: ${props => formatProps(props.bottom, props.middleY)};
transform: ${props => !props.initial ? "initial" : `translate(${props.middleX ? "-50%" : 0}, ${props.middleY ? "-50%" : 0})`};
`;

/*
  props:
  middleY, (a boolean, only a value of truth makes sense)
  middleX, (a boolean, only a value of truth makes sense)
  top: (can have a value of a number or just a boolean);
  bottom: same as top
  left: same as top
  right: same as top
  container (a string that must be an id of the container element that its supposed to act
  as the container)

 */
export default function Docker(props) {
  const
  docker = useRef(null),
  [coordinates, setCoordinates] = useState({initial: true});

  useEffect(() => {
    if (!props.children) return null;
    const
    dock = Dimensions.keepInContainerViewportBoundaries(
      docker.current,
      document.getElementById(props.container)
    );

    function handleScroll() {
      const newCoordinates = dock();
      return newCoordinates ? setCoordinates(formatCoordinates(newCoordinates)) : null;
    }

    // setTimeout(() => handleScroll(), 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <DockerVehicle ref={docker} {...props} {...coordinates}>
           {props.children}
         </DockerVehicle>;
}
