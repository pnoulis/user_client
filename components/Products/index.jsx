import * as Styles from "./Styles";
import {Slider, SliderCard, Hide} from "components/Slider";

export default function Products({products}) {
  return (
    <Styles.Root>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <p>hahahah</p>
      <Styles.Sidebar>
        <Hide>
          <Slider type="vertical">
            <SliderCard level={0}>hello</SliderCard>
            <SliderCard level={0}>braaah</SliderCard>
          </Slider>
        </Hide>
      </Styles.Sidebar>
    </Styles.Root>
  );
}
