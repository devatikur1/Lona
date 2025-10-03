import React from "react";
import { render } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders an SVG", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});

