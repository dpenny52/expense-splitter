import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native-web';
import CustomButton from '../CustomButton';
import SuperTextInput from '../SuperTextInput';
import ExpensesTable from '../ExpensesTable';
import FacebookLogin from 'react-facebook-login';
import 'whatwg-fetch';

const styles = StyleSheet.create({
	background: {
		width: null,
		backgroundColor: '#5C6C67',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
		flexDirection: 'row'
	},
	addExpense: {
		flex: 1,
		padding: '10px',
		margin: '10px',
		borderRadius: '4px',
		color: 'green'
	},
	formBackground: {
		backgroundColor: 'rgba(208, 199, 186, 0.6)',
	  transitionDuration: '200ms',
	  transitionProperty: 'all',
	  transitionTimingFunction: 'ease',
	  shadowOpacity: 0.5,
	  shadowColor: '#555555',
	  shadowOffset: {width: '3px', height: '5px'},
	  shadowRadius: '10px',
	  shadowSpread: '5px',
	  borderRadius: '5px',
	  margin: '20px'
	},
	tableCell: {
		textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'
	}
});

class EnterExpense extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			cost: '',
			expenseList: [{name: '1'}],
			count: 0,
			loggedIn: false,
			email: ''
		}

	}

	componentWillMount() {
    this.refreshExpenseList();
  }

  refreshExpenseList = () => {
  	this.getExpenseList().then((list) => {
      this.setState({expenseList: list});
    });
  }

  getExpenseList = () => {
    var res = fetch('http://localhost:9000/expenses');
    return res.then((res) => {return res.json()});
  };

	addExpense = () => {
		var newExpenses = this.state.expenseList || [];
		var newExpense = {
			description: this.state.description,
			cost: this.state.cost,
			email: this.state.email
		};

		fetch('http://localhost:9000/expenses', {  
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(newExpense)
		}).then((res) => {
			return res.json();
		}).then((data) => {
			newExpenses.push(data);
			this.setState({
				description: '',
				cost: '',
				expenseList: newExpenses
			});
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
		this.setState({
			loggedIn: true,
			email: response.email
		});
  };

  logout = () => {
  	this.setState({
  		loggedIn: false,
  		email: ''
  	});
  }

  getFacebookLogin = () => {
  	return this.state.loggedIn ? (
  		<CustomButton 
  			onPress={this.logout} 
  			title='Log Out'
  		/>
  	) : (
  		<FacebookLogin
				containerStyle={{
					display: 'flex'
				}}
	      buttonStyle={{
					padding: '13px',
					marginLeft: '20px',
					marginRight: '20px',
					marginBottom: '20px',
					borderRadius: '4px',
					fontSize: 14,
					flex: 1,
					alignItems: 'center'
				}}
		    appId="394523654233558"
		    autoLoad={true}
		    fields="name,email"
		    callback={this.responseFacebook} 
		  />
		)
  };

  getOwnExpenses = () => {
  	return this.state.expenseList.filter((expense) => {
  		return expense.email === this.state.email;
  	});
  }

	render() {
		return (
			<View style={styles.background}>
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
					<CustomButton disabled={this.state.description === '' || this.state.cost <= 0 || this.state.email === ''} onPress={this.addExpense} title='Add Expense' />
					{this.getFacebookLogin()}
				</View>
				<ExpensesTable bgStyle={styles.formBackground} expenseList={this.getOwnExpenses()}/>
			</View>
		);
	}
}

module.exports = EnterExpense;

// 