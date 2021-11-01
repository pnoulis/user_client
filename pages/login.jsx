import {NoLayout, StandardLayout} from "components/APP";
import {LoginDashboard} from "components/Auth";

export default function LOGIN_PAGE() {
  return (
    <StandardLayout><LoginDashboard/></StandardLayout>
  );
}
