const express=require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

app=express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost:27017/EMP');
const Emp = mongoose.model('employees', new mongoose.Schema({ 
    eid:Number, name:String , designation:String, deptid:Number}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/main.html");
});

app.post("/add", (req, res) => {
    console.log("Added Record...")
    console.log(req.body);
    new Emp({eid:req.body.id, name:req.body.name,
        designation:req.body.designation, deptid:req.body.dept}).save()
    res.redirect("/")
});

app.post("/view", (req, res) => {
    query = {}
    if(req.body.id != ""){
        query.eid = req.body.id;
    }
    if(req.body.name != ""){
        query.name = req.body.name;
    }
    if(req.body.designation != ""){
        query.designation = req.body.designation;
    }
    if(req.body.dept != ""){
        query.deptid = req.body.dept;
    }
    console.log(query);
    Emp.find(query, (err, emp) => {
        console.log("View results...")
        console.log(emp);
        res.send(emp);
    });
})

app.post("/delete", (req, res) => {
    query = {}
    if(req.body.id != ""){
        query.eid = req.body.id;
    }
    if(req.body.name != ""){
        query.name = req.body.name;
    }
    if(req.body.designation != ""){
        query.designation = req.body.designation;
    }
    if(req.body.dept != ""){
        query.deptid = req.body.dept;
    }
    console.log(query);
    Emp.deleteMany(query, (err, emp) => {
        console.log("Delete results...")
        console.log(emp);
        res.send(emp);
    });
})

app.post("/update", (req, res) => {
    fquery = {}
    if(req.body.fid != ""){
        fquery.eid = {$eq:req.body.fid};
    }
    if(req.body.fname != ""){
        fquery.name = {$eq:req.body.fname};
    }
    if(req.body.fdesignation != ""){
        fquery.designation = {$eq:req.body.fdesignation};
    }
    if(req.body.fdept != ""){
        fquery.deptid = {$eq:req.body.fdept};
    }

    rquery = {}
    if(req.body.rid != ""){
        rquery.eid = req.body.rid;
    }
    if(req.body.rname != ""){
        rquery.name = req.body.rname;
    }
    if(req.body.rdesignation != ""){
        rquery.designation = req.body.rdesignation;
    }
    if(req.body.rdept != ""){
        rquery.deptid = req.body.rdept;
    } 
    
    Emp.updateMany(fquery, rquery, (err, emp) => {
        console.log(fquery)
        console.log(rquery)
        console.log("Update results...")
        console.log(emp);
        res.send(emp);
    })
})

app.listen(8000,function(){
    console.log("Server running at port 8000...");
});