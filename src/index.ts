import express,{Request,Response,Express} from 'express'
import passport from 'passport';
import {config} from 'dotenv'
require('./auth');
config();

const port = process.env.PORT || 3000;
import session from 'express-session';
const app = express();

app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/',(req:Request,res:Response) => {
    res.send(
        '<a href="/auth/google">Authenticate with google</a>'
    )
})

app.get('/auth/google',passport.authenticate('google',{ scope:['email','profile'] }))

app.get('/google/callback',passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect: '/'
}))

app.get('/auth/fail',(req:Request,res:Response) => {
    res.send('auth failed')
})

app.get('/protected',(req:Request,res:Response) => {
    res.send(req.user)
})

app.listen(port,() => console.log('server started'))