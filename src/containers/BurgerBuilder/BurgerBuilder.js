import React, { Component } from 'react'
import Auxilliary from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import Build from '../../components/Burger/BuildControls/Build'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES ={
  salad:0.5,
  cheese:0.4,
  meat:1.3,
  bacon:0.3
}

export class BurgerBuilder extends Component {
  constructor(props){
    super(props)
      this.state={
        ingredients:{
          salad:0,
          bacon:0,
          cheese:0,
          meat:0

        },
        totalPrice:4,
        purchaseable:false,
        purchasing:false
      }
  }
  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
      .map(igKeys=>{
        return ingredients[igKeys]
      })
      .reduce((sum,el)=>{
        return sum + el
      },0)
    this.setState({
      purchaseable: sum > 0
    })
  }
  addIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({
      totalPrice: newPrice, 
      ingredients:updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceAddition
    this.setState({
      totalPrice: newPrice, 
      ingredients:updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients)
  }
  purchaseHandler = ()=>{
    this.setState({
      purchasing:true
    })
  }
  purchaseCancelHandler = ()=>{
    this.setState({
      purchasing:false
    })
  }
  purchaseContinueHandler = ()=>{
    alert('You Can Continue')
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0
    }
    return (
      <Auxilliary>
          <Modal show={this.state.purchasing} click={this.purchaseCancelHandler}>
            <OrderSummary 
              price={this.state.totalPrice}
              ingredients={this.state.ingredients}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}/>
          </Modal>
          <Burger ingredients={this.state.ingredients}/>
          <Build
            disabled={disabledInfo}
            ingredientAdded={this.addIngredientHandler} 
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            ordered = {this.purchaseHandler}
            purchaseable={this.state.purchaseable}/>
      </Auxilliary>
    )
  }
}

export default BurgerBuilder