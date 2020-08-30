import express from 'express';
import bodyParser from 'body-parser';

import * as GroceryApi from './grocery';

const app = express();
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3001;

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to Grocery shop!');
});
app.post('/getGroceries',GroceryApi.getGroceries)