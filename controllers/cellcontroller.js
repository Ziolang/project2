const cellModel = require('../models/cellModel.js')

function getCell(req, res) {
	var id = req.query.id;
	cellModel.getCellById(id, function(err, result) {
		res.json(result)
	});
}

module.exports = {
	getCell :getCell
}