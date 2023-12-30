import { ReactNode } from "react";
import { ObjectTooltip } from "../components/tooltips";
import { getInfoAboutType } from "./request";

export const createPopupTooltip = async (
  kind: string,
  name: string,
  endpoint: string
) => {
  switch (kind) {
    case "OBJECT":
      const query = `{
        __type(name: "${name}") {
          name
          kind
          description
          fields {
            name
            description
            args {
              name
            }
            type {
              name
            }
            
          }
        }
      }`;
      const typeInfo = await getInfoAboutType(endpoint, query);
      return <ObjectTooltip data={typeInfo} key={typeInfo.__type.name} />;

    default:
      break;
  }
};

export const handleTooltipAction = (
  tooltips: (Element | ReactNode)[],
  element?: Element | React.JSX.Element
) => {
  const newTips = [...tooltips];
  if (element) {
    newTips.push(element);
    return newTips;
  }
  newTips.pop();
  return newTips;
};
