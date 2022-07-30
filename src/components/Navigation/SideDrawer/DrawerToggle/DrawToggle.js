import React from 'react'
import styles from './DrawToggle.module.css'
const drawToggle=(props)=> {
  return (
    <div onClick={props.clicked} className={styles.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default drawToggle