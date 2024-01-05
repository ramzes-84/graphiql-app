import { useDict } from "../utils/useDictHook";
import { ReactNode } from "react";
import { useServerRequestContext } from "../context/contexts";
import { RootTypesDesc } from "./tips";
import { generateTipsArr } from "../utils/help-utils";

export const HelpSection = () => {
  const {
    state: { tipsList },
    dispatch,
  } = useServerRequestContext();
  const dict = useDict();
  return (
    <section className="border-black border-2 rounded px-4 my-3">
      <details open>
        <summary>{dict.docHeader}</summary>
        <div className="h-[300px] max-h-[300px] overflow-y-auto	p-2 relative">
          {tipsList[tipsList.length - 1] as ReactNode}
          {tipsList.length > 0 && (
            <a
              className="absolute cursor-pointer text-blue-900"
              onClick={() => {
                const newTips = generateTipsArr(tipsList);
                dispatch({ type: "setTipsList", payload: newTips });
              }}
            >
              {dict.back}
            </a>
          )}
          {tipsList.length === 0 && <RootTypesDesc />}
        </div>
      </details>
    </section>
  );
};
