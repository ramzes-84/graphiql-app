import { useContext } from "react";
import { ServerContext } from "../context/contexts";
import { H2, TYPE_BTN } from "../styles/uni-classes";
import { Data, Field, QueryType, InputField } from "../utils/request";
import { useDict } from "../utils/useDictHook";
import { useTipsCreator } from "../utils/help-utils";

export const RootTypesDesc = () => {
  const dict = useDict();
  const tipsCreator = useTipsCreator();
  const { fullSchema } = useContext(ServerContext);
  if (fullSchema) {
    const { queryType, mutationType, subscriptionType } = fullSchema;
    const rootTypes = [queryType, mutationType, subscriptionType]
      .filter((item) => !!item)
      .map((rootType) => {
        if (rootType) {
          return (
            <div
              className="flex flex-row gap-1 items-center"
              key={rootType.name}
            >
              <button
                className={TYPE_BTN}
                onClick={() => tipsCreator(rootType.name)}
              >
                {rootType.name}
              </button>
            </div>
          );
        }
        return null;
      });
    return (
      <div>
        <h2 className={H2}>{dict.rootTypes}</h2>
        {rootTypes}
        <AllTypesList types={fullSchema.types} />
      </div>
    );
  }
};

const AllTypesList = ({ types }: { types: QueryType[] }) => {
  const dict = useDict();
  const tipsCreator = useTipsCreator();
  const nonSystemTypes = types.filter((type) => !type.name.startsWith("_"));
  const typesList = nonSystemTypes.map((type) => {
    return (
      <div className="flex flex-row gap-1 items-center" key={type.name}>
        <button className={TYPE_BTN} onClick={() => tipsCreator(type.name)}>
          {type.name}
        </button>
      </div>
    );
  });
  return (
    <div>
      <h2 className={H2}>{dict.types}</h2>
      {typesList}
    </div>
  );
};

export const ObjectTooltip = ({ data }: { data: Data }) => {
  const dict = useDict();
  return (
    <div className="w-full h-full absolute bg-white">
      <h2 className={H2}>{data.__type.name}</h2>
      <p>
        {dict.kind}: ({data.__type.kind})
      </p>
      <p>
        {dict.description}: {data.__type.description || dict.notProvided}
      </p>
      {data.__type.fields && (
        <>
          <p className={H2}>{dict.fields}:</p>
          <FieldsParser fields={data.__type.fields} />
        </>
      )}
      {data.__type.inputFields && (
        <>
          <p className={H2}>{dict.fields}:</p>
          <InputFieldsParser fields={data.__type.inputFields} />
        </>
      )}
    </div>
  );
};

const FieldsParser = ({ fields }: { fields: Field[] }) => {
  return fields.map((field) => {
    return (
      <div className="flex flex-row gap-1 items-center" key={field.name}>
        <button className={TYPE_BTN}>{field.name}</button>
        {field.args.length > 0 && <ArgsParser field={field} />}
        <ReturnValueParser field={field} />
      </div>
    );
  });
};

const ReturnValueParser = ({ field }: { field: Field }) => {
  const tipsCreator = useTipsCreator();
  switch (field.type.ofType.kind) {
    case "SCALAR": {
      return (
        <>
          :
          <button
            className={TYPE_BTN}
            onClick={() => tipsCreator(field.type.ofType.name as string)}
          >
            {field.type.ofType.name}
          </button>
        </>
      );
    }
    case "LIST": {
      return (
        <>
          :
          <button
            className={TYPE_BTN}
            onClick={() => tipsCreator(field.type.ofType.ofType.ofType.name)}
          >
            {field.type.ofType.ofType.ofType.name}
          </button>
          {/* {field.type.kind === "NON_NULL" && <>!</>} */}
        </>
      );
    }
    default:
      return null;
  }
};

const InputFieldsParser = ({ fields }: { fields: InputField[] }) => {
  const tipsCreator = useTipsCreator();
  return fields.map((field) => {
    return (
      <div className="flex flex-row gap-1 items-center" key={field.name}>
        <button className={TYPE_BTN}>{field.name}</button>
        {field.type.name && (
          <>
            :
            <button
              className={TYPE_BTN}
              onClick={() => tipsCreator(field.type.name)}
            >
              {field.type.name}
            </button>
          </>
        )}
      </div>
    );
  });
};

const ArgsParser = ({ field }: { field: Field }) => {
  const tipsCreator = useTipsCreator();
  return field.args.map((arg) => {
    return (
      <span key={arg.name + field.name}>
        ({arg.name}:
        {arg.type.kind === "NON_NULL" && (
          <span>
            <button
              className={TYPE_BTN}
              onClick={() => tipsCreator(arg.type.ofType!.name)}
            >
              {arg.type.ofType!.name}
            </button>
            !
          </span>
        )}
        {arg.type.kind === "INPUT_OBJECT" && (
          <span>
            <button
              className={TYPE_BTN}
              onClick={() => tipsCreator(arg.type.name as string)}
            >
              {arg.type.name}
            </button>
            = &#123;&#125;
          </span>
        )}
        )
      </span>
    );
  });
};
