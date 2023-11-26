import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";
import path, { dirname } from "path";

import { hashPass, verifyPass } from "./passwordManager.js";
import Customer from "./Customer.js";
import Bill from "./Bill.js";

dotenv.config();
const app = express();

const client = new MongoClient(process.env.KEY);
const port = 3000;

app.use(cors());
app.use(express.static("../client/dist"));
app.use(express.json());

const db = client.db("CompanyData");
const userCol = db.collection("Customer");
const billCol = db.collection("Bills");

//Start of the registration process
app.post("/api/registrationAttempt", async (req, res) => {
  try {
    const formData = req.body.FormData;
    const success = await registerAttempt(formData);
    res.send({ success: success });
  } catch (err) {
    console.log(err);
  }
});

const registerAttempt = async (FormData) => {
  const firstName = FormData.firstName;
  const lastName = FormData.lastName;
  const username = FormData.username;
  const password = FormData.password;

  try {
    const user = await userCol.findOne({ username: username });

    if (user == null) {
      const encrypt = await hashPass(password);

      const customer = new Customer(firstName, lastName, username, encrypt);

      await userCol.insertOne(customer);

      const customerDoc = await userCol.findOne({ username: username });

      const date = new Date();
      const dueDate = new Date(date.setDate(date.getDate() + 31));

      const bill = new Bill(customerDoc._id, dueDate, firstName, lastName);

      await billCol.insertOne(bill);

      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
//End of the registration process

//Start of the login process
app.post("/api/login", async (req, res) => {
  try {
    const userData = req.body.userData;

    const username = userData.username;
    const password = userData.password;

    const login = await loginAttempt(username, password);

    if (login) {
      const customerDoc = await Customer.getPersonDetails(username);

      const billDoc = await billCol.findOne({ customerID: customerDoc._id });

      res.json({
        success: true,
        customerDetails: customerDoc,
        billDetails: billDoc,
      });
      return;
    }
  } catch (err) {
    console.log(err);
  }
});

const loginAttempt = async (username, password) => {
  try {
    const userQuery = await userCol.findOne({ username: username });
    if (userQuery != null) {
      if (await verifyPass(password, userQuery["password"])) {
        return true;
      } else {
        throw new Error("Invalid password");
      }
    } else {
      throw new Error("Username does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};
//End of the login process

//Start of the Updating User information process
app.post("/api/updateUserInfo", async (req, res) => {
  try {
    const fieldsToUpdate = [
      "firstName",
      "lastName",
      "username",
      "phoneNumber",
      "email",
    ];
    const newUserInfo = req.body.newUserInfo;
    const userID = req.body.userID;
    let result;

    for (const field of fieldsToUpdate) {
      if (newUserInfo[field] != undefined) {
        switch (field) {
          case "firstName":
            result = Customer.setFirstName(userID, newUserInfo.firstName);

            break;

          case "lastName":
            result = Customer.setLastName(userID, newUserInfo.lastName);

            break;

          case "username":
            result = Customer.setUserName(userID, newUserInfo.username);

            break;
          case "email":
            result = Customer.setEmail(userID, newUserInfo.email);

            break;
          case "phoneNumber":
            result = Customer.setPhoneNumber(userID, newUserInfo.phoneNumber);

            break;
          default:
            console.log("No field detected");
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//End of the Updating User information process

//Save current session
app.post("/api/simulationSave", async (req, res) => {
  try {
    const { currentBill, customerStatus } = req.body;
    updateSessionDetails(currentBill, customerStatus);
  } catch {
    console.log(err);
  }
});

const updateSessionDetails = async (currentBill, customerStatus) => {
  try {
    await Customer.updateSimulatedTime(
      customerStatus.id,
      customerStatus.simulatedDate
    );
    await Bill.setWattUsage(customerStatus.id, currentBill.kiloWatts);
    await Bill.setAmountOwed(customerStatus.id, currentBill.amountOwed);
  } catch (err) {
    console.log(err);
  }
};
//End of Save current session section

app.post("/api/PayBalance", async (req, res) => {
  try {
    const { currentBill, customerStatus } = req.body;
    updateSessionDetails(currentBill, customerStatus);
    Bill.updatePaymentStatus(customerStatus.id, true);

    const previousDueDate = await Bill.getDueDate(customerStatus.id);
    const newDueDate = new Date(previousDueDate);
    newDueDate.setDate(newDueDate.getDate() + 31);

    const newBill = new Bill(
      new ObjectId(customerStatus.id),
      newDueDate,
      customerStatus.firstName,
      customerStatus.lastName
    );
    Bill.Pay(customerStatus.id, newBill);
  } catch (err) {
    console.log(err);
  }
});

//starts server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
  client.connect();
  console.log("Database is up and running");
});
