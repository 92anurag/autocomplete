import React, {PureComponent} from 'react';
import Pin from '../Pin/Pin';

class PinList extends PureComponent {
	onCloseClick = (idx) => {
		const newSubmittedList = this.props.submittedList.filter(
			(val, index) => idx !== index
		);

		if (this.props.onCloseClick) {
			this.props.onCloseClick(newSubmittedList);
		}
	};

	render() {
		return (
			<React.Fragment>
				{this.props.submittedList.map((value, idx) => (
					<Pin
						value={value}
						idx={idx}
						key={idx}
						onClick={this.onCloseClick}></Pin>
				))}
			</React.Fragment>
		);
	}
}

export default PinList;
