import React from "react"
import styles from './BuildControl.module.css'

const buildControl = (props) =>{
   return(
    <div className={styles.BuildControl}>
        <div className={styles.Label}>
            {props.label}
        </div>
        <button 
            disabled={props.disabled} 
            className={styles.Less} 
            onClick={props.removed}>Less</button>
        <button 
            className={styles.More} 
            onClick={props.added}>More</button>
    </div>
   )
}

export default buildControl