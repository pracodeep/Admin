import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan';
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
import connectionToDB from './dbconnection.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';





//data import

import User from './models/User.js'

import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js'
import { dataUser,dataProduct,dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat } from './data/index.js';


 
// CONFIGURATION

dotenv.config();
const app=express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());

//ROUTES

app.use("/client",clientRoutes)
app.use("/general",generalRoutes)
app.use('/management',managementRoutes);
app.use('/sales',salesRoutes)


// MONGO SETUP
const PORT=process.env.PORT||5000

app.listen(PORT,async ()=>{

    // // Only add data one time 
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    //User.insertMany(dataUser)
    // Transaction.insertMany(dataTransaction)
   // OverallStat.insertMany(dataOverallStat)
   //AffiliateStat.insertMany(dataAffiliateStat)
    

    await connectionToDB()

   console.log(`app is running at http:localhost ${PORT}`)

})
