import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native-web';
import CustomButton from '../CustomButton';
import SuperTextInput from '../SuperTextInput';

const styles = StyleSheet.create({
	imageBackground: {
		width: null,
		// height: null,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		resizeMode: 'cover',
		minHeight: '100vh'
	},
	addItem: {
		flex: 1,
		padding: '10px',
		margin: '10px',
		borderRadius: '4px',
		color: 'green'
	},
	formBackground: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)'
	}
});

class EnterExpense extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			cost: '',
			submittedItems: [],
			count: 0
		}

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

	componentDidMount() {
		// document.body.style.display = 'flex';
		// document.body.style.flex = 1;
	}

	render() {
		return (
			<Image source={require('../../images/main-background.jpg')} style={styles.imageBackground}>
				<View style={styles.formBackground}>
					<SuperTextInput
						id='description'
						label='Description'
		        onChange={this.handleChange}
		        value={this.state.description} />
			    <SuperTextInput
			    	id='cost'
			    	label='Cost'
			    	keyboardType='numeric'
		        onChange={this.handleChange}
		        value={this.state.cost} />
					<CustomButton disabled={this.state.description === '' || this.state.cost <= 0} onPress={this.addItem} title='Add Item' />
				</View>
			</Image>
		);
	}
}

module.exports = EnterExpense;

// {this.state.submittedItems.map((item) => {
// 					return (<div style={{flex:1}} key={item.id}>{item.description} : {item.cost}<br/></div>);
// 				})}