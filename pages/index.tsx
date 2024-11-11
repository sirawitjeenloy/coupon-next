import Head from 'next/head'
import { Skeleton, Typography } from 'antd'
import React from 'react'
import { useRouter } from 'next/router'


const {Text} = Typography

export default function Home() {
  const router = useRouter()
  
  React.useEffect(() => {
    router.push({pathname: '/coupon'})
  }, [router])
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '1vh'}}>
      <Skeleton />
    </div>
  )
}
