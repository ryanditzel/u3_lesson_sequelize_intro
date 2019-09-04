# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Create a feature branch
1. Clone

# Sequelize

Let's create a project and install the [Sequelize Client](https://github.com/sequelize/cli):

```sh
cd sequelize
npm init -y
npm install --save-dev sequelize-cli
```

Next we will initialize a Sequelize project:

```sh
npx sequelize-cli init
```

Let's configure our Sequelize project to work with Postgres:

sequelize/config/config.json
```js
"development": {
    "username": "<your_username>",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  }
```

Cool, now create the Postgres database:

```sh
npx sequelize-cli db:create
```

Next we will create a User model:

```sh
npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string
```

Below is the User model and an associated migration that will be created from the above command: 

sequelize/models/user.js

```js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
```

sequelize/migrations/20190904165246-User.js

```js
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
```

Now we need to execute our migration which will create the users table in our Postgres database along with columns:

```sh
npx sequelize-cli db:migrate
```

> If you made a mistake, you can always rollback: `npx sequelize-cli db:migrate:undo`

Now let's create a seed file:

```sh
npx sequelize-cli seed:generate --name demo-user
```

Let's edit the file sequelize/seeders/20190904165805-demo-user.js

```js
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
```

Execute the seed file:

```sh
npx sequelize-cli db:seed:all
```

> Made a mistake? You can always undo: `npx sequelize-cli db:seed:undo`

Drop into psql and query the database for the demo user:

```sh
psql database_development
SELECT * FROM users;
```

## Resources

- https://sequelize.org/master/manual/migrations.html
