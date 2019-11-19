CREATE TABLE Person (
	id SERIAL NOT NULL PRIMARY KEY,
	f_name varchar(50),
	l_name varchar (50),
	birthday date
);

CREATE TABLE Relationship (
	id SERIAL NOT NULL PRIMARY KEY, 
	mother int NOT NULL REFERENCES Person(id),
	father int NOT NULL REFERENCES Person(id),
	child int NOT NULL REFERENCES Person(id)
);

INSERT INTO Person
VALUES
	(DEFAULT, 'George', 'Georgeson', '1965-01-01'),
	(DEFAULT, 'Katie', 'Georgeson', '1965-01-01'),
	(DEFAULT, 'Nicky', 'Georgeson', '1965-01-01'),
	(DEFAULT, 'Sally', 'Georgeson', '1965-01-01'),
	(DEFAULT, 'Bob', 'Graham', '1965-01-01'),
	(DEFAULT, 'Joe', 'Graham', '1965-01-01'),
	(DEFAULT, 'Billy', 'Graham', '1965-01-01'),
	(DEFAULT, 'Lacy', 'Graham', '1965-01-01'),
	(DEFAULT, 'Fred', 'Walters', '1965-01-01'),
	(DEFAULT, 'Katie', 'Hamlet', '1965-01-01'),
	(DEFAULT, 'Nick', 'Fury', '1965-01-01'),
	(DEFAULT, 'Ben', 'Hamlet', '1965-01-01');

	INSERT INTO Relationship
VALUES
	(DEFAULT, 2, 1, 3),
	(DEFAULT, 2, 1, 4),
	(DEFAULT, 8, 5, 6),
	(DEFAULT, 8, 5, 7);
