import React from 'react';
import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';

import LangLink from './langLink'
import Languages from './languages';
import Localized from './localized';
import {getLocale} from 'js/utils/utils';

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
        var {locale, params} = this.props;

        return (
            <IntlProvider key={locale} locale={locale} messages={getMessages(locale)}>
                <div>
                    <header>Good Stories</header>
                    <nav>
                        <ul>
                            <li><LangLink to="/">Главная</LangLink></li>
                            <li><LangLink to="/quilts">Одеяла</LangLink></li>
                            <li><LangLink to="/blog">Блог</LangLink></li>
                        </ul>
                    </nav>
                    <main>
                        {this.props.children}
                    </main>
                    <footer>
                        <Localized />
                        <Languages loc={locale}/>
                    </footer>
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToAppProps = (state) => {
    return {
        locale: getLocale(state.routing.location)
    };
};

export default connect(
    mapStateToAppProps
)(App);

//use classnames package
//use bem for styling