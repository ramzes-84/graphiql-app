import { useContext, SyntheticEvent } from "react";
import { ServerContext, HelpContext } from "../context/contexts";
import { H2 } from "../styles/uni-classes";
import { Data, Field, QueryType } from "../utils/request";
import { useDict } from "../utils/useDictHook";
import { createPopupTooltip, handleTooltipAction } from "../utils/help-utils";

export const RootTypesDesc = () => {
  const dict = useDict();
  const { fullSchema, endpoint } = useContext(ServerContext);
  const { setTooltipsList, tooltipsList } = useContext(HelpContext);

  const showTooltip = async (
    event: SyntheticEvent<HTMLButtonElement, MouseEvent>,
    rootType: QueryType
  ) => {
    const tooltipElement = await createPopupTooltip(
      rootType.kind,
      rootType.name,
      endpoint
    );
    const newTooltips = handleTooltipAction(tooltipsList, tooltipElement);
    setTooltipsList(newTooltips);
  };

  if (fullSchema) {
    const { queryType, mutationType, subscriptionType } = fullSchema;
    const rootTypes = [queryType, mutationType, subscriptionType]
      .filter((item: QueryType | null) => !!item)
      .map((rootType) => {
        return (
          <div
            className="flex flex-row gap-1 items-center"
            key={rootType?.name}
          >
            <button onClick={(e) => showTooltip(e, rootType as QueryType)}>
              {rootType?.name}
            </button>
            <span>({rootType?.kind})</span>
            <span>{rootType?.description}</span>
          </div>
        );
      });
    return (
      <div>
        <h2 className={H2}>{dict.rootTypes}</h2>
        {rootTypes}
      </div>
    );
  }
};

export const ObjectTooltip = ({ data }: { data: Data }) => {
  const { endpoint } = useContext(ServerContext);
  const { setTooltipsList, tooltipsList } = useContext(HelpContext);
  const dict = useDict();
  const showTooltip = async (
    event: SyntheticEvent<HTMLButtonElement, MouseEvent>,
    rootType: QueryType
  ) => {
    const tooltipElement = await createPopupTooltip(
      rootType.kind,
      rootType.name,
      endpoint
    );
    const newTooltips = handleTooltipAction(tooltipsList, tooltipElement);
    setTooltipsList(newTooltips);
  };

  const fieldsList = data.__type.fields?.map((field: Field) => {
    return (
      <div className="flex flex-row gap-1 items-center" key={field.name}>
        <button onClick={(e) => showTooltip(e, field)}>{field.name}</button>
        <span>{field.type.name}</span>
      </div>
    );
  });
  return (
    <div className="w-full h-full absolute bg-white">
      <h2 className={H2}>{data.__type.name}</h2>
      <p>({data.__type.kind})</p>
      <p>
        {dict.description}: {data.__type.description || dict.notProvided}
      </p>
      {fieldsList}
    </div>
  );
};
