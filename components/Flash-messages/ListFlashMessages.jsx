import {APP_STORE} from "lib/stores";
import {FLASHES} from "./Flashes";

export function ListFlashMessages() {
  const {app} = APP_STORE.useAppContext();

  if (!app.flashMessages.length) return null;
  return (
    <div>
      {app.flashMessages.map((fm, i) => (
        FLASHES[fm.flashId](i, fm)
      ))}
    </div>
  );
}
