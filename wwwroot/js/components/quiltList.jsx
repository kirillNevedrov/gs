import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

let QuiltList = ({quilts, children, intl: {formatMessage}}) => {
    let formattedMessage = formatMessage({id: 'description'});

    var quilts = quilts.map(
        quilt =>
            <li key={quilt.id}>
                {quilt.text}
            </li>
    );

    return (
        <div>
            <div>{formattedMessage}</div>
            <ul>{quilts}</ul>
        </div>
    );
};

const mapStateToQuiltListProps = (state) => {
    return {
        quilts: state.quilts
    };
};

export default injectIntl(connect(
    mapStateToQuiltListProps
)(QuiltList));