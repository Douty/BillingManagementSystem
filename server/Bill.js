import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.KEY);
const db = client.db("CompanyData");
const billCol = db.collection("Bills");
const recordCol = db.collection("BillingRecords");

class Bill {
  constructor(customerID, dueDate, firstName, lastName) {
    this.amountOwed = 0;
    this.customerID = customerID;
    this.wattUsage = 0;
    this.dueDate = dueDate;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isPaid = false;
  }
  static async getDueDate(id) {
    const userQuery = { customerID: new ObjectId(id) };
    const result = await billCol.findOne(userQuery);

    return result["dueDate"];
  }
  static async getAmountOwed(id) {
    const userQuery = { customerID: new ObjectId(id) };
    const result = await billCol.findOne(userQuery);

    return result["amountOwed"];
  }
  static async getWattUsage(id) {
    const userQuery = { customerID: new ObjectId(id) };
    const result = await billCol.findOne(userQuery);

    return result["wattUsage"];
  }

  static async setAmountOwed(id, due) {
    const userQuery = { customerID: new ObjectId(id) };
    const updatedAmount = { $set: { amountOwed: due } };
    await billCol.findOneAndUpdate(userQuery, updatedAmount);
  }
  static async setWattUsage(id, wattUsage) {
    const userQuery = { customerID: new ObjectId(id) };
    const updatedKiloWatts = { $set: { wattUsage: wattUsage } };
    await billCol.findOneAndUpdate(userQuery, updatedKiloWatts);
  }
  static setDueDate(id, Date) {
    const userQuery = { customerID: new ObjectId(id) };
    const updatedAmount = { $set: { dueDate: Date } };
    billCol.findOneAndUpdate(userQuery, updatedAmount);
  }
  static updatePaymentStatus(id, status) {
    const userQuery = { customerID: new ObjectId(id) };
    const updatedPaymentStatus = { $set: { isPaid: status } };
    billCol.findOneAndUpdate(userQuery, updatedPaymentStatus);
  }
  static async Pay(id, bill) {
    const userQuery = { customerID: new ObjectId(id) };
    const billDoc = await billCol.findOne(userQuery);

    recordCol.insertOne(billDoc);
    billCol.deleteOne(billDoc);
    billCol.insertOne(bill);
  }
}
export default Bill;
