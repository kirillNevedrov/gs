import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';

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

export default ({locale, children}) => {
    return (
        <IntlProvider locale={locale} messages={getMessages(locale)}>
            {children}
        </IntlProvider>
    );
};

const mapStateToIntlProviderProps = (state) => {
    return {
        locale: state.locale,
        messages: getMessages(state.locale),
        //key: state.locale
    };
};
//
//export default connect(
//    mapStateToIntlProviderProps
//)(IntlProvider);

//https://github.com/yahoo/react-intl/issues/234