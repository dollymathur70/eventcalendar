const express = require('express');
const index = require('./routes/index');
const app = express();
const path = require('path');
const db = require('./db.js');
const bodyparser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/', index.router);
app.use('/',express.static(__dirname + '/public'));

app.post('/addevent',function(req,res){

    var obj = {
      s : req.body.s,
      d : req.body.d,
      m : req.body.m,
      y : req.body.y,
      e : req.body.e
    }
    db.addevent(obj,function(data){
      res.send('done');
    })
})

app.get('/showevent',function (req,res) {
    db.showevent(function (data) {
        res.send(data);
    })
});

app.post('/delete',function (req,res) {
    db.delete_event({s:req.body.s},function (data) {
        res.send(data);
    })
})

app.listen(5060, () => {
    console.log("server is running on port 5060");
});
