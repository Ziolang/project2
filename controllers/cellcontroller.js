const cellModel = require('../models/cellModel.js')

function getCell(req, res) {
	var cellID = req.query.id;
	cellModel.getCellById(cellID, function(err, result) {
		res.json(result);
	});
}

module.exports = {
	getCell :getCell
}