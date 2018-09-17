import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import { createTodo } from '../../actions/todo';

const GetStart = ({ createTodo }) => (
	<Paper>
		<h1>Create your to do</h1>
		<Button onClick={createTodo} color="primary">
			Go
		</Button>
	</Paper>
);

const mapDispatchToProps = {
	createTodo
};

export default connect(null, mapDispatchToProps)(GetStart);
