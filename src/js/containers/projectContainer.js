import React, {Component, PropTypes} from 'react';
import UUID from 'uuid-js';
import _ from 'lodash';

import {connectToSession} from 'jupyter-js-services';

import Notebook from '../components/Notebook';

export default class ProjectContainer extends Component {
	constructor(props){
		super(props)

		this.state = {
			notebooks: [],
			connectId: ""
		}
	}

	runNewNotebook(){
		var newUUID = UUID.create().hex
		this.setState({
			notebooks: [
				...this.state.notebooks, 
				{
					uuid: newUUID,
					notebook: <Notebook key={newUUID} uuid={newUUID} removeNotebook={this.removeNotebook.bind(this)}/>
				}
				
			]
		})
	}

	removeNotebook(uuid){
		this.setState({
			notebooks: _.remove(this.state.notebooks, obj => obj.uuid !== uuid ) 
		})
	}

	connectToSession(){
		connectToSession(this.state.connectId, this.props.options).then((session) => {
			console.log(session.kernel.name);
		});
	}

	handleConnectInput(e){
		this.setState({connectId: e.target.value});
	}

	render(){
		return (
			<div>
				<nav>
					<button onClick={this.runNewNotebook.bind(this)}>New Python Notebook</button>
					<input
						type="text"
						onChange={this.handleConnectInput.bind(this)}
						/>
					<button onClick={this.connectToSession.bind(this)}>Connect to Session</button>
				</nav>
				<div>
					<header>
						<h1>IPython Notebooks</h1>
					</header>
					<main>
						{this.state.notebooks.map( obj => obj.notebook )}
					</main>
				</div>
			</div>
		)
	}
}

ProjectContainer.defaultProps = {
	options: {
		baseUrl: 'http://localhost:8888',
		notebookPath:'./test.ipynb'
	}
}

ProjectContainer.propTypes = {
	options: PropTypes.object.isRequired
};