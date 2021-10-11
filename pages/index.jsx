import {StandardLayout, NoLayout} from "components/App";
import {LoginDashboard, RegisterDashboard} from "components/Auth";
import {Seed} from "lib/hooks";
export default function INDEX_PAGE() {
  return (
    <StandardLayout><Seed/></StandardLayout>
  );
}
