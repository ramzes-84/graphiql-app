import { sendRequest, IRequest } from "./request";

describe("sendRequest", () => {
  it("should send a request and return the response data", async () => {
    const query = "query";
    const url = "url";
    const mockData: IRequest = {
      countries: { country: [{ name: "Andorra" }] },
    };
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ data: mockData }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await sendRequest(query, url);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    expect(result).toEqual(mockData);
  });
});
