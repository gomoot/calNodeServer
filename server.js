const express = require('express')
const fs = require('fs')
const app = express()

var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
//
//var os= require('os')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', (req, res) => {
  //console.log(os.userInfo());
  var ip = (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
	
  res.send('Hello World' + ip)
})

app.get('/load', function (req, res) {
	//var dataString = null;;
	var data = null;;
	fs.readFile(getFileName(req) , 'utf8', function (err, jsonData) {
	  if (err) throw err;
	//	  console.log("jsonData" + jsonData);
	  console.log("load json" + jsonData );
	  data = JSON.parse(jsonData);
	  //dataString = jsonData;
	  res.json(data);
	  
	});
	
	
	
    
});

app.post('/save', function (req, res) {
	 
	var json = req.body;
	console.log("json save" + JSON.stringify(json));
	fs.writeFile(getFileName(req), JSON.stringify(json), (err) => {
		if (err) {
			console.error(err);
			return;
		};
		console.log("File has been created");
		res.send("Save file success ");
	});
    
});

app.get('/load1', function (req, res) {
	
    res.send('Hello World1'  + getFileName(req))
});

app.listen(port, () => {
  console.log('Start server at port' + port)
})

function getFileName(req)
{
	var ip = (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
	
	ip = "./save/file_" + ip.replace(/:/g,'')+ ".json"
	console.log("getFileName " + ip);
	return ip;
}
