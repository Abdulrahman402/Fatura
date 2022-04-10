# Fatura

Fatura is a simple software application designed to authenticate, authorize users requests and give users some abilities.

# Technologies used

ExpressJS, MongoDB, Mongoose, JWT, Cookies, PM2 and Jest.

# Application setup and run

1- Clone it to your machine.  
2- Add the three .env files (development.env, test.env, production.env).

- Four variables are needed ("PORT", "MONGODB_URL", "ACCESS_SECRET", "REFRESH_SECRET").

3- In command line type "npm i".

4- Three different scripts to run the application in three different environments.

- "npm run dev" to run in development environment.
- "npm run test" to run in test environment.
- "npm run start" to run in production environment.

# Files structure & details

1- app.js & server.js

- We use seperate files to run our application since the .listen method generates errors with "supertest" module.

2- Startup

- DB.js: includes the database connection code.
- Routes.js: includes middlewares added to the app.

3- Services/JWT

- generateAccess.js: Here we generate access token with payload "\_id" and "role" with expiration 5 minutes.
- generateRefresh.js: Here we generate refresh token with payload "\_id" and "role" with expiration 1 year.

4- Middlewares

- auth.js: Here we check if the access token is valid or not.
- verifyRefresh.js: Here we check if the refresh token is valid or not.
- isAdmin.js: Here we check if the request is coming from an admin user.
- errors.js: Here we handle asyncronous errors.

        Note: error.js works alongside the module "express-async-errors"

5- Routes

- It includes all assigned routes with protection middlewares on them.

6- Models

- It includes MongoDB schemas and collections.

# 7- Controllers (APIs or Routes)

## 1- Add Employee:

### Path:

    baseUrl/user/addEmployee

### Middlewares used:

    1- auth.js.
    2- isAdmin.js.

### Requirements:

    Header: Access token on request header.
    Body: JSON object with 4 properties ("name", "email", "password", "role") role property is not required.

### Implementaion:

    - Check if request body is totally valid. If not, returns status code 400.
    - Check if email exists in database. If exists, returns status code 400.
    - Create employee document.
    - Hash the password.
    - Save the document to database.
    - Returns status code 201.

## 2- Login:

### Path:

    baseUrl/user/login

### Requirements:

    Body: JSON object with 2 properties ("email", "password", ).

### Implementaion:

    - Check if request body is totally valid. If not, returns status code 400.
    - Check if email exists in database. If not, returns status code 400.
    - Check if password match existing user's password. If not, returns status code 400.
    - Generate access and refresh tokens.
    - Store tokens in cookies.
    - Return status code 200.

## 3- Assign role

### Path:

    baseUrl/user/assignRole

### Middlewares used:

    1- auth.js
    2- isAdmin.js

### Requirements:

    Header: Access token on request header.
    Body: JSON object with 1 property ("role").

## Implementaion:

    - Check if request body is totally valid. If not, returns status code 400.
    - Check if user exists in database. If not, return status code 404.
    - Assign role for user and save to database.
    - Return status code 200.

## 4- Generate access token

### Path:

    baseUrl/user/generateAccessToken

### Middlewares used:

    1- verifyRefresh.js

### Requirements:

    Header: Refresh token on request header.

### Implementaion:

    - Decode Refresh token stored in cookies.
    - Compare payload to payload coming from request header.
    - If not matching return status code 401.
    - Check if user exists in database. If not, return status code 404.
    - Generate new access token and store in cookies.
    - return status code 200.

## 5- Logout

### Path:

    baseUrl/user/logOut

### Middlewares used:

    1- auth.js

### Requirements:

    Header: Access token on request header.

### Implementaion:

    - Invalidate all stored tokens.
    - return status code 200.

# Related to task

## Solution design

Reading the task many times helped me understand the task very well.
Also I spent much time to figure out how to build a flow that fits the solution.

## For example:

### how to keep user's session valid.

    This means session needs to be always valid but for securety reasons that is not a good approache.
    So this led me to Access and Refresh tokens strategy.

### way to force invalidating sessions.

    This tells me that session should have expiration date.

### How you identify and secure user's session (session, jwt).

    I thought I need to store the session where it can be secured on server, I used cookies

### service is responsible for validating whether logged user is permitted to do specific action or not.

### how to strucuture your roles and permissions.

### how to assign specific user a specific role or permission.

    Application is role-based, every role can make some actions depending on the role.
    Middleware is needed to handle this.

## Things I learnt

    It was my first time dealing with Refresh Access Tokens strategy, I found it very helpful.
    It's been a long time since I wrote my last test, it was fun to remember, and I believe my testing code will get much better day by day.

## Links were useful to me

    https://creately.com/diagram-type/objects/flowchart
    https://medium.com/geekculture/node-js-environment-variables-setting-node-app-for-multiple-environments-51351b51c7cd
    https://coderwall.com/p/8if09q/settings-cookies-for-supertest
