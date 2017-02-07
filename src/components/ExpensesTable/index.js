import React, { PropTypes } from 'react';
import { View } from 'react-native-web';
import numeral from 'numeral';

const cellStyle = {
  textAlign: 'center', 
  display: 'table-cell', 
  borderWidth: '1px', 
  borderStyle: 'solid'
};

const getFormattedExpenses = (expenseList) => {
  var count = -1;
  return expenseList ? expenseList.map((expense) => {
    count++;
    var dateFormat = new Date(expense.date);
    dateFormat = dateFormat.toLocaleDateString("en-US");
    var costFormat = '$' + numeral(expense.cost).format('0.00');
    return( <div key={count} style={{display: 'table-row'}}>
              <div style={cellStyle}>{dateFormat}</div>
              <div style={cellStyle}>{expense.description}</div>
              <div style={cellStyle}>{costFormat}</div>
            </div> 
          );
  }) : '';
}

const ExpensesTable = ({expenseList, email}) => {
  return (
    <View style={{width: '25%', padding: 10}}>
      {email}
      <div style={{width: '100%', display: 'table', tableLayout: 'fixed', color: 'black', borderWidth: '1px', borderStyle: 'solid'}}>
        <h3 style={{display: 'table-row'}}>
          <div style={cellStyle}>Date</div>
          <div style={cellStyle}>Description</div>
          <div style={cellStyle}>Cost</div>
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
  email: PropTypes.string
}

export default ExpensesTable;