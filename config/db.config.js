const mongoose=require('mongoose');

const connectedToDb= async (url)=>{
    try {  await mongoose.connect(url)
        console.log("Connected to DB");
        }
        catch(e){
            console.log("Not connected with error "+e);
        }
}

module.exports=connectedToDb;