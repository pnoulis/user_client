// own - utilities
import {useStyle} from "lib/hooks";
// style
import style from "./styles/indicator.module.scss";


const styleReducer = (params) => {
  let config = {};
  if (params.selected) config.selected = true;
  return config;
};


export function Indicator({selected, otherClass}) {
  const setStyle = useStyle(style, {selected}, styleReducer);
  return (
    <div className={otherClass || style.container}>
      <span className={setStyle(["selected"], style.indicator)}></span>
    </div>
  );
}
