import React, {Component} from 'react';
import './Pin.css';

class Pin extends Component {
	onCloseClick = (evt) => {
		if (this.props.onClick) {
			this.props.onClick(this.props.idx);
		}
	};
	render() {
		return (
			<div className="pin-container">
				<span className="pin-label">{this.props.value}</span>
				<button className="closeIcon" onClick={this.onCloseClick}>
					<svg className="icon" focusable="false">
						<path d="M7.317 6.433L4.884 4l2.433-2.433a.625.625 0 0 0-.884-.884L4 3.116 1.567.683a.625.625 0 0 0-.884.884L3.116 4 .683 6.433a.625.625 0 0 0 .884.884L4 4.884l2.433 2.433a.625.625 0 0 0 .884-.884z"></path>
					</svg>
				</button>
			</div>
		);
	}
}

export default Pin;
