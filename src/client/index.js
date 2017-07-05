import React from 'react';
import { AppContainer } from 'react-hot-loader';
import {render} from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Main from "./scenes/Main/Main";

// import routes from './routes.js';

const renderApp = () => {
  render(
    <AppContainer>
      <HashRouter>
        <Route path="/" component={Main} />
      </HashRouter>
    </AppContainer>,
    document.getElementById('app')
  )
};


renderApp();

// react HMR
if (module.hot) {
  module.hot.accept('./scenes/Main/Main.js', () => {
    const NextRootContainer = require('./scenes/Main/Main.js').default;
    renderApp(NextRootContainer);
  })
}
