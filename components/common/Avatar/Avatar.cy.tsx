/// <reference types="cypress"/>

import Avatar from "./Avatar";

import "../../../styles/globals.css";

describe("<Avatar />", () => {
  it("should render and display expected content", () => {
    cy.mount(<Avatar fallback="UH" alt="avatar" />);
    cy.get("div.avatar-fallback").contains("UH");
  });
});

export {};
