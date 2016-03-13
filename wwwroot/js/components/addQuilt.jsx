import React from 'react';
import {connect} from 'react-redux';
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
                <input
                    type="text"
                    value={this.state.textFieldValue}
                    onChange={e => this._handleTextFieldChange(e)}
                    placeholder="ToDo Task"
                />
                <br/>
                <button
                    onClick={e => this._handleClick(e)}
                >Add Quilt</button>
            </div>
        );
    }
}

export default connect()(AddQuilt);
