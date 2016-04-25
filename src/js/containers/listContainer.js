import React, {Component} from 'react';

export default class listContainer extends Component {
	constructor(props){
		super(props)

		this.state = {
			test: 'Setting Environment - Janek part'
		}
	}

	render(){
		return <h2>{this.state.test}</h2>
	}
}