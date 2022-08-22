const express = require("express");
const bodyParser=require("body-parser");
const request=require("request");
const path = require('path');
const https=require("https");
const app = express();

app.use('*/css',express.static('public/css'));
app.use('*/images',express.static('public/images'));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
const firstName= req.body.fName;
const lastName= req.body.lName;
const email=req.body.email;

var data = {
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_field:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData=JSON.stringify(data);

const url="https://us10.api.mailchimp.com/3.0/lists/e3feb7211d";

const options={
  method:"POST",
  auth : "sthuthis7:4de43e8df2e33cfdc0802d2d24a92c0a-us10"
}

const request=https.request(url,options, function(response){

  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});




// API key
// 4de43e8df2e33cfdc0802d2d24a92c0a-us10

//List // ID
// e3feb7211d
