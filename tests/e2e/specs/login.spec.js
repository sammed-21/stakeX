describe("Test User Login", () => {
  it("Connects with Metamask", () => {
    cy.visit("http://localhost:3000");
    // find "Connect Wallet" button and click it
    cy.contains("Connect Wallet").click();
    // assuming there is only metamask popping up
    // always important to switch between metamask and cypress window
    cy.switchToMetamaskWindow();
    // connect to dapp
    cy.acceptMetamaskAccess().should("be.true");
    cy.confirmMetamaskSignatureRequest();
    // switch back to cypress window (your dApp)
    cy.switchToCypressWindow();
    // check UI change
    cy.contains("...").should("be.visible");
  });
});
