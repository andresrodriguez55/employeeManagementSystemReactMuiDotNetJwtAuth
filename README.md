# Basic Employee Management System With React & .Net Core, JWT Used For Authentication & Authorization

<a href="https://github.com/andresrodriguez55/employeeManagementSystemReactMuiDotNetJwtAuth" target="_blank">Repo link</a>

## Contents
- Database Design
- Backend With .NET
- Frontend With React
- Screenshots

## Database Design

The project was carried out dynamically, taking into account the given requirements. Since it is a project with few requirements, the design and implementation was carried out dynamically. Since the most fundamental part of the project is the database, it started with its design and implementation.

![](https://drive.google.com/uc?id=1ZuI7zmGXcX6CL2FuuJOD-bZNdfggo_Px)

In the first place, the attributes that must be found in each entity were considered, they were reflected in a simple analysis. Since not much detail was requested in the project, the analysis part was completed in a short time, I will not talk more about the analysis carried out so as not to lengthen this section. The result of the ER diagram shown above has been reached.

![](https://drive.google.com/uc?id=1v1atljqqxchKAMXB7mADcZYVusRaboD8)

The mapping process was carried out on the result obtained, so it was important to establish a database correctly. I will not mention the constraints needed in the analysis and the data types and length limits to be used for each attribute, so as not to prolong the report, the relevant section can be seen in detail in the scripts.

## Backend With .NET

After writing the SQL scripts, the backend part was started. Entity Framework was used to implement it quickly and conveniently, so that models of all entities were created, and then control classes were written quickly to include the models.

JSON Web Tokens are used for session recording and data protection, not too detailed, the token is set up with a user name and password to perform the operation in a simple way, each created token has one hour validity. The token is stored in the client's local area.

## Frontend With React

![](https://drive.google.com/uc?id=12oAbAkcxDBEKhppKtAGlZI8_WdepM18a)

Finally, sketches of the interface were made. In addition, the Material UI component library is used to achieve a simple and effective design.

# Screenshots

![](https://drive.google.com/uc?id=1aJXdigGW0ALRQnpIS_cMF5Y1NlllzQa1)
![](https://drive.google.com/uc?id=1Ui_L5sGCzIqcaDJCGRkUNKov4L1M4Slt)
![](https://drive.google.com/uc?id=1Qr7LqkFzI8brx8QRbhOkQ1NzcG8vFZ8c)
![](https://drive.google.com/uc?id=1aq6njQSaSdTUC3a1XtuidkPFEKtaW1_3)
