import React, {Component} from 'react';
import Pin from '../Pin/Pin';
import DropDown from '../DropDown/DropDown';
import axios from 'axios';
import './AutoComplete.css';

class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: '',
			submittedList: ['hello', 'yes', 'no'],
			suggestedList: []
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
				userInput: '',
				suggestedList: []
			});
		}
	};

	componentDidMount() {
		this.inputRef.focus();
	}

	async fetchSuggstedListed(searchTerm) {
		const data = await axios.get(
			`http://www.omdbapi.com/?apikey=61f33958&s=${searchTerm}`
		);

		return data.data;
	}

	onSelect = (val) => {
		this.setState({
			submittedList: [...this.state.submittedList, val],
			userInput: '',
			suggestedList: []
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.userInput !== prevState.userInput &&
			this.state.userInput !== ''
		) {
			this.fetchSuggstedListed(this.state.userInput)
				.then((data) => {
					console.log(data);
					if (
						data &&
						data.Response &&
						data.Search &&
						data.Search.length
					) {
						const suggestedList = data.Search.map(
							(suggestion) => suggestion.Title
						);
						console.log(suggestedList);
						this.setState({suggestedList: suggestedList});
					} else {
						this.setState({suggestedList: []});
					}
				})
				.catch((error) => {
					this.setState({suggestedList: []});
					console.log(error);
				});
		}
	}

	onCloseClick = (idx) => {
		const newSubmittedList = this.state.submittedList.filter(
			(val, index) => idx !== index
		);

		console.log(newSubmittedList);
		this.setState({submittedList: newSubmittedList});
	};

	render() {
		return (
			<div className="autoCompleteContainer">
				{this.state.submittedList.map((value, idx) => (
					<Pin
						value={value}
						idx={idx}
						key={idx}
						onClick={this.onCloseClick}></Pin>
				))}
				<div className="inputAndDropDown">
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
					<DropDown
						dataList={this.state.suggestedList}
						onClick={this.onSelect}
					/>
				</div>
			</div>
		);
	}
}

export default Autocomplete;
