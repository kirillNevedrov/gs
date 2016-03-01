import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import {addQuilt} from 'js/actionCreators/actionCreators';

let AddQuilt = ({dispatch}) => {
    let input;

    let onClick = () => {
        dispatch(addQuilt(input.getValue()))
    };

    return (
        <div>
            <TextField
                hintText="ToDo Task"
                ref={node => {input = node;}}
            /><br/>
            <RaisedButton label="Add Quilt" onClick={onClick} />
        </div>
    );
};

export default connect()(AddQuilt);

