import React from 'react';
import { Link } from 'react-router'
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';

class CurrentLocaleLink extends React.Component {
    render() {
        const {to, children, intl: {locale}, isTransitionActive} = this.props;

        return (
            //<Link
            //    to={locale ? `/${locale}${to}` : to}
            //    onClick={(e)=>{if(isTransitionActive){e.preventDefault();}}} >{children}</Link>
            <Link to={locale ? `/${locale}${to}` : to}>{children}</Link>
        );
    }
}

const mapStateToCurrentLocaleLinkProps = (state) => {
    return {
        isTransitionActive: state.isTransitionActive
    };
};

export default injectIntl(connect(
    mapStateToCurrentLocaleLinkProps
)(CurrentLocaleLink));
