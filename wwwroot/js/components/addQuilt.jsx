import React from 'react';
import {connect} from 'react-redux';

import {addQuilt} from 'js/actionCreators/actionCreators';

let AddQuilt = ({dispatch}) => {
    let input;

    let onClick = () => {
        dispatch(addQuilt(input.value))
        input.value = '';
    };

    return (
        <div>
            <input type="text"
                   ref={node => {input = node;}}
            />
            <button onClick={onClick}>
                Add Quilt
            </button>
        </div>
    );
};

export default connect()(AddQuilt);

