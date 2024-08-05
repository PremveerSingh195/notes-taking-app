"use client"
import React, { useState , useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'



function page() {
const router = useRouter()
   const [user , setUser] = useState({
    email:"",
    password:"",
    username : ""
   })

   const [buttonDisabled , setButtonDisabled] = useState(false)

   const [loading , setLoading] = useState(false)

   const onSignup = async () => {
    try {
      setLoading (true)
     const response =  await axios.post("/api/user/signup" , user)

     console.log("Signup success" , response.data);
    
     router.push('/login')

    } catch (error : any) {
      console.log("signup failed");
      toast.error(error.message)
    }
   }

   useEffect(()=> {
        if (user.email.length > 0 && user.password.length > 0 && user.password.length > 0 && user.username.length > 0)  {
          setButtonDisabled(false)
        } else {
          setButtonDisabled(true)
        }
     } , [user])

  return (
    <div className='bg-slate-400 w-screen h-screen flex justify-center items-center '>
        <div className='bg-blue-500 h-auto w-auto'>
        </div>
    </div>
  )
}

export default page