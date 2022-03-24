const { MongoClient } = require('mongodb');

class DBClient {
  static #instance = null;
  static #database = null;
  static #todosCollection = null;

  static connect = async () => {
    if (this.#instance === null) {
      this.#instance = new MongoClient(process.env.DB_KEY);
      await this.#instance.connect().then(() => {
        console.log('connected to Mongo DB');
      });

      this.#database = this.#instance.db('todo-vanilla-app');
      this.#todosCollection = this.#database.collection('todos');
    }
  };

  static instance = async () => {
    return this.#instance;
  };

  static database = () => {
    return this.#database;
  };

  static todosCollection = () => {
    return this.#todosCollection;
  };
}

module.exports = DBClient;
