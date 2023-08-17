import  express from 'express' ;
import coluers from 'colors';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './db.js';
import authroute from "./routes/Authroute.js"
import Product from './routes/Productroute.js';
import Categouryrout from './routes/Categouryrout.js';
import  cors from "cors"
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json())
const url="mongodb+srv://kamyabhusain2003:user123@cluster0.opistba.mongodb.net/ecomerse";

app.get("/",(req,res)=>{
    res.send({
        message:"welcome to ecomerce app"
    })
})
app.use("/api/auth",authroute)
app.use("/api/cat",Categouryrout)
app.use("/api/product",Product)
const port = process.env.port
app.listen(port,()=>{
    console.log("server running on 9000".bgCyan.white)
})