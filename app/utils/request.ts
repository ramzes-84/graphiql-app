export interface IResponse {
  [key: string]: string | IResponse[] | IResponse;
}

export interface ObjectDescResponse {
  data: Data;
}

export interface Data {
  __type: QueryType;
}

enum Kinds {
  OBJECT = "OBJECT",
  SCALAR = "SCALAR",
  ENUM = "ENUM",
  INPUT_OBJECT = "INPUT_OBJECT",
  NON_NULL = "NON_NULL",
  LIST = "LIST",
}

export interface QueryType {
  name: string;
  kind: Kinds;
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
  kind: Kinds;
  ofType: OfType;
}

export interface FieldType {
  name: string | null;
  kind: Kinds;
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

export async function getSchema(endpoint: string): Promise<FullSchema> {
  const query = `query IntrospectionQuery {
    __schema {
      queryType { name description kind}
      mutationType { name description kind }
      subscriptionType { name description kind }
      types {
        name
        kind
        description
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }

  fragment FullType on __Type {
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    description
    ofType {
      kind
      name
      description
      ofType {
        kind
        name
        description
        ofType {
          kind
          name
          description
          ofType {
            kind
            name
            description
            ofType {
              kind
              name
              description
              ofType {
                kind
                name
                description
                ofType {
                  kind
                  name
                  description
                }
              }
            }
          }
        }
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
