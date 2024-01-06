"use server";

import { FullSchema } from "../types";

export interface IResponse {
  [key: string]: string | IResponse[] | IResponse;
}

export const sendRequest = async (
  query: string,
  url: string,
  variables?: string,
  headers?: string
) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers
        ? JSON.parse(headers)
        : {
            "Content-type": "application/json",
          },
      body: JSON.stringify({
        query: query,
        variables: variables ? JSON.parse(variables) : {},
      }),
    });
    return { data: res.json(), status: res.status };
  } catch {
    throw new Error("Failed to fetch");
  }
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
