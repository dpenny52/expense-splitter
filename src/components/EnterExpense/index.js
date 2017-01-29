import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native-web';
import CustomButton from '../CustomButton';
import SuperTextInput from '../SuperTextInput';
import FacebookLogin from 'react-facebook-login';
import numeral from 'numeral';
import 'whatwg-fetch';

const styles = StyleSheet.create({
	imageBackground: {
		width: null,
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
	  shadowSpread: '5px',
	  borderRadius: '5px',
	  margin: '20px'
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

		console.log('POST new expense');
		fetch('http://localhost:9000/expenses', {  
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(newExpense)
		}).then((res) => {
			return res.json();
		}).then((data) => {
			console.log(data);
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

  getFacebookLogin = () => {
  	return this.state.loggedIn ? '' : (
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
			    callback={this.responseFacebook} />
		)
  };

  getOwnExpenses = () => {
  	return this.state.expenseList.filter((expense) => {
  		return expense.email === this.state.email;
  	}).map((expense) =>{
  		var dateFormat = new Date(expense.date);
  		dateFormat = dateFormat.toLocaleDateString("en-US");
  		var costFormat = '$' + numeral(expense.cost).format('0.00');
  		return ( 	<div key={expense._id} style={{width: '100%', display: 'table', tableLayout: 'fixed', color: 'black', borderWidth: '1px', borderStyle: 'solid'}}>
	  							<div style={{display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{dateFormat}</div>
	  							<div style={{display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{expense.description}</div>
	  							<div style={{display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{costFormat}</div>
								</div> );
  	});
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
					{this.getFacebookLogin()}
				</View>
				<View style={[styles.formBackground, {width: '50%', textAlign: 'center'}]}>
					{this.getOwnExpenses()}
				</View>
			</Image>
		);
	}
}

module.exports = EnterExpense;

// 