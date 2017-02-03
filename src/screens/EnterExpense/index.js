import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native-web';
import CustomButton from '../../components/CustomButton';
import SuperTextInput from '../../components/SuperTextInput';
import ExpensesTable from '../../components/ExpensesTable';
import SplitSelector from '../../components/SplitSelector';
import FacebookLoginLogout from '../../components/FacebookLoginLogout';
import { addExpense, login, logout, descriptionChange, costChange } from '../../actions';
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

const getExpenseList = () => {
  var res = fetch('http://localhost:9000/expenses');
  return res.then((res) => {return res.json()});
};

const refreshExpenseList = (dispatch) => {
	getExpenseList().then((list) => {
		console.log(list);
    list.map((expense) => {
    	dispatch(addExpense(expense));
    })
  });
}

const addExpensePress = () => {
	// var newExpense = {
	// 	description: description,
	// 	cost: cost,
	// 	email: email
	// };
	// console.log('hi');
	// fetch('http://localhost:9000/expenses', {  
	//   method: 'POST',
	//   headers: {
	//     'Content-Type': 'application/json'
	//   },
	//   body: JSON.stringify(newExpense)
	// }).then((res) => {
	// 	return res.json();
	// }).then((data) => {
	// 	console.log(data);
	// 	dispatch(addExpense(data));
	// });
};

const handleChange = (event) => {
	// var newState = {};
	// newState[event.target.id] = event.target.value;
	// this.setState(newState);
};

// const handleDropdownChange = (event) => {
// 	this.setState({person: event.value});
// };

const getOwnExpenses = (user, expenseList) => {
	return expenseList.filter((expense) => {
		if(expense.email === undefined && user.email === '') return true;
		return expense.email === user.email;
	});
}

const EnterExpense = ({description, cost, expenseList, user, splitWith, splitPercent, dispatch})  => {
	if(expenseList.length === 0) {
		console.log("dispatching");
		refreshExpenseList(dispatch);
	}

	return (
		<View style={styles.background}>
			<View style={styles.formBackground}>
				<SuperTextInput
					id='description'
					label='Description'
	        onChange={(event) => { dispatch(descriptionChange(event.target.value)) }}
	        value={description} />
		    <SuperTextInput
		    	id='cost'
		    	label='Cost'
		    	keyboardType='numeric'
	        onChange={(event) => { dispatch(costChange(event.target.value)) }}
	        value={cost} />
				<CustomButton 
					disabled={description === '' || cost === '0' || user.email === ''} 
					onPress={addExpensePress} 
					title='Add Expense' 
				/>
				<FacebookLoginLogout 
					loggedIn={user.loggedIn} 
					onLogoutPress={() => { dispatch(logout()) }} 
					responseFacebook={(response) => { 
						dispatch(login({
							loggedIn: true,
							email: response.email || ''
						}))
					}} 
				/>
			</View>
			<ExpensesTable bgStyle={styles.formBackground} expenseList={getOwnExpenses(user, expenseList)}/>
			<SplitSelector 
				bgStyle={styles.formBackground} 
				handleDropdownChange={(event) => {}}
				handleChange={handleChange}
				splitWith={splitWith}
				splitPercent={splitPercent.toString()}
			/>
		</View>
	);
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		description: state.expenses.description || '',
		cost: state.expenses.cost || '0',
		expenseList: state.expenses.expenseList || [],
		user: state.user,
		splitWith: state.splitWitn || '',
		splitPercent: state.splitPercent || 50
	}
}

EnterExpense.propTypes = {
	description: PropTypes.string,
	cost: PropTypes.string,
	expenseList: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string,
		cost: PropTypes.string,
		date: PropTypes.date,
		email: PropTypes.string
	})),
	loggedIn: PropTypes.bool,
	email: PropTypes.string,
	splitWith: PropTypes.string,
  splitPercent: PropTypes.number
}

export default connect(mapStateToProps)(EnterExpense)