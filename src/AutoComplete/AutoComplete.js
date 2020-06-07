import React, {Component} from 'react';
import PinList from '../PinList/PinList';
import DropDown from '../DropDown/DropDown';
import InputField from '../InputField/InputField';
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

	onChange = (val) => {
		this.setState({userInput: val});
	};

	onEnterPress = (val) => {
		this.setState({
			submittedList: [...this.state.submittedList, val],
			userInput: '',
			suggestedList: []
		});
	};

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

	onCloseClick = (newSubmittedList) => {
		this.setState({submittedList: newSubmittedList});
	};

	render() {
		return (
			<div className="autoCompleteContainer">
				<PinList
					submittedList={this.state.submittedList}
					onCloseClick={this.onCloseClick}
				/>
				<div className="inputAndDropDown">
					<InputField
						onChange={this.onChange}
						onEnterPress={this.onEnterPress}
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
