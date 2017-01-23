// server/index.js
'use strict';

const app = require('./app');
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 9000;

var db;

app.post('/expenses', (req, res) => {

    req.body['_id'] = getNextSequence("userid")
    db.collection('expense').save(req.body, (err, result) => {
      if(err) return console.log(err);

    });
    res.send({status: 'ok'});
  });

app.get('/expenses', (req, res) => {
  db.collection('expense').find().toArray(function(err, results) {
    res.send(results);
  }); 
});

app.get('/expenses/:expenseId', (req, res) => {

});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

MongoClient.connect('mongodb://mongouser:password@localhost:27017/expenseSplitter', (err, database) => {
  db = database
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});