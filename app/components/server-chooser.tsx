import { ChangeEvent, FormEvent, useContext, useRef } from "react";
import { Server, ServerContext } from "../context/contexts";
import { useDict } from "../utils/useDictHook";
import { INPUT, USUAL_BTN } from "../styles/uni-classes";

export const ServerChooser = () => {
  const dict = useDict();
  const { endpoint, setEndpoint } = useContext(ServerContext);
  const input = useRef<HTMLInputElement | null>(null);
  const handleServerChange = (
    event: ChangeEvent<HTMLSelectElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let newEndpoint: string;
    if (event.target instanceof HTMLSelectElement) {
      newEndpoint = event.target.value;
    } else {
      newEndpoint = input.current!.value;
    }
    setEndpoint(newEndpoint);
  };

  return (
    <section className="flex flex-row justify-center items-center gap-2">
      <label>
        {dict.serverChooserLabel}
        <select
          className={INPUT}
          name="serverSelector"
          value={endpoint}
          onChange={handleServerChange}
        >
          <option value={Server.Countries}>{dict.countries}</option>
          <option value={Server.Rick}>{dict.rickAndMorty}</option>
        </select>
      </label>
      <form onSubmit={handleServerChange}>
        <label>
          or use custom
          <input ref={input} type="url" name="serverInput" className={INPUT} />
          <input className={USUAL_BTN} type="submit" value="Send" />
        </label>
      </form>
    </section>
  );
};
