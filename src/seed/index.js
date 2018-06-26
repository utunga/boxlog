module.exports = {
  delete: true,
  disabled: false,
  services: [
    {
      path: 'box',
      template: {
        name: "The only box (for now)"
      }
    },
    {
      path: 'contract-type',
      template: {
        name: "Toggler"
      }
    },
    {
      path: 'contract',
      template: {
        name: "The Active Contract"
      }
    }
  ]
}

  // app.configure(boxStatus);
  // app.configure(contract);
  // app.configure(box);
  // app.configure(contractStatus);