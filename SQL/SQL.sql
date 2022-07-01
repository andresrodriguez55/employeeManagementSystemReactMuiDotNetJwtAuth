CREATE DATABASE EMPLOYEE_DATABASE;

USE EMPLOYEE_DATABASE;

CREATE TABLE EMPLOYEE
(
	id INT IDENTITY(1,1),
	dName VARCHAR (120), 
	nationalNumber BIGINT NOT NULL,
	fname VARCHAR (50) NOT NULL,  
	mname VARCHAR (50), 
	lname VARCHAR (97) NOT NULL,  /* From a database of over 26 million surnames, the longest is Enraejakavarapantiyacuppiramaniyakattepammutuair[1] at 48 characters. In Spain we use 2 surnames, then we need 48 + 1 (space) + 48 chars */
	adress VARCHAR (255),
	salary FLOAT NOT NULL,
	sex CHAR(1),
	bDate DATE NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (dName) REFERENCES DEPARTMENT(dName) ON DELETE CASCADE ON UPDATE CASCADE,

	UNIQUE(nationalNumber),
	CHECK(LEN(fName)>2),
	CHECK(LEN(lName)>2),
	CHECK (salary>0),
	CHECK (sex IN ('F', 'M')),
	CHECK (bDate >=	 '1930-01-01'),
);


CREATE TABLE DEPARTMENT
(
	dName VARCHAR (120),
	PRIMARY KEY (dName),

	CHECK(LEN(dName)>1)
);

CREATE TABLE BUSINESS_USER
(
	username VARCHAR (25), 
	passwrd VARCHAR (25),

	PRIMARY KEY (username),
	
	CHECK(LEN(username)>2),
	CHECK(LEN(passwrd)>2),
);

INSERT INTO DEPARTMENT VALUES('Human Resources');
INSERT INTO DEPARTMENT VALUES('Administration');
INSERT INTO DEPARTMENT VALUES('IT');

INSERT INTO EMPLOYEE(dName, nationalNumber, fname, lname, salary, sex, bDate) VALUES('Human Resources', 453211121, 'Sol', 'Garcia', 3999, 'F', '1973-08-22');
INSERT INTO EMPLOYEE(dName, nationalNumber, fname, lname, salary, sex, bDate) VALUES('Administration', 144221028, 'Pedro', 'Plana', 5440, 'M', '1982-03-07');
INSERT INTO EMPLOYEE(dName, nationalNumber, fname, lname, salary, sex, bDate) VALUES('IT', 111532567, 'Daniel', 'Gonzalez', 5440, 'M', '1972-10-03');
INSERT INTO EMPLOYEE(dName, nationalNumber, fname, lname, salary, sex, bDate) VALUES('IT', 531926135, 'Jose', 'Rodriguez', 5440, 'M', '1990-09-09');
INSERT INTO EMPLOYEE(dName, nationalNumber, fname, lname, salary, sex, bDate) VALUES('IT', 224021037, 'Alejandra', 'Hernandez', 5440, 'F', '1984-07-17');

SELECT * FROM BUSINESS_USER
SELECT * FROM DEPARTMENT
