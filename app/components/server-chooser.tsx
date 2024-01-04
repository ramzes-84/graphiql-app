import { ChangeEvent, FormEvent, useContext, useEffect, useRef } from "react";
import { HelpContext, Server, ServerContext } from "../context/contexts";
import { useDict } from "../utils/useDictHook";
import { INPUT, USUAL_BTN } from "../styles/uni-classes";
import { getSchema } from "../utils/request";

export const ServerChooser = () => {
  const dict = useDict();
  const { endpoint, setEndpoint, setFullSchema } = useContext(ServerContext);
  const { setTooltipsList } = useContext(HelpContext);

  const input = useRef<HTMLInputElement | null>(null);
  const fillInputIn = (event: ChangeEvent<HTMLSelectElement>) => {
    input.current!.value = event.target.value;
  };
  const handleServerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEndpoint = input.current!.value;
    const newSchema = await getSchema(endpoint);
    setFullSchema(newSchema);
    setEndpoint(newEndpoint);
    setTooltipsList([]);
  };
  useEffect(() => {
    async function getData() {
      const newSchema = await getSchema(endpoint);
      setFullSchema(newSchema);
    }
    getData();
  }, [endpoint, setFullSchema]);

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
            <option value={Server.Swapi}>{dict.swapi}</option>
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
        <p className={USUAL_BTN}>{dict.actualServer}</p>
        <p className="px-2">{endpoint}</p>
      </div>
    </section>
  );
};
