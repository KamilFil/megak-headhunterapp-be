<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# HeadhunterApp

The app is designed to help developers find a job. And also make it possible for potential employers to find them.


## Run Locally
Prepare your local server e.g. XAMPP.
And database e.g. HeidiSQL,DBeaver

Clone the projects

- Server
```bash
  git clone https://github.com/KamilFil/megak-headhunterapp-be
```

- Client
```bash
  git clone https://github.com/KamilFil/megak-headhunterapp-fe
```



Go to the project directories

```bash
  cd megak-headhunterapp-fe
```
```bash
  cd megak-headhunterapp-be
```

Install dependencies

```bash
  npm install
```

Start the server via script in package.json
```bash
  start:dev 
```

Start the client via script in package.json
```bash
  start
```


## License




## Environment Variables

To run this project, you will need to add the following environment variables to files:

db.config.ts

`host`,
`port`,
`username`,
`password`

mailer.config.ts

`SEND_GRID_KEY`
`SEND_GRID_ACCOUNT`


## API Reference

*Auth*
____
  #### Request

| Name      | Path     | Method   | Description                                                                    | Params               | Permissions
| :-------- | :------- | :------- | :------------------------------------------------------------------------------| :------------------- | :-------------
| `login`   | `/login` | `POST`   | Log into application. Required existing **email** and **password** in database | `Body: email, pwd`   | All
| `logout`  | `/logout`| `GET`    | Log out from application.                                                      | -                    | All



*student*
____

  #### Request

| Name               | Path            | Method   | Description                       | Params                                                         | Permissions
| :----------------- | :-------------- | :------- | :-------------------------------- | :------------------------------------------------------------- | :-------------
| `getStudentUser`   | `/:id`          | `GET`    | Get student data by id.           | `id`                                                           | Student
| `updateStudentUser`| `/:id`          | `PATCH`  | Update student data by id.        | `id`                                                           | Student                               
| `updateHireStatus` | `/hired/:id`    | `PATCH`  | Set student status on "hired".    | `id` `Body: firstName, lastName, projectUrls, githubUserName`  | Hr                              
| `updateIsActive`   | `/activate/:id` | `PATCH`  | Set student account on "active".  | `id`                                                           | All                              


*hr-user*
____

  #### Request

| Name                         | Path                               | Method   | Description                             | Params                                                                                                       | Permissions
| :--------------------------- | :--------------------------------- | :------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :-----------
| `getAllStudents`             | `/`                                | `GET`    | Get all students.                       | -                                                                                                            | Hr
| `getAllStudentsToCall`       | `/call-list/:hrId`                 | `GET`    | Get all students to call.               | `hrId`                                                                                                       | Hr
| `filterAllStudents`          | `/call-list/filter`                | `GET`    | Get filtered list of users.             | `Query: expectedTypeWork,expectedContractType, expectedSalary, canTakeApprenticeship, monthsOfCommercialExp` | Hr
| `setUserStatusToInterviewed` | `/call/:hrId/:studentId`           | `PATCH`  | Set student status to "interviewed".    | `hrId, studentId`                                                                                            | Hr
| `getStudentCv`               | `/student-cv/:hrId/:studentId`     | `GET`    | Get user CV.                            | `hrId, studentId`                                                                                            | Hr
| `setUserStatusToHired`       | `/hired/:hrId/:studentId`          | `PATCH`  | Set student status to "hired".          | `hrId, studentId`                                                                                            | Hr
| `setUserStatusAvailable`     | `/not-interested/:hrId/:studentId` | `PATCH`  | Set student status to "not-interested". | `hrId, studentId`                                                                                            | Hr

____
*admin*

  #### Request

| Name                  | Path                 | Method    | Description                     | Params                                                 | Permissions
| :-------------------- | :------------------- | :-------- | :------------------------------ | :----------------------------------------------------- | :-----------
| `createHerByAdmin`    | `/create-hr`         | `POST`    | Create Hr user.                 | `Query: email, fullName, company, maxReservedStudents` | Admin
| `uploadUsersList`     | `/upload-users-list` | `POST`    | Create student user from file.  | `Form data: [Key]: List, [Value]: *.json`              | Admin


JSON file structure:

```json
[
{
   "email": "user1@example.com",
   "courseCompletion": 2,
   "courseEngagement": 2,
   "projectDegree": 2,
   "teamProjectDegree": 3,
   "bonusProjectUrls":"url1, url2"
},
{
   "email": "user2@example.com",
   "courseCompletion": 3,
   "courseEngagement": 3,
   "projectDegree": 3,
   "teamProjectDegree": 4,
   "bonusProjectUrls":"url1"
}
]
```
## Authors

- [@kamilfil](https://github.com/KamilFil)
- [@zuravsky](https://github.com/Zuravsky)
- [@piotrb95](https://github.com/PiotrB95)
- [@karol](https://github.com/)
- [@krzysiek](https://github.com/)


## Tech Stack

**Client:** React, HTML, CSS

**Server:** Node, Express, Nest, TypeORM, Axios



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
