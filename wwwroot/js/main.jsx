import styles from 'css/main.scss';

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
import Quilts from './components/quilts';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/(ru)(en)" component={App}>
                <IndexRoute component={Main}/>
                <Route path="quilts" component={Quilts}/>
                <Route path="blog" component={Blog}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);