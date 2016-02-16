import React from 'react';
import {FormattedMessage} from 'react-intl';

export class Localized extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        return (
            <FormattedMessage id="description" />
        );
    }
}

export default Localized;