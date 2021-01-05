import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

// サーバーの開始と終了

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("Mocking API", () => {
  it("[Fetch success]Should display fetched data correctly and button disable", async () => {
    render(<MockServer />);
    // ユーザーの挙動
    userEvent.click(screen.getByRole("button")); 
    // Bred dummyがあるかどうか
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument();
    // buttonがdisabledであるかどうか あればpass
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });
  it("[Fetch failure]Should display error msg, no render heading and button abled", async () => {
    server.use(
      // statusを404のnot foundにする
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed !"
    );
    // h3が存在しないことを確認
    expect(screen.queryByRole("heading")).toBeNull();
    // buttonがdisabledではない
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});
