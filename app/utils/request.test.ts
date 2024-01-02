import { sendRequest, IResponse } from "./request";

const mockData: IResponse = {
  countries: { country: [{ name: "Andorra" }] },
};
const mockResponse = {
  json: jest.fn().mockResolvedValue({ data: mockData }),
};
global.fetch = jest.fn().mockResolvedValue(mockResponse);

describe("sendRequest", () => {
  it("should send a request and return the response data", async () => {
    const query = "query";
    const url = "url";

    const result = await sendRequest(query, url);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });
    expect(result).toEqual(mockData);
  });
  it("should send a request with headers and variables", async () => {
    const query = "query";
    const url = "url";
    const headers = ' {"Authorization": "Bearer My_Token" }';
    const variables = '{"name": "Morty"}';

    await sendRequest(query, url, variables, headers);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer My_Token",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          name: "Morty",
        },
      }),
    });
  });
});
