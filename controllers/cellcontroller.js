const cellModel = require('../models/cellModel.js')

function getCell(req, res) {
	var cellID = req.query.cellID;
	cellModel.getCellById(cellID, function(err, result) {
		res.json(result);
	});
}

function getCells(req, res) {
	cellModel.getAllCells(function(err, result) {
		res.json(result);
	});
}

function postCell(req, res) {
	var cell = req.body.cell;
	cellModel.postCellToDB(cell, function(err, result) {
		res.json(result);
	});
}

function killCell(req, res) {
	var cellID = req.body.id;
	cellModel.killCellById(cellID, function(err, result) {
		res.json(result);
	});
}
 
function saveGrid(req, res) {
	var grid = req.body.grid;
	console.log(grid);
	cellModel.save(grid, function(err, result) {
		res.json(result);
	});
}

module.exports = {
	getCell: getCell,
	getCells: getCells,
	postCell: postCell,
	killCell: killCell,
	saveGrid: saveGrid
}