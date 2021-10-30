import {StandardLayout, NoLayout} from "components/APP";
import Socials, {Sec} from "components/Socials";
import { useResources } from "lib/resources";

export default function INDEX_PAGE() {
  return (
    <StandardLayout>
      <Socials orientation="vertical" size={50}/>
      <Socials orientation="vertical" size={50}/>
    </StandardLayout>
  );
}
