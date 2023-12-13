import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { GlobalProvider } from "./context-provider";
import Home from "../page";
import { Header } from "../components/header";

export class LocalStorageMock {
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  key(n: number) {
    return Object.keys(this.store)[n];
  }

  length: number = 0;
}

global.localStorage = new LocalStorageMock();
describe("Provide lang from local storage", () => {
  it("should render ru", () => {
    localStorage.setItem("language", "ru");
    render(
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    );

    const title = screen.getByText("Главная страница");

    expect(title).toBeInTheDocument();
  });
  it("should save lang to localstorage ", async () => {
    localStorage.setItem("language", "en");
    render(
      <GlobalProvider>
        <Header />
      </GlobalProvider>
    );

    const btn = screen.getByText("RU");
    fireEvent.click(btn);
    await waitFor(() => {
      expect(localStorage.getItem("language")).toBe("ru");
    });
  });
  it("should save lang to localstorage ", async () => {
    localStorage.setItem("language", "ru");
    render(
      <GlobalProvider>
        <Header />
      </GlobalProvider>
    );

    const btn = screen.getByText("АНГ");
    fireEvent.click(btn);
    await waitFor(() => {
      expect(localStorage.getItem("language")).toBe("en");
    });
  });
});