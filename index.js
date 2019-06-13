var express=require('express');

var app=express();

app.set("view engine",'ejs'); 

app.use(express.static('./public'));

var bodyParser=require('body-parser');

var urlencodedParser=bodyParser.urlencoded({extended: false});

const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/rest_api');

var db = mongoose.connection;

const GeoSchema=new mongoose.Schema ({
	type:{
		type:String,
		default:'Point'
	},
	coordinates:{
		type:[Number],
		index:'2dsphere'
	}
});

const PetrolPumpSchema=new mongoose.Schema({
	name:String,
	rank:String,
	available:Boolean,
	geometry:GeoSchema
});

const PetrolPump=mongoose.model('PetrolPump',PetrolPumpSchema,'PetrolPump');

app.get('/petrolpump/:lat/:long' , function(req,res){
	console.log('hey');
	const lat = parseFloat(req.params.lat);
	const long = parseFloat(req.params.long);
	PetrolPump.aggregate().near({
	   near: [long , lat],
	   maxDistance: 100000,
	   spherical: true,
	   distanceField: "dist.calculated"
	  })
	.then(function(data){
		console.log(data);
	        return(data);
	}).catch(function(err){
		console.log(err);
	});
});

app.listen('8080');

