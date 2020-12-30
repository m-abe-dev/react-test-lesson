import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
// ユーザーがinputした挙動をテストする
import userEvent from "@testing-library/user-event";
import RenderInput from "./RenderInput";

// afterEachはitのケース毎に指定することができる
afterEach(() => cleanup());

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<RenderInput />);
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
  });
});

describe("Input form onChange event", () => {
  it("Should update input value correctly", () => {
    render(<RenderInput />);
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test");
    expect(inputValue.value).toBe("test");
  });
});

// jest.fnはjestにあるモック関数

describe("Console button conditionally triggered", () => {
  it("Should not trigger output function", () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    //　userEvent.typeでは無いので何も入力値がない状態でボタンを押している
    userEvent.click(screen.getByRole("button"));
    expect(outputConsole).not.toHaveBeenCalled();
  });
  it("Should trigger output function", () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test");
    userEvent.click(screen.getByRole("button"));
    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});
