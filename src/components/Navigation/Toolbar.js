import React from "react";
import styles from './Toolbar.module.css'
import Logo from "../Logo/Logo";
import DrawToggle from "./SideDrawer/DrawerToggle/DrawToggle";
import NavigationItems from "./NavigationItems/NavigationItems";
const toolbar = (props) =>{
    return(
        <header className={styles.Toolbar}>
           <DrawToggle clicked={props.drawerToggleClicked}/>
            <div className={styles.Logo}>
                <Logo/>
            </div>
            
            <nav className={styles.DesktopOnly}>
               <NavigationItems/>
            </nav>
        </header>
    )
}

export default toolbar