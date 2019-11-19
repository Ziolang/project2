CREATE TABLE Cells ( 
	id SERIAL NOT NULL PRIMARY KEY, 
	name varchar(100) NOT NULL, 
	content char NOT NULL, 
	hexColor varchar NOT NULL, 
	blocks boolean NOT NULL,
	durability boolean,
	dr int,
	mr int, 
	detail varchar(1000)
);

CREATE TABLE stats (
	id SERIAL NOT NULL PRIMARY KEY,
);

CREATE TABLE Positions ( 
	id SERIAL NOT NULL PRIMARY KEY, 
	position varchar(2) NOT NULL, 
	cell_id int NOT NULL REFERENCES Cells(id), 
	grid_name varchar(100) NOT NULL
);

CREATE TABLE Grids (
	id SERIAL NOT NULL PRIMARY KEY, 
	name varchar(100) NOT NULL,
	author varchar(100)
);

INSERT INTO Cells
VALUES 
	(DEFAULT, 'Tree', 'T', '009617', true, true, 3, 1, 'A vertical log with leaves!'),
	(DEFAULT, 'Water', '~', '001eff', true, false, NULL, NULL, 'A calm bit of H2O.'),
	(DEFAULT, 'Wall', 'W', '8f8f8f', true, true, 4, 4, 'A solid obsticle. It could be damaged, but it looks pretty sturdy.'),
	(DEFAULT, 'Door', 'D', '8f8f8f', true, true, 2, 2, 'It can be opened!'),
