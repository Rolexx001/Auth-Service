

const app=require('./app');
const {port}=require('./config/index');
const connectDB=require('./config/db');


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    });
});