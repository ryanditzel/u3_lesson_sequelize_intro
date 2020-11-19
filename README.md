# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Clone

# Sequelize

"[Sequelize](http://sequelizejs.com) is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more." - sequelize.org

Sequelize is a JavaScript Object Relational Mapping tool! Its an abstraction layer for raw SQL. Instead of raw SQL we can use JavaScript to interact with our database.

##

> Let's take five minutes and read what an ORM is:
>
> - [What is an ORM and why you should use it](https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a)

##

Great, but how do we use Sequelize? Let's start by installing the [Sequelize Client](https://github.com/sequelize/cli):

```sh
cd Intro-To-Sequelize
npm init -y
npm install sequelize pg
```

Next we will initialize a Sequelize project then open it in VS Code:

```sh
npx sequelize-cli init
code .
```

> Let's get familiar with all the commands available to us: `npx sequelize-cli --help`

Let's configure our Sequelize project to work with Postgres, replace your `config.json` with the following:

```json
{
  "development": {
    "database": "sequelize_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "sequelize_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "sequelize_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

Cool, now create the Postgres database:

```sh
npx sequelize-cli db:create
```

Next we will create a User model:

```sh
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
```

Below is the User model and an associated migration that will be created from the above command:

`sequelize/models/user.js`:

```js
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
```

`sequelize/migrations/20190914184520-create-user.js`:

```js
'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
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
      password: {
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
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
}
```

Now we need to execute our migration which will create the users table in our Postgres database along with columns:

```sh
npx sequelize-cli db:migrate
```

> If you made a mistake, you can always rollback: `npx sequelize-cli db:migrate:undo`

Now let's create a seed file:

```sh
npx sequelize-cli seed:generate --name user
```

Let's edit the file `sequelize/seeders/<some timestamp>-user.js`:

```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'demo@demo.com',
          password: '$321!pass!123$',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
```

Execute the seed file:

```sh
npx sequelize-cli db:seed:all
```

> Made a mistake? You can always undo: `npx sequelize-cli db:seed:undo`

Drop into psql and query the database for the demo user:

```sh
psql sequelize_development
SELECT * FROM "Users";
```

You should see a table with the seeded user. To exit the table press `q` and to exit `psql` type `\q`.

Done!

## Resources

- https://sequelize.org/master/manual/migrations.html

## Feedback

> [Take a minute to give us feedback on this lesson so we can improve it!](https://forms.gle/vgUoXbzxPWf4oPCX6)
