import React, {Component, PropTypes} from 'react';

import services, {
	startNewKernel,
	connectToKernel, 
	listRunningKernels,
} from 'jupyter-js-services';

export default class Cell extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	handleEvent(e){
		if (e.key == 'Enter' && e.shiftKey) {
            e.preventDefault();
            this.kernelExecute(e.target.value);
        }
	}

	kernelExecute(code){
		let future = this.props.session.kernel.execute({code});

		future.onDone = (msg) => {
			//console.log('IKernelFuture done handler',msg);
			var timer = setTimeout(function(){ future.dispose(); clearTimeout(timer) }, 5000);
		}
		future.onIOPub = (msg) => {
			//console.log("IKernelFuture IOPub handler",msg);
			this.handleOutput(msg); 
		}
		future.onReply = (msg) => {
			//console.log("IKernelFuture reply handler",msg);
		}
		future.onStdin = (msg) => {
			//console.log("IKernelFuture stdin handler", msg);
		}
	}

	handleOutput(msg){
		if(services.isExecuteResultMessage(msg)){
			//console.log("execute_result", msg);
			this.setState({
                    output: msg.content.data["text/plain"],
                    number: msg.content.execution_count
                });
		}
		if(services.isClearOutputMessage(msg)){
			//console.log("clear_output", msg);
		}
		if(services.isDisplayDataMessage(msg)){
			//console.log("display_data", msg);
		}
		if(services.isErrorMessage(msg)){
			//console.log("error", msg);
			this.setState({
                    output: `${msg.content.ename}: ${msg.content.evalue}`,
                    number: null
                });
		}
		if(services.isExecuteInputMessage(msg)){
			//console.log("execute_input", msg);
		}
		if(services.isStatusMessage(msg)){
			//console.log("status", msg);
		}
		if(services.isStreamMessage(msg)){
			//console.log("stream", msg);
			this.setState({
                    output: msg.content.text.match(/[^\n]+(?:\r?\n|$)/g),
                    number: null
                });
		}
	}

	interrupt(){
		this.props.session.kernel.interrupt().then(() => {
			//do sth when is interrupted
		});
	}

	exitCell(){
		this.props.deleteMe(this.props.uuid)
	}

	render(){	
		return (
			<div style={styles}>
				<div>
					<span>Input: </span>
					<textarea onKeyPress={this.handleEvent.bind(this)}></textarea>
					<span>Output: </span>
					<p>{this.state.output}</p>
				</div>
				<button onClick={this.interrupt.bind(this)}>Przerwij wykonywanie</button>
				<button onClick={this.exitCell.bind(this)}>Exit Cell</button>
			</div>
		)
	}
}

Cell.propTypes = {
	deleteMe: PropTypes.func.isRequired,
	session: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired
};

let styles = {
	background: 'rgba(0,0,0,0.3)',
	width: '200px',
	height: '200px',
	textAlign: 'center'
}