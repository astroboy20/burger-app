import React, { Component } from "react";
import styles from './Modal.module.css'
import Aux from '../../../hoc/Auxillary'
import Backdrop from '../BackDrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }
    render(){
        return (
            <Aux>
                <Backdrop show ={this.props.show} clicked={this.props.click}/>
                <div 
                    style={{
                        transform: this.props.show  ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity : this.props.show ? '1' : '0' 
                    }}
                    className={styles.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
    
}

export default Modal