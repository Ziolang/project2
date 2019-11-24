const gridModel = require('../models/gridModel.js')

function getGrid(req, res) {
	var cellID = req.query.cellID;
	cellModel.getCellById(cellID, function(err, result) {
		res.json(result);
	});
}

module.exports = {
	getGrid :getGrid
}