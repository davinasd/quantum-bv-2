// used to connect to db 
const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false; // track the connection 

const connectToDB = async () =>{
  mongoose.set('strictQuery',true);

  if(isConnected){
    console.log(" MongoDB is connected already");
    return;
  }
  else{
    try {
      await mongoose.connect("mongodb+srv://adhithi_m:qFWDGvAnaj4TfQca@atlascluster.odf9wo2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster",{
        dbName:"share_prompt",
        useNewUrlParser:true,
        useUnifiedTopology : true,
      })
      isConnected = true;
      console.log('MongoDB connected')
    } catch (error) {
      console.log(error);
    }
  }
}
// connectToDB();
export default connectToDB;