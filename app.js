const { log } = require('console');
const express = require ('express');

const app = express();
const path = require('path');
const port = 3500;

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'./public')))


app.get('^/$|/index(.html)?', (req,res)=>{
   res.sendFile(path.join(__dirname, 'public','index.html'))
});

app.get('/product(.html)?' , (req,res) =>{
    res.sendFile(path.join(__dirname, 'public','product.html'));
});

app.get('/new-product(.html)?' , (req,res) =>{
    res.redirect(301, 'product.html');
});
 

app.get('/hello(.html)?' ,(req,res, next)=>{
    console.log('view hello.html page');
    next();
} , (req,res) =>{
    res.send('hai hello.html');
})




const one = (res,req,next) =>{
    console.log('one');
    next();
}
const two = (req,res,next) =>{
    console.log('two');
    next();
}
const three = (req,res ) =>{
    console.log('three');
    res.send('fineshed');
}

app.get('/chain(.html)?', [one,two,three])
//error url find 
app.get('/*' , (req,res) =>{
    res.status(404).sendFile(path.join(__dirname,'public', '404.html'));
});

app.listen (port ,() => console.log ("server running on port 3500"));


