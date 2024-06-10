import User from '../models/User.js'
import OverallStat from "../models/OverallStat.js"
import Transaction from '../models/Transaction.js';

export const getUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(201).json(user)

    }catch(error){
    res.status(404)
    .json({message:error.message})
    }

};

export const  getDashboardStats=async (req,res)=>{
    try {

        //hardcoded values
        const currentMonth="November";

        const currentYear=2021;
        const currentDay="2021-11-15";

        // recent transaction

        const transactions=await Transaction.find().limit(50).sort({createdOn:-1})

        //Overall stat
        const overallstat=await OverallStat.find({year:currentYear})

const {
    totalCustomers,
    yearlyTotalSoldUnits,
    monthlyData,
    salesByCategory

}=overallstat[0]

const thisMonthStats=overallstat[0].monthlyData.find(({month})=>{
    return month==currentMonth;
});

const todayStats=overallstat[0].todayData.find(({month})=>{
    return date===currentDay
});

res.status(200).json({
    totalCustomers,
    yearlyTotalSoldUnits,
    monthlyData,
    salesByCategory,
    thisMonthStats,
    todayStats,
    transactions


})


        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}