import { useDict } from "../utils/useDictHook";
import { ReactNode, useContext } from "react";
import { HelpContext } from "../context/contexts";
import { RootTypesDesc } from "./tooltips";
import { handleTooltipAction } from "../utils/help-utils";

export const HelpSection = () => {
  const { tooltipsList, setTooltipsList } = useContext(HelpContext);
  const dict = useDict();
  return (
    <section className="border-black border-2 rounded px-4 my-3">
      <details open>
        <summary>{dict.docHeader}</summary>
        <div className="h-[300px] max-h-[300px] overflow-y-auto	p-2 relative">
          {tooltipsList[tooltipsList.length - 1] as ReactNode}
          {tooltipsList.length > 0 && (
            <a
              className="absolute cursor-pointer text-blue-900"
              onClick={() => {
                const newTips = handleTooltipAction(tooltipsList);
                setTooltipsList(newTips);
              }}
            >
              {dict.back}
            </a>
          )}
          {tooltipsList.length === 0 && <RootTypesDesc />}
        </div>
      </details>
    </section>
  );
};
