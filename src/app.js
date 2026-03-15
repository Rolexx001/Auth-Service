const express=require('express');
const app=express();
const cors=require('cors');
const helmet=require('helmet');
const cookieParser=require('cookie-parser');

const routes=require('./routes/index');
const errorHandler=require('./middlewares/error.middleware');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:5174',
    credentials: true
}));
app.use(helmet());

app.use('/api',routes);

app.get('/',(req,res)=>{
    res.send('Welcome to the API');
});
app.use(errorHandler);

module.exports=app;