"use server";

import { FullSchema } from "../types";
import { query } from "./constants";

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

export async function getSchema(
  endpoint: string,
  headers?: string
): Promise<FullSchema> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: headers
        ? JSON.parse(headers)
        : {
            "Content-type": "application/json",
          },
      body: JSON.stringify({ query }),
    }).then((response) => {
      if (response.status === 401) throw new Error("Unauthorized");
      return response.json();
    });
    return res.data.__schema;
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}
