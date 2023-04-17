# React-Post-Notice

## Submission Instructions [Please note]

## Maximum Marks - 24

- The Submission should not contain spaces, for example /rct-101 folder/eval will not work
- Do not push node_modules and package_lock.json to github

```
✅ able to submit the app - 1 mark ( minimum score )
✅ check if authentication is working properly and showing an error message for invalid credentials - 2 marks
✅ check whether the welcome message is visible or not after successful login - 1 mark
✅ After login correct number of notices as per db.json are present or not - 2 marks
✅ After login all the notices are present in the sorted way - 3 marks
✅ check whether category filter functionality is working fine or not - 3 marks
✅ check if the date filter is working fine or not - 3 marks
✅ check whether clicking on add notice button is showing us the form and working as per requirement - 3 marks
✅ check whether the user able to add notice by his name and update the notice board in real-time - 1 - 3 marks
✅ check whether the user able to add notice by his name and update notice board in real-time - 2 - 2 marks
✅ logout button is working or not - 1 mark
```

## Installation

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- please make sure you do not push package-lock.json

- Download and unzip the boilerplate file and then copy the "**contents**" of the unzipped file in the Masai Folder.
- Navigate to the Masai Folder, in VS Code.
- Run the following commands inside,

  - `npm install --engine-strict`
  - `npm start`
  - `npm run server` -> to start the json-server

- **_Note_**:

1. Libraries need to be installed by yourself
2. Make sure that the json-server is up and running at port `8080`
3. Create a .env file. Include `REACT_APP_JSON_SERVER_PORT=8080` in it and restart the react server
4. Use `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}` as the json-server url where ever you use `http://localhost:8080`

### Not following the above instructions will lead your test cases to fail

## Problem Statement

- You need to create a React notice board application that allows authenticated users to post and view notices.
- The notices should be displayed in descending order of their post date, with the most recent notice appearing first.

## Understanding Component Structure

- Components
  - Login.jsx
  - Notices.jsx
  - Notice.jsx
- App.js

**Note** - `Make sure you use only the given components and don't create new files and folders. Changing the component name, and structures might result in giving you zero marks.`

## Understanding Data Structure

- db.json (go through db.json file to understand the data structure)

**Note** - `Make sure you use only the given data and don't create new data. Changing data might result in giving you zero marks`

## Features to build

### App

1. This component will have a Login component and a Notices component.
2. Only one of these components will be visible at a time, based on the user's login status.
   - if the user is not logged in - Login component will be visible
   - if the user is logged in - Notices component will be visible

### Login.jsx

<div style="width:100%;height:400px;margin:auto;display:flex;justify-content:space-between">
<img width="40%" height="400px" alt="Login" src="https://i.imgur.com/Q7oUZLG.png">
<img width="40%" height="400px" alt="Login" src="https://i.imgur.com/GE9vDw7.png">
</div>

3. This component renders a form with input fields for username and password.
4. After submitting the form, make a GET request to /users to get the list of users.
5. Check if the entered username and password match with any of the users in the list. If there is a match, the user's name should be able to see the Notices component.
6. If there is no match, the user should see the Login component only and an error message in a `p` tag saying "Invalid credentials."

### Notices.jsx

<div style="width:100%;margin:auto;text-align:center">
  <img alt="Login" src="https://i.imgur.com/JFWSHof.png">
</div>

7. After a successful login, the Notices component will be visible.
    - This component will manage the Notices with the help of the Notice component along with the welcome message `Hi ${userName}, Welcome!`. (see above image for reference)
    - where userName is the username of the person who logged in.
8. This component will fetch the data from the db.json (API end point will be `/notices`) and renders the data onto the DOM with the help of the Notice component.
9. Users should be able to view all notices or filter notices by date or category. (Only use query params for getting the filtered data and don't do in-app sorting(like using arr.sort is prohibited)).
    - The app should display latest notices first.(i.e in descending order based on date and fetch the data accordingly)
10. On the top of the page there should be a logout button clicking on it the person should see the login component only.
11. There is a "Add Notice" button, onClicking on which we can see a form where the user can add a new notice, and the text content of the button changes to "Hide Form". When clicking on it again the form will not be visible.
    - When user fills the form(adds notice) and submits then it should make a post request to update the db.json  to the end point `/notices` and it should update on UI(necessary requests can be made to db.json(json server))


<div style="width:100%;margin:auto;text-align:center">
  <img alt="Login" src="https://i.imgur.com/dlCcJS7.png">
</div>

****Note: To perform the above operations, you need to use query parameters and make a request to the JSON server and get the filtered data based on the search query. It's mandatory not to perform sorting in the app and instead, use query parameters to sort the data on the server-side.
refer to json server documentation for query params:- [https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)****

#### Notice.jsx
<div style="width:100%;margin:auto;text-align:center">
  <img alt="Login" src="https://i.imgur.com/IhxqrBK.png">
</div>

12. The component will display all the notices posted by users in a list format.
13. Each notice should display the title, the message body, and the date.
14. The details of the user who posted the notice should be also visible in the respective span tag provided in the boilerplate.
15. Go through the above image and append all the data, and also note that the author's username of the post should be visible instead his id.
16. You are free to add styling. But don't change the order of HTML elements.

## General Instructions (**_IMPORTANT_**)

1. Do not use Global CSS, instead use `<componentName>.module.css` convention for Css in that file.
2. Do Not Remove `data-cy="xxxx"` from anywhere, this is used by testing tools to test your code, and removal of this will lead to a low score.
3. Make sure you use only the given components and don't create new files and folders as changing the component name, or structures might result in giving you zero marks
4. Make sure you use only the given data and don't create new data, as changing data might result in giving you zero marks.

**Note** - This might not be all the things, you are free to use other components.

#### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not just submit it last minute
- try to keep one submission at a time
