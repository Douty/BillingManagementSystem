import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.KEY);
const db = client.db("CompanyData");
const userCol = db.collection("Customer");
const billCol = db.collection("Bills");
const recordCol = db.collection("BillingRecords");

class Customer {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = "Example@gmail.com";
    this.phoneNumber = "999-999-9999";
    this.simulatedTime = new Date();
    this.username = username;
    this.password = password;
  }

  static async getPersonDetails(username) {
    const userQuery = { username: username };
    const result = await userCol.findOne(userQuery);

    return {
      _id: result["_id"],
      firstName: result["firstName"],
      lastName: result["lastName"],
      username: result["username"],
      phoneNumber: result["phoneNumber"],
      email: result["email"],
      simulatedTime: result["simulatedTime"],
    };
  }
  static async getFirstName(id) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const user = await userCol.findOne(userQuery);
      return user["firstName"];
    } catch (err) {
      console.log("Error during fetching first name:", err);
      return null;
    }
  }
  static async getLastName(id) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const user = await userCol.findOne(userQuery);
      return user["lastName"];
    } catch (err) {
      console.log("Error during fetching first name:", err);
      return null;
    }
  }
  static async getPhoneNumber(id) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const user = await userCol.findOne(userQuery);
      return user["phoneNumber"];
    } catch (err) {
      console.log("Error during fetching first name:", err);
      return null;
    }
  }
  static async getSimulatedTime(id) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const user = await userCol.findOne(userQuery);
      return user["simulatedTime"];
    } catch (err) {
      console.log("Error during fetching first name:", err);
      return null;
    }
  }
  static async getFirstName(id) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const user = await userCol.findOne(userQuery);
      return user["firstName"];
    } catch (err) {
      console.log("Error during fetching first name:", err);
      return null;
    }
  }

  static async setFirstName(id, firstName) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const billQuery = { customerID: new ObjectId(id) };

      const newFirstName = { $set: { firstName: firstName } };

      await userCol.findOneAndUpdate(userQuery, newFirstName);
      await billCol.findOneAndUpdate(billQuery, newFirstName);

      //checks if update was successful
    } catch (err) {
      console.error("Error during update:", err);
    }
  }
  static async setLastName(id, lastName) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const billQuery = { customerID: new ObjectId(id) };

      const newLastName = { $set: { lastName: lastName } };

      await userCol.findOneAndUpdate(userQuery, newLastName);
      await billCol.findOneAndUpdate(billQuery, newLastName);
    } catch (err) {
      console.log(err);
    }
  }
  static async setUserName(id, username) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const newUsername = { $set: { username: username } };
      await userCol.findOneAndUpdate(userQuery, newUsername);
    } catch (err) {
      console.log(err);
    }
  }
  static async setEmail(id, email) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const newEmail = { $set: { email: email } };
      await userCol.findOneAndUpdate(userQuery, newEmail);
    } catch (err) {
      console.log(err);
    }
  }
  static async setPhoneNumber(id, number) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const newPhoneNumber = { $set: { phoneNumber: number } };
      await userCol.findOneAndUpdate(userQuery, newPhoneNumber);
    } catch (err) {
      console.log(err);
    }
  }
  static async updateSimulatedTime(id, date) {
    try {
      const userQuery = { _id: new ObjectId(id) };
      const newSimulatedTime = { $set: { simulatedTime: date } };
      await userCol.findOneAndUpdate(userQuery, newSimulatedTime);
    } catch (err) {
      console.log(err);
    }
  }
}
export default Customer;
