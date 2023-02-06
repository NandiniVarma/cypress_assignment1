const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1200,
  viewportHeight: 800,
  e2e: {
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
