import connectToDB from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async(req)=>{

  

  try {
    await connectToDB();
    // console.log("connection db done");
    const prompts = await Prompt.find({}).populate('creator');
    
    
    return new Response(JSON.stringify(prompts),{status:201}) 


  } catch (error) {
    return new Response("failed to fetch prompts",{status:500})
  }
}