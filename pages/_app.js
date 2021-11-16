import '../styles/globals.css'
import React from 'react'
import Auth from '@/components/auth/auth'


function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = React.useState(false)


  return (
    <>  
      {auth ?  <Component {...pageProps} /> : <Auth setAuth={setAuth} auth={auth}/> }
    </>
 
  )
}

export default MyApp
