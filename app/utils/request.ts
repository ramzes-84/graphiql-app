export interface IRequest {
  [key: string]: string | IRequest[] | IRequest;
}

export const sendRequest = async (
  query: string,
  url: string
): Promise<IRequest> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  return res.json().then(({ data }) => data);
};
