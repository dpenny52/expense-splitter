import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native-web';
import CustomButton from '../CustomButton';
import SuperTextInput from '../SuperTextInput';
import Dropdown from 'react-dropdown';
import FacebookLogin from 'react-facebook-login';
import './style.css';

const options = ['Doug', 'Linette'];

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
		backgroundColor: 'rgba(180, 180, 180, 0.4)',
	  transitionDuration: '200ms',
	  transitionProperty: 'all',
	  transitionTimingFunction: 'ease',
	  shadowOpacity: 0.5,
	  shadowColor: '#555555',
	  shadowOffset: {width: '3px', height: '5px'},
	  shadowRadius: '10px',
	  shadowSpread: '5px'
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
		var newExpense = {
			description: this.state.description,
			cost: this.state.cost,
			person: this.state.person
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
			person: '',
			submittedExpenses: newExpenses
		});
	};

	handleChange = (event) => {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	};

	handleDropdownChange = (event) => {
		this.setState({person: event.value});
	};

	responseFacebook = (response) => {
    console.log(response);
  };

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
		      <FacebookLogin
			    appId="394523654233558"
			    autoLoad={true}
			    fields="name,email"
			    callback={this.responseFacebook} />
		      <Dropdown options={options} onChange={this.handleDropdownChange} value={this.state.person} placeholder="Who are you?" />
					<CustomButton disabled={this.state.description === '' || this.state.cost <= 0} onPress={this.addExpense} title='Add Expense' />
				</View>
			</Image>
		);
	}
}

module.exports = EnterExpense;

// 