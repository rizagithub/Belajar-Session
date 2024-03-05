import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

const app=express()
const PORT=3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use(
    session({
        secret : "secret",
        resave : false,
        saveUninitialized : true,
        cookie : {
            secure : true,
            httpOnly : true,
            maxAge : 60000
        }
    })
)

app.get('/login', (req,res)=>{
    console.log(res.sessionID);
    const {username, password} = req.body;

    if(username && password){
        if(req.session.authenticated){
            res.json(req.session)
        }else{
            if(password==="1234"){
                req.session.authenticated=true;
                req.session.user={
                    username,password
                }
                res.json(req.session)
            }else{
                res.status(401).json({
                  msg:"Bad Request"  
                })
            }
        }

    }else{
        res.status(403).json({
            msg:"Bad Credential"
        })
    }

});

app.listen(PORT,()=>{
    console.log(`App Running On http://localhost:${PORT}`)
});