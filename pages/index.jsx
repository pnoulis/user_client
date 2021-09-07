import {StandardLayout, NoLayout} from "components/App";
import {LoginDashboard, RegisterDashboard} from "components/Auth";
export default function INDEX_PAGE() {
  return (
    <NoLayout><RegisterDashboard/></NoLayout>
  );
}
