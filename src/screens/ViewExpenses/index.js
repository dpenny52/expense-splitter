import React, { Component } from 'react'
import { Text, View } from 'react-native-web';

// const styles = StyleSheet.create({});
class ViewExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseList: []
    }

  }

  componentWillMount() {
    this.getExpenseList().then((list) => {
      console.log(list);
      this.setState({expenseList: list});
    });
  }

  getExpenseList = () => {
    var res = fetch('http://localhost:9000/expenses');
    return res.then((res) => {return res.json()});
  };

  render() {
    return (
      <View>
        <Text>View Expenses</Text>
        {this.state.expenseList && this.state.expenseList.map((expense) => {
          return (<Text key={expense._id}>{expense.date} : {expense.person} : {expense.description} : {expense.cost}</Text>);
        })}
      </View>
    );
  }
}

module.exports = ViewExpenses;