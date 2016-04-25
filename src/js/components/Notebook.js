import React, {Component, PropTypes} from 'react';
import UUID from 'uuid-js';
import _ from 'lodash';

import Cell from './Cell';

import services, {
	startNewSession, 
	connectToSession, 
	listRunningSessions,
} from 'jupyter-js-services';


export default class Notebook extends Component {
	constructor(props){
		super(props)

		this.state = {
			options: props.options,
			session: null,
			cells: []
		}

		this.startSession()
	}

	startSession(){
		startNewSession(this.state.options).then(session => {

			this.setState({session: session});
			console.log(`Session started : ${session.id}`);

		}).catch(err => {
			console.log("Starting Error:", err);
		});
	}

	addCell(){
		var newUUID = UUID.create().hex
		this.setState({
			cells: [
				...this.state.cells, 
				{
					uuid: newUUID,
					cell: <Cell key={newUUID} uuid={newUUID} deleteMe={this.removeCell.bind(this)} session={this.state.session}/> 
				}
			]
		});
	}

	removeCell(uuid){
		this.setState({
			cells:  _.remove(this.state.cells, obj => obj.uuid !== uuid)
		})
	}

	restartKernel(){
		this.state.session.kernel.restart().then(() => {
			//do sth after kernel restart
		})
	}

	shutdownNotebook(){
		this.state.session.shutdown().then(() => {
			this.props.removeNotebook(this.props.uuid)
		});
	}

	render(){
		return (
			<div>
				<span>Notebook #{this.props.uuid} <button onClick={this.addCell.bind(this)}>Add New Cell</button></span>
				<div style={styles}>
					{this.state.cells.map( obj => obj.cell)}
				</div>
				
				<button onClick={this.restartKernel.bind(this)}>Restart Notebook kernel</button>
				<button onClick={this.shutdownNotebook.bind(this)}>Exit Notebook</button>
			</div>
		)
	}
}

// ------------------------------------> pozniej zrobic selecta dla wybranych jezykow (domyslnie jest python) oraz pobierac sciezke do notebooka

Notebook.defaultProps = {
	options: {
		baseUrl: 'http://localhost:8888',
		name: 'python',
		notebookPath:'./test.ipynb'
	}
}

Notebook.propTypes = {
	options: PropTypes.object.isRequired
};


//na szybko :P
let styles = {
	background: 'rgba(0,0,0,0.5)',
	width: 1200,
	height: 200,
	textAlign: 'center',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around'
}





