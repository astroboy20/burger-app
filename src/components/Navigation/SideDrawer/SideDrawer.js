import React from "react";
import styles from './SideDrawer.module.css'
import Logo from "../../Logo/Logo";
import Aux from "../../../hoc/Auxillary";
import Backdrop from "../../UI/BackDrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";


const sideDrawer = (props) =>{
let attachedClasses =[styles.SideDrawer, styles.Close]
if (props.open){
    attachedClasses =[styles.SideDrawer, styles.Open]
}

    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
            <div className={styles.Logo}>
                <Logo height='11%'/> 
            </div>
           
            

            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
       
    )
}

export default sideDrawer