require('dotenv').config();
const express = require('express');
const cors = require('cors');

const AuthRoute = require('./routes/authRoute');
const MaterialRoute = require('./routes/materialRoute');
const ModelRoute = require('./routes/ModelRoute');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(AuthRoute);
app.use(MaterialRoute);
app.use(ModelRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
