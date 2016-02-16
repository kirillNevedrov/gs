import React from 'react';
import {connect} from 'react-redux';

let QuiltList = ({quilts, children}) => {

    var quilts = quilts.map(
        quilt =>
        <li key={quilt.id}>
            {quilt.text}
        </li>
    );

    return (
        <ul>{quilts}</ul>
    );
};

const mapStateToQuiltListProps = (state) => {
    return {
        quilts: state.quilts
    };
};

export default connect(
    mapStateToQuiltListProps
)(QuiltList);