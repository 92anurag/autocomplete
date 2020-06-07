import React, {PureComponent} from 'react';
import './InputField.css';

class InputField extends PureComponent {
	onChange = (evt) => {
		const val = evt.target.value;
		if (this.props.onChange) {
			this.props.onChange(val);
		}
	};

	onKeyDown = (evt) => {
		const keyCode = evt.keyCode,
			val = evt.target.value;

		if (keyCode === 13 && this.props.onEnterPress) {
			this.props.onEnterPress(val);
		}
	};

	componentDidMount() {
		this.inputRef.focus();
	}

	render() {
		return (
			<input
				ref={(ref) => {
					this.inputRef = ref;
				}}
				className="inputField"
				type="text"
				onChange={this.onChange}
				onKeyDown={this.onKeyDown}
				value={this.props.value}
			/>
		);
	}
}

export default InputField;
