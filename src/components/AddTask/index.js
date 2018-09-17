import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import './style.css'
import { add } from '../../actions/todo';

class AddTask extends Component {
	constructor(props) {
		super(props);

		this.state = {
			finish_date: new Date(),
			text: ''
		};
	}

	handleTextChange = e => {
		this.setState({ text: e.target.value });
	};

	handleDateChange = date => {
		this.setState({ finish_date: date });
	};

	handleSubmit = () => {
		this.props.add({ values: { ...this.state } });
	};

	render() {
		const { handleDateChange, handleTextChange, handleSubmit } = this;
		const { text, finish_date } = this.state;

		return (
			<Paper className="add_task">
				<TextField onChange={handleTextChange} value={text} label="Text of task" />
				<DatePicker onChange={handleDateChange} value={finish_date} label="Pick date" showTodayButton />
				<Button onClick={handleSubmit} color="primary">
					Add
				</Button>
			</Paper>
		);
	}
}

const mapDispatchToProps = {
	add
};

export default connect(null, mapDispatchToProps)(AddTask);
