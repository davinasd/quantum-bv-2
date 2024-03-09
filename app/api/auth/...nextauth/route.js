// next auth works simultaneously looking at frontend side as well as at the backend side 

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


const handler = NextAuth({
  providers:[
    GoogleProvider({
      clientId:'',
      clientSecret:'',
    })
  ],
  // session callback fn
  async session({session}){

  },
  // sign in function - get the profile
  async signIn({profile}){

  }
})

export {handler as GET, handler as POST};