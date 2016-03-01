import React from 'react';
import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import CurrentLocaleLink from './currentLocaleLink'
import Languages from './languages';
import Localized from './localized';
import LocalizedBinded from './localizedBinded';
import {getLocale, getLocaleOrDefault} from 'js/utils/utils';

const ruStrings = {
    'description': 'Гуд сториес это огонь!'
};
const enStrings = {
    'description': 'Good stories are awesome!'
};

const getMessages = (locale) => {
    switch (locale) {
        case 'ru':
            return ruStrings;
        case 'en':
            return enStrings;
        default:
            return ruStrings;
    }
};

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            test: '123'
        };
    }

    //shouldComponentUpdate(nextProps, nextState) {
    //    return false;
    //}
    render() {
        let {location} = this.props;
        let locale = getLocale(location);
        let localeOrDefault = getLocaleOrDefault(locale);

        return (
            <IntlProvider key={localeOrDefault} locale={locale} messages={getMessages(localeOrDefault)}>
                <div>
                    {location.pathname}
                    <header>Good Stories</header>
                    <nav>
                        <ul>
                            <li><CurrentLocaleLink to="/">Главная</CurrentLocaleLink></li>
                            <li><CurrentLocaleLink to="/quilts">Одеяла</CurrentLocaleLink></li>
                            <li><CurrentLocaleLink to="/blog">Блог</CurrentLocaleLink></li>
                        </ul>
                    </nav>
                    <main>
                        <ReactCSSTransitionGroup
                            component="div"
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            {React.cloneElement(this.props.children, {
                                key: this.props.location.pathname
                                })}
                        </ReactCSSTransitionGroup>
                    </main>
                    <footer>
                        <div className="column">
                            <Localized />
                            <LocalizedBinded />
                        </div>
                        <div className="column">
                            <Languages />
                        </div>
                    </footer>
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToAppProps = (state) => {
    return {
        location: state.routing.location
    };
};

export default connect(
    mapStateToAppProps
)(App);

//use classnames package
//use bem for styling