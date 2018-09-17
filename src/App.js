import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetch } from './actions/todo';

import Layout from './components/Layout';
import Table from './components/Table';
import AddTask from './components/AddTask';
import GetStart from './components/GetStart';

class App extends Component {
	componentDidMount() {
		if (this.props.token) {
			this.props.fetch();
		}
	}

	render() {
		const { token } = this.props;
		console.log(' this.props: ',  this.props);

		return (
			<div>
				<Layout>
					{token ? (
						<Fragment>
							<AddTask />
							<Table />
						</Fragment>
					) : (
						<GetStart />
					)}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		token: state.todo.token
	};
};

const mapDispatchToProps = {
	fetch
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
