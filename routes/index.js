var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.session);
    //req.session.testUserName = "Jeffrey";
    //req.session.testEmail = "jeffrey@email.com"
    res.render('index', {
        title: 'Express',
        userName: req.session.username,
        email: req.session.email
    });
});

router.post("/", function (req, res) {
    req.session.username = req.body.username;
    req.session.email = req.body.email;
    res.redirect("/");
});

module.exports = router;
