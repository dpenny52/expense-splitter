import React, { Component } from 'react';
import { View } from 'react-native-web';
import numeral from 'numeral';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgStyle: props.bgStyle,
      expenseList: props.expenseList
    }
  }

  getFormattedExpenses = () => {
    return this.state.expenseList ? this.state.expenseList.map((expense) => {
      var dateFormat = new Date(expense.date);
      dateFormat = dateFormat.toLocaleDateString("en-US");
      var costFormat = '$' + numeral(expense.cost).format('0.00');
      return( <div key={expense._id} style={{display: 'table-row'}}>
                <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{dateFormat}</div>
                <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{expense.description}</div>
                <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{costFormat}</div>
              </div> 
            );
    }) : '';
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bgStyle: nextProps.bgStyle || this.state.bgStyle,
      expenseList: nextProps.expenseList || this.state.expenseList 
    })
  }

  render() {
    return (
      <View style={[this.state.bgStyle, {width: '50%'}]}>
        <div style={{width: '100%', display: 'table', tableLayout: 'fixed', color: 'black', borderWidth: '1px', borderStyle: 'solid'}}>
          <h3 style={{display: 'table-row'}}>
            <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>Date</div>
            <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>Description</div>
            <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>Cost</div>
          </h3>
          {this.getFormattedExpenses()}
        </div>
      </View>
    )
  }
}

module.exports = ExpensesTable;