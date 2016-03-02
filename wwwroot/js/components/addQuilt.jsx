import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import {addQuilt} from 'js/actionCreators/actionCreators';

class AddQuilt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {textFieldValue: ''};
    }

    _handleClick() {
        this.props.dispatch(addQuilt(this.state.textFieldValue))
        this.setState({
            textFieldValue: ''
        });
    }

    _handleTextFieldChange(e) {
        this.setState({
            textFieldValue: e.target.value
        });
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="ToDo Task"
                    value={this.state.textFieldValue}
                    onChange={e => this._handleTextFieldChange(e)}
                /><br/>
                <RaisedButton
                    label="Add Quilt"
                    onClick={e => this._handleClick(e)}/>
            </div>
        );
    }
}

export default connect()(AddQuilt);
