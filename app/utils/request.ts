export interface IResponse {
  [key: string]: string | IResponse[] | IResponse;
}

export const sendRequest = async (
  query: string,
  url: string,
  variables?: string
): Promise<IResponse> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables ? JSON.parse(variables) : {},
    }),
  });
  return res.json().then(({ data }) => data);
};
