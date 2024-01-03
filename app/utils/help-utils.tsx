import { ReactNode, useContext } from "react";
import { ObjectTooltip } from "../components/tooltips";
import { getGQLInfoByName } from "./request";
import { HelpContext, ServerContext } from "../context/contexts";
import { H2 } from "../styles/uni-classes";
import { useDict } from "./useDictHook";
import { EN } from "./dictionaries";

export const useTipsCreator = () => {
  const dict = useDict();
  const { endpoint } = useContext(ServerContext);
  const { setTooltipsList, tooltipsList } = useContext(HelpContext);
  return async function tipsCreator(entityName: string) {
    const tooltipElement = await createPopupTooltip(entityName, dict, endpoint);
    const newTooltips = handleTooltipAction(tooltipsList, tooltipElement);
    setTooltipsList(newTooltips);
  };
};

export const createPopupTooltip = async (
  entityName: string,
  dict: typeof EN,
  endpoint: string
) => {
  const query = `{
    __type(name: "${entityName}") {
      name
      kind
      description
      interfaces {
        name
      }
      possibleTypes {
        name
      }
      enumValues {
        name
      }
      ofType {
        name
        kind
        description
      }
      fields {
        name
        description
        args {
          name
          description
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
        type {
          name
          kind
          ofType {
            name
            kind
            ofType {
              name
              kind
              ofType {
                name
                kind
                ofType {
                  name
                }
              }
            }
          }
        }
      }
      inputFields {
        name
        type {
          name
          description
        }
        description
        defaultValue
      }
    }
  }`;
  const typeInfo = await getGQLInfoByName(endpoint, query);
  switch (typeInfo.__type.kind) {
    case "SCALAR": {
      return (
        <div className="absolute">
          <div className={H2}>{typeInfo.__type.name}</div>
          <p>{typeInfo.__type.description}</p>
        </div>
      );
    }
    case "ENUM": {
      const values = typeInfo.__type.enumValues!.map((value) => (
        <p key={value.name}>{value.name}</p>
      ));
      return (
        <div className="absolute">
          <div className={H2}>{typeInfo.__type.name}</div>
          <div>{dict.enums}</div>
          {values}
        </div>
      );
    }
    case "OBJECT": {
      return <ObjectTooltip data={typeInfo} key={typeInfo.__type.name} />;
    }
    case "INPUT_OBJECT": {
      return <ObjectTooltip data={typeInfo} key={typeInfo.__type.name} />;
    }
    default:
      return <div className="absolute">{dict.createPopupTooltipError}</div>;
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
