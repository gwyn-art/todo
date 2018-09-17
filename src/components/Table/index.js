import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

import Task from './Task';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	table: {
		minWidth: 700
	}
});

function TasksTable(props) {
	const { classes, tasks } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Task</TableCell>
            <TableCell>Finish at</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tasks.map((data, i) => {
						return (
							<Task key={data.key} id={i} {...data} />
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

const mapStateToProps = (state) => {
  return {
    tasks: state.todo.tasks
  }
}

export default connect(mapStateToProps)(withStyles(styles)(TasksTable));
