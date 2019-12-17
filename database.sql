CREATE TABLE Cells ( 
	id SERIAL NOT NULL PRIMARY KEY, 
	name varchar(100) NOT NULL, 
	content char NOT NULL, 
	color varchar(7), 
	blocks boolean NOT NULL,
	durability int,
	pr varchar(20),
	mr varchar(20),
	img varchar(100),  
	detail varchar(1000)
);
INSERT INTO Cells
VALUES
	(DEFAULT, 'Tree', 'T', '#009617', true, 100, 'Moderate.', 'Very Low.', 'tree.png', 'A vertical log with leaves!'),
	(DEFAULT, 'Water', '~', '#001eff', true, NULL, NULL, NULL, 'liquid.png', 'A calm bit of H2O.'),
	(DEFAULT, 'Wall', 'W', '#8f8f8f', true, 100, 'High.', 'High', 'wall.png', 'A solid obsticle. It could be damaged, but it looks pretty sturdy.'),
	(DEFAULT, 'Door', 'D', '#8f8f8f', true, 100, 'Low.', 'Low.', 'door.png', 'It can be opened.');

CREATE TABLE Grids (
	id SERIAL NOT NULL PRIMARY KEY,
	name varchar(100) NOT NULL,
	rows int NOT NULL,
	columns int NOT NULL
);

CREATE TABLE Positions ( 
	id SERIAL NOT NULL PRIMARY KEY, 
	position varchar(2) NOT NULL, 
	cell_id int REFERENCES Cells(id), 
	grid_name varchar(100) NOT NULL
);