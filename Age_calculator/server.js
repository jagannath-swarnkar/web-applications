var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "views/Agecalculator.html" );  
})  
app.post('/index.html/process_post', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format  
   var a = {  
       day:req.body.day,  
       month:req.body.month,
       year:req.body.year,
   	   C_day:req.body.C_day,  
       C_month:req.body.C_month,
       C_year:req.body.C_year  
   }
   var month_days = [31,28,31,30,31,30,31,31,30,31,30,31]


function year_days(year){
    let x=365;
    let y=366;
    if(year%4==0){
        return y; 
    }else{
        return x;
    }
}


var total_days = 0;
var days_left = 0;
var more_days = 0;

for(var i=month_days.length-1; i>a.month; i--){
    days_left+=month_days[i]
}
if(a.month>=1 && a.year%4==0){
    var m=month_days[a.month]+1;
    days_left+=(m-parseInt(a.day));
}else{
    var m=month_days[a.month];
    days_left+=(m-parseInt(a.day));
}

var year_count = 0;
var year = parseInt(a.year)+1
for (var j=year; j<a.C_year; j++){
    total_days+=year_days(j)
    year_count+=1
}

for(var k=0; k<a.C_month; k++){
    more_days+=month_days[k]
}
if(a.C_month>=1 && a.C_year%4==0){
    more_days+=parseInt(a.C_day)
    more_days+=1
}else{
    more_days+=parseInt(a.C_day)
}

//........calculation for days count............
total_days = total_days+days_left+more_days

// ........calculation for year-month-day count...........E-extra,L-left

var EY = year_count + Math.floor((days_left+more_days)/365);
var LD = (days_left+more_days)%365;
var EM = Math.floor(LD/30)
var ED = LD%30
	
	res.render(__dirname + '/views/Agecalculator.html',{year:EY, month:EM,day:ED});
   	// res.send(EY) 
})  






// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
