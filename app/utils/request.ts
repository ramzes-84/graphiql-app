export interface IResponse {
  [key: string]: string | IResponse[] | IResponse;
}

export interface ObjectDescResponse {
  data: Data;
}

export interface Data {
  __type: QueryType;
}

export interface QueryType {
  name: string;
  kind: "OBJECT" | "SCALAR" | "ENUM" | "INPUT_OBJECT" | "NON_NULL" | "LIST";
  description: string;
  fields: Field[] | null;
  enumValues: EnumValue[] | null;
  inputFields: InputField[];
}

export interface InputField {
  name: string;
  type: InputFieldType;
  description: string;
  defaultValue: string;
}

export interface InputFieldType {
  name: string;
  description: string;
}

export interface Field {
  name: string;
  description: string | null;
  args: Arg[];
  type: FieldType;
}

export interface EnumValue {
  name: string;
}

export interface Arg {
  name: string;
  description: string | null;
  type: ArgType;
}

export interface ArgType {
  name: string | null;
  kind: string | "NON_NULL";
  ofType: OfType | null;
}

export interface OfType {
  name: string;
  kind: "OBJECT" | "SCALAR" | "ENUM" | "INPUT_OBJECT" | "NON_NULL" | "LIST";
  ofType: OfType;
}

export interface FieldType {
  name: string | null;
  kind: "OBJECT" | "SCALAR" | "ENUM" | "INPUT_OBJECT" | "NON_NULL" | "LIST";
  ofType: OfType;
}

export type FullSchema = {
  queryType: QueryType | null;
  mutationType: QueryType | null;
  subscriptionType: QueryType | null;
  types: QueryType[];
};

export const sendRequest = async (
  query: string,
  url: string
): Promise<IResponse> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  return res.json().then(({ data }) => data);
};

export async function getShortSchema(endpoint: string): Promise<FullSchema> {
  const query = `query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        name
      }
    }
  }`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const response = await res.json();
  return response.data.__schema;
}

export async function getGQLInfoByName(endpoint: string, query: string) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const response: ObjectDescResponse = await res.json();
  return response.data;
}

// export async function getInfoAboutType(endpoint: string, query: string) {
//   const res = await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   });
//   const response: ObjectDescResponse = await res.json();
//   return response.data;
// }
