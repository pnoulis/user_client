import {APP_STORE} from "lib/stores";
import {FLASHES} from "./Flashes";

export function ListFlashMessages() {
  const {flashMessages} = APP_STORE.useAppContext();

  if (!flashMessages.length) return null;
  return (
    <div>
      {flashMessages.map((fm, i) => (
        FLASHES[fm.flashId](i, fm)
      ))}
    </div>
  );
}
