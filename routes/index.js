var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req,res) {
	res.render('helloworld', {title: 'Hello,World!' })
});

router.get('/userlist' , function(req,res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs) {
		res.render('userlist' , {
			"userlist" : docs
		});
	});
});

/*GET new user page */
router.get('/newuser' ,function(req,res) {
	res.render('newuser', {title: 'Add new user'});
});

/* POST to Add user to db */
router.post('/adduser', function(req,res) {

	var db = req.db;

	var userName = req.body.username;
	var userEmail = req.body.useremail;

    console.log("username = " + userName + " email = "+ userEmail);
	var collection = db.get('usercollection');

	collection.insert({
		"username" : userName,
		"emailId" : userEmail
	}, function(err, doc) {
		if(err){
			console.log("error" + err );
			res.send("Some problem");
		}
		else {
			console.log("success" + doc);
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});

module.exports = router;
