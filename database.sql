CREATE TABLE Cells ( 
	id SERIAL NOT NULL PRIMARY KEY, 
	name varchar(100) NOT NULL, 
	content char NOT NULL, 
	color varchar(7), 
	blocks boolean NOT NULL,
	durability int,
	pr varchar(20),
	mr varchar(20), 
	detail varchar(1000)
);
INSERT INTO Cells
VALUES 
	(DEFAULT, 'Tree', 'T', '#009617', true, 100, 'Moderate.', 'Very Low.', 'A vertical log with leaves!'),
	(DEFAULT, 'Water', '~', '#001eff', true, NULL, NULL, NULL, 'A calm bit of H2O.'),
	(DEFAULT, 'Wall', 'W', '#8f8f8f', true, 100, 'High.', 'High', 'A solid obsticle. It could be damaged, but it looks pretty sturdy.'),
	(DEFAULT, 'Door', 'D', '#8f8f8f', true, 100, 'Low.', 'Low.', 'It can be opened.');


CREATE TABLE Positions ( 
	id SERIAL NOT NULL PRIMARY KEY, 
	position varchar(2) NOT NULL, 
	cell_id int NOT NULL REFERENCES Cells(id), 
	grid_name varchar(100) NOT NULL
);

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