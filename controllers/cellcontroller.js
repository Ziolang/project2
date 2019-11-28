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
	cellModel.postCellToDB(name, content, color, blocks, durability, pr, mr, detail, function(err, result) {
		res.json(result);
	})
}

module.exports = {
	getCell: getCell,
	getCells: getCells,
	postCell: postCell
}