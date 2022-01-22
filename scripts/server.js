const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
let currentLoggedUser = '';

const INDEX_ADDRESS = '/Users/vladislavgoteiner/Desktop/Sing-up Baby/';

app.listen(3000,()=>{
    console.log("The server is up and running !");
});

app.use(express.static(INDEX_ADDRESS));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.text({extended: true}));

app.get('/',(req,res)=>{
    res.sendFile(INDEX_ADDRESS+'index.html');
});


app.post('/signingUp',(req,res) => {
    let db = JSON.parse(fs.readFileSync('./data/database.json','utf-8'));
    const newUser = req.body;
    db.push(newUser);
    const dbStringified = JSON.stringify(db);
    fs.writeFileSync('./data/database.json',dbStringified,'utf-8');
    res.send('OK');
});

app.post('/logingIn',(req,res) => {
    let db = JSON.parse(fs.readFileSync('./data/database.json','utf-8'));
    const newUser = req.body;
    const realUser = db.find((user)=>{
        if(user.email === newUser.email && user.password === newUser.password){
            return user;
        }
    });
    if(realUser){
        currentLoggedUser = realUser;
        res.send(JSON.stringify(realUser));
    }else{
        res.send('');
    }
});

app.post('/logingOut',(req,res) => {
    currentLoggedUser = '';
});