// next auth works simultaneously looking at frontend side as well as at the backend side 

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import connectToDB from '@utils/database';

// console.log({
//   clientId:process.env.GOOGLE_ID,
//   clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  
// }
// );
// console.log("this is blah blah");

const handler = NextAuth({
  providers:[
    GoogleProvider({
      clientId:process.env.GOOGLE_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  // session callback fn
  callbacks:{
  async session({session}){
    // store thr user id from MongoDB to session
    const sessionUser = await User.findOne({
      email:session.user.email
    })
    session.user.id = sessionUser._id.toString();
    return session;
  },
  
  // sign in function - get the profile
  async signIn({profile}){
      try{
        //serverless -> lambda -> dynamodb 
        await connectToDB();
        // check if user already exist 
          const userExist = await User.findOne({
            email: profile.email
          });
          

        // if not create a new user 
        if(!userExist){
          await User.create({
            email:profile.email,
            username:profile.name.replace(" ","").toLowerCase(),
            image:profile.picture
          })
        }

        return true;
      }
      catch(error){
        console.log(error);
        return false;
      }
    },
  }
})

export {handler as GET, handler as POST};






