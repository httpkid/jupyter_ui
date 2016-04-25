//python -m notebook --NotebookApp.allow_origin="*"
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ListContainer from './containers/ListContainer';
import ProjectContainer from './containers/ProjectContainer';

class App extends Component {
	constructor(props){
		super(props)

		this.state = {
			test: 'Setting Environment'
		}
	}

	render(){
		return <ProjectContainer />
		//return <h2>{this.state.test}</h2>
	}
}

ReactDOM.render(<App/>, document.querySelector('#container'));