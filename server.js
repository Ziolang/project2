const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const cellController = require('./controllers/cellcontroller.js')

express()
	.use(express.static(path.join(__dirname, 'public')))
	.use(express.json())
	.use(express.urlencoded({extended: true}))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/getCell', cellController.getCell)
	.get('/getCells', cellController.getCells)
	.post('/postCell', cellController.postCell)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const connectionString = process.env.DATABASE_URL || "postgres://lsetltiaqifutt:a9820380e07bcefd62806e966634d27a4d57723db2509436a8f7bcab71279927@ec2-174-129-253-174.compute-1.amazonaws.com:5432/denvgq60nkajt6?ssl=true";
const pool = new Pool(
	{
		connectionString: connectionString
});