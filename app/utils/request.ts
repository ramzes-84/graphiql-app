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
  kind: "OBJECT";
  description: string;
  fields: Field[] | null;
}

export interface Field {
  name: string;
  description: string;
  args: Arg[];
  type: FieldType;
}

export interface Arg {
  name: string;
}

export interface FieldType {
  name?: string;
}

export type FullSchema = {
  queryType: QueryType | null;
  mutationType: QueryType | null;
  subscriptionType: QueryType | null;
  types?: QueryType[];
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

// export async function getFullSchema(endpoint: string): Promise<FullSchema> {
//   return Promise.resolve(RESPONSE.data.__schema as unknown as FullSchema);

//   const query = `query IntrospectionQuery {
//     __schema {
//       queryType {
//         name
//         description
//         fields {
//           name
//           description
//         }
//       }
//       mutationType {
//         name
//         description
//         fields {
//           name
//           description
//         }
//       }
//       subscriptionType {
//         name
//         description
//         fields {
//           name
//           description
//         }
//       }
//       types {
//         ...FullType
//       }
//       directives {
//         name
//         description
//         locations
//         args {
//           ...InputValue
//         }
//       }
//     }
//   }

//   fragment FullType on __Type {
//     kind
//     name
//     description
//     fields(includeDeprecated: true) {
//       name
//       description
//       args {
//         ...InputValue
//       }
//       type {
//         ...TypeRef
//       }
//       isDeprecated
//       deprecationReason
//     }
//     inputFields {
//       ...InputValue
//     }
//     interfaces {
//       ...TypeRef
//     }
//     enumValues(includeDeprecated: true) {
//       name
//       description
//       isDeprecated
//       deprecationReason
//     }
//     possibleTypes {
//       ...TypeRef
//     }
//   }

//   fragment InputValue on __InputValue {
//     name
//     description
//     type {
//       ...TypeRef
//     }
//     defaultValue
//   }

//   fragment TypeRef on __Type {
//     kind
//     name
//     ofType {
//       kind
//       name
//       ofType {
//         kind
//         name
//         ofType {
//           kind
//           name
//           ofType {
//             kind
//             name
//             ofType {
//               kind
//               name
//               ofType {
//                 kind
//                 name
//                 ofType {
//                   kind
//                   name
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }`;
//   const res = await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   });
//   const response = await res.json();
//   return response.data.__schema;
// }

export async function getShortSchema(endpoint: string): Promise<FullSchema> {
  const query = `query IntrospectionQuery {
    __schema {
      queryType {
        name
        description
        kind
      }
      mutationType {
        name
        description
        kind
      }
      subscriptionType {
        name
        description
        kind
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

export async function getInfoAboutType(endpoint: string, query: string) {
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
