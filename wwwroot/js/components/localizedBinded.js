import React from 'react';
import {injectIntl} from 'react-intl';


export class Localized extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        const {formatMessage} = this.props.intl;
        let formattedMessage = formatMessage({id: 'description'});

        return (
            <div>{formattedMessage}</div>
        );
    }
}

export default injectIntl(Localized);