import { ChangeEvent, FormEvent, useContext, useRef } from "react";
import { Server, ServerContext } from "../context/contexts";
import { useDict } from "../utils/useDictHook";
import { INPUT, USUAL_BTN } from "../styles/uni-classes";

export const ServerChooser = () => {
  const dict = useDict();
  const { endpoint, setEndpoint } = useContext(ServerContext);
  const input = useRef<HTMLInputElement | null>(null);
  const fillInputIn = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    input.current!.value = event.target.value;
  };
  const handleServerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEndpoint = input.current!.value;
    setEndpoint(newEndpoint);
  };

  return (
    <section className="flex flex-col items-center">
      <form
        onSubmit={handleServerSubmit}
        className="flex flex-col md:flex-row justify-center items-center gap-2"
      >
        <label>
          {dict.serverChooserLabel}
          <select
            className={INPUT}
            name="serverSelector"
            defaultValue={endpoint}
            onChange={fillInputIn}
          >
            <option value={Server.Countries}>{dict.countries}</option>
            <option value={Server.Rick}>{dict.rickAndMorty}</option>
            <option value={Server.Custom}>{dict.customServer}</option>
          </select>
        </label>
        <input
          ref={input}
          type="url"
          name="serverInput"
          className={INPUT}
          defaultValue={endpoint}
          required
        />
        <input className={USUAL_BTN} type="submit" value={dict.setServer} />
      </form>
      <div className="flex md:flex-row flex-col items-baseline">
        <div className={USUAL_BTN}>{dict.actualServer}</div>
        <div className="px-2">{endpoint}</div>
      </div>
    </section>
  );
};
