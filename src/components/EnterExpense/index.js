import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native-web';
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
	addExpense: {
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
			submittedExpenses: [{name: '1'}],
			count: 0
		}

		this.handleChange = this.handleChange.bind(this);
		this.addExpense = this.addExpense.bind(this);
	}

	componentWillMount() {
		fetch('http://localhost:9000/expenses').then((res) => {
      res.json().then((json) => {
        var newExpenseList = json;
        this.setState({expenseList: newExpenseList});
      });
    });
	}

	addExpense = () => {
		var newExpenses = this.state.submittedExpenses || [];
		console.log(newExpenses);
		var newExpense = {
			description: this.state.description,
			cost: this.state.cost
		};

		newExpenses.push(newExpense);

		console.log('POST new expense');
		fetch('http://localhost:9000/expenses', {  
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(newExpense)
		}, (res) => {
			console.log(res);
		});

		this.setState({
			description: '',
			cost: '',
			submittedExpenses: newExpenses
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
					<CustomButton disabled={this.state.description === '' || this.state.cost <= 0} onPress={this.addExpense} title='Add Expense' />
				</View>
			</Image>
		);
	}
}

module.exports = EnterExpense;

// 