# Billing Management System

I made this project to familiarize myself with various backend technologies.

## Technology Used

- HTML 
- CSS
- Javascript
- [React.js](https://react.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vite](https://vitejs.dev/)

## How to Run the Project

### Step 0 
Ensure that you have the latest version of Node.js downloaded.
Visit [MongoDB](https://www.mongodb.com/) and create an account, after which create a database specifically named `CompanyData` with three collections named `Customer`, `Bills` and `BillingRecords`.

### Step 1 
Clone this repository <br>

`git clone https://github.com/Douty/BillingManagementSystem.git`<br>
`cd BillingManagementSystem`

### Step 2
Install all Dependencies.<br>

For the frontend 

`cd client`<br>
`npm install`<br>

For the backend

`cd server`<br>
`npm install`<br>

### Step 3 
Establish  environment variables 

create a `.env` file in the server folder. Inside the `.env` file add the following line.

`KEY=your_mongodb_connection_string_here`

Be sure to replace "your_mongodb_connection_string_here" with your actual MongoDB connection string

### Step 4
Start the application! 

Enter into the server folder then write in the terminal the following command

`cd server`<br>
`npm start`<br>

Now enter into the client folder and write the following command.

`cd client`<br>
`npm run dev`<br>


