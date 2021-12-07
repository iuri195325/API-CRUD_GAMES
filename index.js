const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var BD = {

    games: [
        {
            id: 1,
            title: "minecraft",
            year: 2009,
            price: 100,
        },
        {
            id: 2,
            title: "fifa",
            year: 2005,
            price: 150,
        },
        {
            id: 3,
            title: "cod",
            year: 2005,
            price: 70,
        },

    ]
}

app.get('/games', (req, res)=>{
    res.statusCode = 200;
    res.json(BD.games);
});
app.get('/game/:id', (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = BD.games.find(g => g.id == id);
        if(game != undefined){
            res.statusCode = 200;
            res.json(game);

        }else{
            res.sendStatus(404);
        }
    }
});
app.post('/game', (req, res) =>{
    var {title,id,year,price} = req.body;
    BD.games.push({
        id,
        title,
        year,
        price 
    });
    res.sendStatus(200);
});

app.listen(8181,()=>{
    console.log('listening on');
});