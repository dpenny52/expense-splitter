import React, { Component } from 'react'
import { Text, View } from 'react-native-web';

// const styles = StyleSheet.create({});
class ViewExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseList: []
    }

    this.getExpenseRows = this.getExpenseRows.bind(this);
  }

  componentWillMount() {
    fetch('http://localhost:9000/expenses').then((res) => {
      res.json().then((json) => {
        this.setState({expenseList: json});
      });
      
    });
  }

  getExpenseRows() {
    
  }

  render() {
    return (
      <View>
        <Text>View Expenses</Text>
        {this.state.expenseList.map((expense) => {
          return (<Text key={expense._id}>{expense.date} : {expense.person} : {expense.description} : {expense.cost}</Text>);
        })}
      </View>
    );
  }
}

module.exports = ViewExpenses;