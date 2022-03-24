const { MongoClient } = require('mongodb');

class DBClient {
  static #instance = null;

  static instance = async () => {
    if (this.#instance === null) {
      this.#instance = new MongoClient(process.env.DB_KEY);
      await this.#instance.connect(() => {
        console.log('connected to Mongo DB');
      });
    }
    return this.#instance;
  };
}

module.exports = DBClient;
