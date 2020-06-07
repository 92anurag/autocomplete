import React, {Component, Fragment} from 'react';
import Pin from '../Pin/Pin';
import './AutoComplete.css';

class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: props.userInput ? '' : props.userInput,
			submittedList: ['hello', 'yes', 'no']
		};
	}

	onChange = (evt) => {
		const val = evt.target.value;
		this.setState({userInput: val});
	};

	onKeyDown = (evt) => {
		const keyCode = evt.keyCode,
			val = evt.target.value;

		if (keyCode === 13) {
			this.setState({
				submittedList: [...this.state.submittedList, val],
				userInput: ''
			});
		}
	};

	componentDidMount() {
		this.inputRef.focus();
	}

	render() {
		return (
			<div className="autoCompleteContainer">
				{this.state.submittedList.map((value, idx) => (
					<Pin value={value} key={idx}></Pin>
				))}
				<input
					ref={(ref) => {
						this.inputRef = ref;
					}}
					className="inputField"
					type="text"
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					value={this.state.userInput}
				/>
			</div>
		);
	}
}

export default Autocomplete;
