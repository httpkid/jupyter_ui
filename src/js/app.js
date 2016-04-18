import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import listContainer from './containers/listContainer';
import projectContainer from './containers/projectContainer';

class App extends Component {
	constructor(props){
		super(props)

		this.state = {
			test: 'Setting Environment'
		}
	}

	render(){
		return <h2>{this.state.test}</h2>
	}
}

ReactDOM.render(<App/>, document.querySelector('#container'));