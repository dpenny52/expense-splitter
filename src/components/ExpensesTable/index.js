import React, { PropTypes } from 'react';
import { View } from 'react-native-web';
import numeral from 'numeral';

const getFormattedExpenses = (expenseList) => {
  var count = -1;
  return expenseList ? expenseList.map((expense) => {
    count++;
    var dateFormat = new Date(expense.date);
    dateFormat = dateFormat.toLocaleDateString("en-US");
    var costFormat = '$' + numeral(expense.cost).format('0.00');
    return( <div key={count} style={{display: 'table-row'}}>
              <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{dateFormat}</div>
              <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{expense.description}</div>
              <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>{costFormat}</div>
            </div> 
          );
  }) : '';
}

const ExpensesTable = ({expenseList}) => {

  return (
    <View style={{width: '50%'}}>
      <div style={{width: '100%', display: 'table', tableLayout: 'fixed', color: 'black', borderWidth: '1px', borderStyle: 'solid'}}>
        <h3 style={{display: 'table-row'}}>
          <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>Date</div>
          <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>Description</div>
          <div style={{textAlign: 'center', display: 'table-cell', borderWidth: '1px', borderStyle: 'solid'}}>Cost</div>
        </h3>
        {getFormattedExpenses(expenseList)}
      </div>
    </View>
  )
}

ExpensesTable.propTypes = {
  expenseList: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    cost: PropTypes.string,
    date: PropTypes.date,
    email: PropTypes.string
  })),
}

export default ExpensesTable;