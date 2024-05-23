
# Dashboard

This is a web application to analyze,filter and visualize data.

## Main Features
Here are just a few of the things that StockMo does well:

  - Smooth user interface to analyze, visualize and filter data.
  - Data analysis can be easily done through the bar graph.
  - Lets the user to filter the various variables and display generate a insight through a graph visualization.
  - Fetches the data from a given json file and the user can view the data in the interface. 
  - Uses API using Nodejs (Express). 
  - Uses MongoDB DataBase and React for FrontEnd and Nodejs for Backend.
  - The frontEnd is designed using Material UI (MUI).

## How to setup
The source code is currently hosted on GitHub at:
https://github.com/anusha-uc/dashboard

### 1. Clone the GitLab Repository
```sh
git clone https://github.com/anusha-uc/dashboard.git
```
## 2. FrontEnd
### 2.1 Navigate to the react project directory
```sh
cd frontend
```
### 2.2 Install react Dependencies
```sh
npm install
```
### 2.3 Run the Project
```sh
npm start
```

## 3. Backend
### 3.1 Install Nodejs Dependencies
```sh
npm install
```

### 3.2 Update environment variables in .env file
```txt
PORT=8000
MONGO_URI=`<your MONGO_URI>`

```
### 3.4 Insert data from json to mongo db
```sh
node seeder.js -i
```

### 3.4 Run Backend
```sh
node server.js
```
