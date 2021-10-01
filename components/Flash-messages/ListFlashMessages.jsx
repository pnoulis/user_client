import {APP_STORE} from "lib/stores";
import {FLASHES} from "./Flashes";
import {FlashMessages} from "./Styles";

export function ListFlashMessages() {
  const {app} = APP_STORE.useAppContext();

  return !app.flashMessages.length ? null :
    <FlashMessages>
      {app.flashMessages.map((fm, i) => (
        FLASHES[fm.flashId](i, fm)
      ))}
    </FlashMessages>;
}
