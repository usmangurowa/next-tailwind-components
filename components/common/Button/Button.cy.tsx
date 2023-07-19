/// <reference types="cypress"/>

import Button from "./Button";
import "../../../styles/globals.css";

describe("<Button />", () => {
  it("should render and display expected content", () => {
    // Mount the Button component
    cy.mount(
      <Button
        onClick={() => alert("Clicked")}
        mode="contained"
        variant="secondary"
      >
        Hello World
      </Button>
    );
    // button should contain Hello World
    cy.get("button").contains("Hello World");
    cy.get("button").trigger("click");
  });
});

export {};
