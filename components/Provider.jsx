"use client";

// used mainly to authenticate , with the help of google next auth 


import {SessionProvider} from 'next-auth/react'

// children and session got through props
const Provider = ({children , session}) => {
  return (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
  )
}

export default Provider
