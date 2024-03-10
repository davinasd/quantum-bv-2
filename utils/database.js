// used to connect to db 
import mongoose from "mongoose";

let isConnected = false; // track the connection 

const connectToDB = async () =>{
  mongoose.set('strictQuery',true);

  if(isConnected){
    console.log(" MongoDB is connected already");
    return;
  }
  else{
    try {
      await mongoose.connect(process.env.MONGODB_URI,{
        dbName:share_prompt,
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

export default connectToDB;