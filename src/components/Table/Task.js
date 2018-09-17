import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import './style.css';

import { edit, finish, remove } from '../../actions/todo';

class Task extends PureComponent {
	constructor(props) {
		super(props);

		const { finish_date, text, finished } = this.props;
		this.state = {
			animation: 'appear',
			edit: false,
			finish_date,
			text,
			finished
		};
	}

	handleEdit = () => {
		this.setState({ animation: 'disappear' }, () =>
			setTimeout(() => this.setState({ animation: 'appear', edit: true }), 500)
		);
	};

	handleCancel = () => {
		const { finish_date, text, finished } = this.props;
		this.setState({ animation: 'disappear' }, () =>
			setTimeout(
				() =>
					this.setState({
						animation: 'appear',
						edit: false,
						finish_date,
						text,
						finished
					}),
				500
			)
		);
	};

	handleDateChange = date => {
		this.setState({ finish_date: date });
	};

	handleFinish = () => {
		this.setState({ finished: !this.state.finished }, () => this.props.finish(this.props.id));
	};

	handleChangeText = e => {
		this.setState({ text: e.target.value });
	};

	handleSave = () => {
		const { text, finish_date } = this.state;

		this.setState(
			{
				edit: false,
				animation: 'disappear'
			},
			() =>
				setTimeout(
					() =>
						this.props.edit({
							values: {
								text,
								finish_date
							},
							id: this.props.id
						}),
					500
				)
		);
	};

	handleDelete = () => {
		this.props.remove(this.props.id);
	};

	render() {
		const { animation, edit } = this.state;

		return (
			<TableRow
				className={`
          task_${animation}
        `}
				{...this.props}
			>
				{edit ? (
					<Edit
						onSave={this.handleSave}
						onChangeText={this.handleChangeText}
						onFinish={this.handleFinish}
						onCancel={this.handleCancel}
						onDateChange={this.handleDateChange}
						{...this.state}
					/>
				) : (
					<Default
						onDelete={this.handleDelete}
						onFinish={this.handleFinish}
						onEdit={this.handleEdit}
						{...this.state}
					/>
				)}
			</TableRow>
		);
	}
}

const Default = ({ finish_date, text, finished, onDelete, onEdit, onFinish }) => (
	<Fragment>
		<TableCell>{text}</TableCell>
		<TableCell>{finish_date.toLocaleDateString()}</TableCell>
		<TableCell>{finished ? 'Finished' : 'In progress'}</TableCell>
		<TableCell>
			{!finished && <Button onClick={onEdit}>Edit</Button>}
			<Button onClick={onFinish} color="primary">
				{finished ? 'Move to In progress' : 'Finish'}
			</Button>
			<Button color="secondary" onClick={onDelete}>
				Delete
			</Button>
		</TableCell>
	</Fragment>
);

const Edit = ({ finish_date, onChangeText, onSave, text, finished, onCancel, onFinish, onDateChange }) => (
	<Fragment>
		<TableCell>
			<TextField onChange={onChangeText} value={text} label="Text of task" />
		</TableCell>
		<TableCell>
			<DatePicker onChange={onDateChange} value={finish_date} label="Pick date" showTodayButton />
		</TableCell>
		<TableCell>
			<Button onClick={onFinish} color="primary">
				{finished ? 'Move to In progress' : 'Finish'}
			</Button>
		</TableCell>
		<TableCell>
			<Button onClick={onSave} color="primary">
				Save
			</Button>
			<Button onClick={onCancel} color="secondary">
				Cancel
			</Button>
		</TableCell>
	</Fragment>
);

const mapDispatchToProps = {
	finish,
	edit,
	remove
};

export default connect(null, mapDispatchToProps)(Task);
