const mongoose=require('mongoose')
const connectDB=async()=>{
try{
    await mongoose.connect('mongodb+srv://gulatibhavya30:swoXrxGh5rXGPxqF@cluster0.vxgogjg.mongodb.net/placementData')
    console.log('Connected to MongoDB') 
}
catch(error){
    console.log(error) 

}
}
module.exports=connectDB