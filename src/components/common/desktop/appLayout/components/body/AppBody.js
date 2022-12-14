import React from 'react'

const AppBody = (props) => {
  const {Component}= props
  return (
    <main className='main'>
      <Component {...props}/>
    </main>
  )
}

export default AppBody