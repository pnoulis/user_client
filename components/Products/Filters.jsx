import {Hide, Size, Slider, SliderCard} from "components/Slider";
import Dock from "components/Docker";

export default function Filters({container}) {
  return (
    <Dock top left container={container}>
      <Size container={container}>
        <Hide>
          <Slider>
            <SliderCard level={0}>hello</SliderCard>
            <SliderCard level={0}>bro</SliderCard>
          </Slider>
        </Hide>
      </Size>
    </Dock>
  );
}
