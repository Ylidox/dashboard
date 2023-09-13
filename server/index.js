let express = require('express');
let app = express();

let {sequelize} = require('./db/sequelize');

let customerRouter = require('./routers/customerRouter');

const connection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
  }
}

connection();

const PORT = 3001;

app.use(express.json());
app.use('/customer', customerRouter);

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
