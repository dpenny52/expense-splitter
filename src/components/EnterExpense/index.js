import React, { Component } from 'react';
import { Text, Button, TextInput } from 'react-native-web';

class EnterExpense extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			cost: '',
			submittedItems: [],
			count: 0
		}
		console.log(this.state);

		this.handleChange = this.handleChange.bind(this);
		this.addItem = this.addItem.bind(this);
	}

	addItem = () => {
		var newItems = this.state.submittedItems;

		newItems.push({
			id: this.state.count,
			description: this.state.description,
			cost: this.state.cost
		});

		this.setState({
			description: '',
			cost: '',
			submittedItems: newItems,
			count: this.state.count+1
		});
	};

	handleChange(event) {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	};

	render() {
		return (
			<div>
				<Text>Description </Text><br/>
				<TextInput
					id='description'
	        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
	        onChange={this.handleChange}
	        value={this.state.description} /><br/>
		    <Text>Cost </Text><br/>
		    <TextInput
		    	id='cost'
		    	keyboardType = 'numeric'
		    	style={{height: 40, borderColor: 'gray', borderWidth: 1}}
	        onChange={this.handleChange}
	        value={this.state.cost} /><br/>
				<Button onPress={this.addItem} title="Add Item" style={{color: 'blue'}} />
				{this.state.submittedItems.map((item) => {
					return (<div key={item.id}>{item.description} : {item.cost}<br/></div>);
				})}
			</div>
		);
	}
}

module.exports = EnterExpense;