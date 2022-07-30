import React from "react";
import Auxilliary from '../../hoc/Auxillary'
import styles from './Layout.module.css'
import Toolbar from "../Navigation/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class layout extends React.Component{
    state = {
        showSideDrawer:true
    }

    sideDrawerClosedHandler = ()=>{
        this.setState({
            showSideDrawer:false
        })
    }

    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }


    render(){
        return(
            <Auxilliary >
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Auxilliary>
       
        )
    }
    
}

export default layout