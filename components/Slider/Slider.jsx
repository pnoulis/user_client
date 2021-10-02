import React, {useState, useEffect, useRef} from "react";
import {Dimensions} from "lib/utils";
import styled from "styled-components";

/*
  old colors:

  "rgb(160, 169, 200)",
  "rgb(61, 108, 185)", // blue
 */
const
LEVEL_COLORS = [
  "rgb(13, 94, 175)", // greece blue
  "rgb(255, 165, 0)", // orange
  "rgb(255, 36, 66)", // red
  "rgb(255, 228, 89)", // yellow
  "rgb(93, 130, 51)", // green
  "rgb(174, 0, 251)", // purple
  "rgb(255, 103, 231)" // pink
];

const
SliderWrapper = styled.aside`
border: 3px solid var(--color-honey);
background-color: var(--color-background-grey);
border-top-right-radius: 8px;
border-bottom-right-radius: 8px;
height: 100%;
width: 100%;
position: absolute;
left: -3px;
overflow-y: scroll;
scroll-behavior: smooth;
scrollbar-width: none;
font-size: var(--font-root-regular);
`,
SliderContent = styled.div`
min-height: ${props => props.height + "px"};
padding: 15px 8px 15px 5px;
`,
SliderCard = styled.div`
background-color: ${({level}) => LEVEL_COLORS[level]};
min-height: 50px;
max-height: 90px;
width: 95%;
margin: auto;
height: ${({level}) => 90 - level * 10 + "px"};
display: flex;
justify-content: center;
margin-bottom: 15px;
align-items: center;
border-radius: 8px;
cursor: pointer;

color: ${({level}) => !level ? "black" : "white"};
font-size: var(--font-size-large);
font-weight: bold;
letter-spacing: 0.5px;
text-transform: lowercase;

&:hover {
opacity: 0.7;
}
`;

function Slider({type, children}) {
  const [height, setHeight] = useState(0);
  const [selected, setSelected] = useState({});
  const slider = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    if (typeof selected.id !== "number") slider.current.scrollTop = 0;
  }, [selected]);


  useEffect(() => {
    let sliderHeight = Dimensions.get(slider.current, "height")("Hsbop");
    let contentHeight = Dimensions.get(content.current, "height")("Hsbop");
    contentHeight = sliderHeight + contentHeight - Math.round(contentHeight / children.length);
    setHeight(contentHeight);
  }, [slider, content]);


  return (
    <SliderWrapper ref={slider}>
      <SliderContent ref={content} height={height}>
        {
          children.map((c, i) => (
            i === selected.id ? null :
              <SliderNode key={i} id={i} setSelected={setSelected}>
                {c}
              </SliderNode>
          ))
        }
        {
          typeof selected.id === "number" &&
            <SliderNode key={selected.id} id={selected.id} setSelected={setSelected} selected>
              {children[selected.id]}
            </SliderNode>
        }
      </SliderContent>
    </SliderWrapper>
  );
}

function SliderNode({id, setSelected, selected, children}) {
  const node = useRef(null);

  useEffect(() => {
    if (selected) {
      node.current.parentElement.parentElement.scrollTop = node.current.offsetTop - 13;
    }
  }, [selected]);

  return (
    <div ref={node}
         onClick={() => selected ? setSelected({}) : setSelected({id})}
    >{selected ? React.cloneElement(children, {selected}) : children}
    </div>
  );
}

export {Slider, SliderCard};
