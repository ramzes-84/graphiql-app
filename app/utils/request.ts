"use server";

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
