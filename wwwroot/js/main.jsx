import styles from '../scss/main.scss';

import { createStore, applyMiddleware } from 'redux'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'

import reducers from './reducers/reducers';
import App from './components/app';
import Main from './components/main';
import Blog from './components/blog';
import IntlProvider from './components/intlProvider';
import {RenderingManager} from './renderingManager';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

const store = createStoreWithMiddleware(reducers)

const render = (locale) => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(
        <Provider store={store}>
            <IntlProvider locale={locale}>
                <Router history={browserHistory}>
                    <Route path="/(ru)(en)" component={App}>
                        <IndexRoute component={Main}/>
                        <Route path="blog" component={Blog}/>
                    </Route>
                </Router>
            </IntlProvider>
        </Provider>,
        document.getElementById('root')
    );
};

const renderingManager = new RenderingManager({
    render,
    store
});

renderingManager.render();

