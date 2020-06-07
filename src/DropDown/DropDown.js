import React, {Component} from 'react';
import DropDownItem from './DropDownItem';
import './DropDown.css';

class DropDown extends Component {
	render() {
		const {dataList} = this.props,
			shouldDisplay = dataList && dataList.length ? true : false;

		return (
			<div>
				{shouldDisplay && (
					<div className="dropDown">
						{dataList.map((val) => (
							<DropDownItem
								value={val}
								onClick={this.props.onClick}
							/>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default DropDown;
