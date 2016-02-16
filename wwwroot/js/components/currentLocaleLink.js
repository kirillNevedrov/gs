import React from 'react';
import { Link } from 'react-router'
import {injectIntl} from 'react-intl';

class CurrentLocaleLink extends React.Component {
    render() {
        const {to, children, intl: {locale}} = this.props;

        return (
            <Link to={locale ? `/${locale}${to}` : to}>{children}</Link>
        );
    }
}

export default injectIntl(CurrentLocaleLink);
