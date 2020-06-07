import React, {Component} from 'react';
import './DropDown.css';

class DropDownItem extends Component {
	onClick = (evt) => {
		if (this.props.onClick) {
			this.props.onClick(this.props.value);
		}
	};

	render() {
		return (
			<div className="dropDownItem" onClick={this.onClick}>
				{this.props.value}
			</div>
		);
	}
}

export default DropDownItem;
