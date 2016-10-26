var express = require('express');
var router = express.Router();
var rp = require('request-promise');

router.get('/', function (req, res) {
  res.render('index');
});


// Example route: Passing data into a page
router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name' : 'Foo' });
});

// add your routes here
router.post(/address-postcode$/, function (req, res) {
  rp({
    uri: 'https://address-lookup.herokuapp.com/addresses',
    qs: { postcode: req.body.postcode },
    json: true
  })
  .then(function (body) {

    if(body.error === null) {
      var url = req.url.substring(1, req.url.lastIndexOf('/')) + '/address-select';
      res.render(url, { results: body.results }, function(err, html) { res.send(html); });
    } else {
      console.log('then error');
    }
  })
  .catch(function (error) {

    var msg = (error.error) ? error.error.error.message : "Sorry, we couldn't find that postcode";
    res.render(req.url.substring(1), {addressError: msg, postcode: req.body.postcode}, function(err, html) { res.send(html); });
  });

});

router.post(/address-confirm$/, function (req, res) {

  var a = req.body.number.split(',');
  res.render(req.url.substring(1), { address1: a[0], address2: a[1], address3: a[2], postcode: a[3] }, function(err, html) { res.send(html); });
});

// micro service routes
router.get('/micro-service/look-up-an-address/confirm-address', function (req, res) {

   var number = req.query.number;
   console.log(number);

   if (number == "false"){
     res.redirect("/micro-service/look-up-an-address/manual-address");
   } else {
     res.render('micro-service/look-up-an-address/confirm-address', { 'number' : number });
   }

 });

module.exports = router;
