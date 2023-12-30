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
          {tooltipsList as ReactNode}
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
          <RootTypesDesc />
        </div>
      </details>
    </section>
  );
};

// const TypesDesc = ({ types }: TypesDescProps) => {
//   const nonSystemTypes = types.filter(
//     (type: Type) => !type.name.startsWith("_")
//   );
//   const typesList = nonSystemTypes.map((type: Type) => {
//     return (
//       <div className="flex flex-row gap-1 items-center" key={type.name}>
//         <span>{type.name}</span>
//         <span>({type.kind})</span>
//       </div>
//     );
//   });
//   return (
//     <div>
//       <h2 className={H2}>Endpoint Types</h2>
//       {typesList}
//     </div>
//   );
// };
