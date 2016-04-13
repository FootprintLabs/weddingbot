const WebFont = require('webfontloader'),
      dashboardPage = require('./pages/dashboard');

const pages = {
  'dashboard': () => dashboardPage()
};

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname,
        page = path.length === 1 ?
                  'index' :
                  path.replace(/^\/([^\/]*).*$/, '$1');

  if (pages[page]) {
    pages[page]();
  }
});

WebFont.load({
  google: {
    families: ['Dancing Script:n4,b7']
  }
});
