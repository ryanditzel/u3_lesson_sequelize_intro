# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

# Sequelize

### Learning Objectives

 - Describe what an ORM is and why we would use one
 - Model a database using an ORM

### Prior to this Lesson
_Students should already be able to..._

- Create, read, update and delete from a database using SQL.
- Use SQL syntax to define datatypes, perform joins and filtering.

## Object Relational Mapping (ORM)

We will store our information in databases, and we've seen that we can query databases with SQL commands. But how can we access a database from within a JavaScript application?

An **Object Relational Mapping**, or **ORM**, bridges this gap for us. An ORM library like Sequelize offers an easy way to communicate with a database with familiar JavaScript syntax.

 [From the venerable wikipedia](https://en.wikipedia.org/wiki/Object-relational_mapping#Comparison_with_traditional_data_access_techniques)

> Compared to traditional techniques of exchange between an object-oriented language and a relational database, ORM often reduces the amount of code that needs to be written.[2]

> Disadvantages of ORM tools generally stem from the high level of abstraction obscuring what is actually happening in the implementation code. Also, heavy reliance on ORM software has been cited as a major factor in producing poorly designed databases.

The core motivation for developing and using an ORM framework is the need to overcome the [impedance mismatch problem](https://en.wikipedia.org/wiki/Object-relational_impedance_mismatch)

> The object-relational impedance mismatch is a set of conceptual and technical difficulties that are often encountered when a relational database management system (RDBMS) is being served by an application program (or multiple application programs) written in an object-oriented programming language or style, particularly because objects or class definitions must be mapped to database tables defined by a relational schema.

In short, we want to be able to interact with a SQL database using an Object-Oriented programming paradigm, and an ORM framework provides a set of absrtactions and methods that allow developers to write code in this fashion.

An additional touted benefit is that ORM frameworks isolate developers from the inner quirks of particular database implementations, but in practice this is often a secondary concern at most.  Generally, the ability to compose snippets of code and queries into more general operations and the seamless integration of information from the database into the native programming language structures are what justify the "magic" inherent in an ORM framework.

## Basic Concepts and Queries

One of the fundamental design choices of modern ORM's is to represent an individual row in a database as a single instantiated object (or structure) in the application programming language.  A table is represented as a class object or as a class.  Therefore, operations that are performed on a table, e.g., retrieving or inserting a particular row, are _class methods_, and operations that are performed on a single row, e.g., updating a column, are _instance methods_ on a particular object.

## What is Sequelize?

"Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more." - sequelize.org

Sequelize is a JavaScript ORM!


### Let's create our first Sequelize project.

First, install the [Sequelize Client](https://github.com/sequelize/cli):

```sh
cd sequelize
npm init -y
npm install --save-dev sequelize-cli
```

Next we will initialize a Sequelize project:

```sh
npx sequelize-cli init
```
> Let's get familiar with all the commands available to us: `npx sequelize-cli --help`

Let's configure our Sequelize project to work with Postgres:

sequelize/config/config.json
```js
"development": {
    "database": "sequelize_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false,
    "underscored": true
  }
```

Cool, now create the Postgres database:

```sh
npx sequelize-cli db:create
```

Next we will create a User model:

```sh
npx sequelize-cli model:generate --name User --attributes first_name:string,last_name:string,email:string --underscored
```

Below is the User model and an associated migration that will be created from the above command: 

sequelize/models/user.js

```js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    underscored: true,
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
```

sequelize/migrations/20190904165246-User.js

```js
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
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
    return queryInterface.bulkInsert('Users', [{
        first_name: 'John',
        last_name: 'Doe',
        email: 'demo@demo.com',
        created_at: new Date(),
        updated_at: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
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
psql sequelize_development
SELECT * FROM "Users";
```

Don't forget to create a .gitignore file `touch .gitignore`!

```sh
/node_modules
.DS_Store
```

## Resources

- https://sequelize.org/master/manual/migrations.html
