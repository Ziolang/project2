CREATE TABLE Cells ( 
	id SERIAL NOT NULL PRIMARY KEY, 
	name varchar(100) NOT NULL, 
	content char NOT NULL, 
	hexColor varchar, 
	blocks boolean NOT NULL,
	durability boolean,
	pr int,
	mr int, 
	detail varchar(1000)
);

CREATE TABLE Positions ( 
	id SERIAL NOT NULL PRIMARY KEY, 
	position varchar(2) NOT NULL, 
	cell_id int NOT NULL REFERENCES Cells(id), 
	grid_name varchar(100) NOT NULL
);

INSERT INTO Cells
VALUES 
	(DEFAULT, 'Tree', 'T', '009617', true, true, 3, 1, 'A vertical log with leaves!'),
	(DEFAULT, 'Water', '~', '001eff', true, false, NULL, NULL, 'A calm bit of H2O.'),
	(DEFAULT, 'Wall', 'W', '8f8f8f', true, true, 4, 4, 'A solid obsticle. It could be damaged, but it looks pretty sturdy.'),
	(DEFAULT, 'Door', 'D', '8f8f8f', true, true, 2, 2, 'It can be opened.');

INSERT INTO Positions
VALUES 
	(DEFAULT, 'A1', 1, 'Sample'),
	(DEFAULT, 'B2', 1, 'Sample'),
	(DEFAULT, 'C3', 1, 'Sample'),
	(DEFAULT, 'D4', 1, 'Sample'),
	(DEFAULT, 'E5', 1, 'Sample'),
	(DEFAULT, 'F6', 1, 'Sample'),
	(DEFAULT, 'G7', 1, 'Sample'),
	(DEFAULT, 'H8', 1, 'Sample'),
	(DEFAULT, 'I9', 1, 'Sample');