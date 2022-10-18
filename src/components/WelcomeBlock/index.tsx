import React from 'react'
import s from './WelcomeBlock.module.scss'
import background from './welcomeBlock.jpg'

export const WelcomeBlock = () => {
  return (
    <div className={s.welcomeBlock}>
        <h2>Test assignment for front-end developer</h2>
        <h5>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</h5>
    </div>
  )
}
