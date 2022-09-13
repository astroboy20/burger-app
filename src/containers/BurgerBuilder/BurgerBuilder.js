import React, { Component } from 'react'
import Auxilliary from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import Build from '../../components/Burger/BuildControls/Build'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'
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
        ingredients:null,
        totalPrice:4,
        purchaseable:false,
        purchasing:false,
        loading:false
      }
  }

  componentDidMount(){
    axios.get('https://buger-app-fccb4-default-rtdb.firebaseio.com/ingredient.json')
    .then(res=>{
      this.setState({ingredients: res.data})

    })
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
    // alert('You Can Continue')
    const order ={
      ingredient: this.state.ingredients,
      price:this.state.totalPrice,
      customer: {
        name:'tolu',
        address:{
          street:'NorthGate',
          zipCode: '351101',
          country:'Nigeria'
        }, email: 'test@test.com'
      },
      deliveryMethod:'fastest'
    }

    axios.post('/order.json',order)
    .then(response=>{
      this.setState({loading:false, purchasing:false})
    })
    .catch(error=>{
    this.setState({loading:false, purchasing:false})
    })


  }

 
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary = null
    let burger = this.state.error ?<p>Ingredients can't be loaded!</p> : <Spinner/>

    if (this.state.ingredients){
      burger = (
        <Auxilliary>
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
      orderSummary = <OrderSummary 
      price={this.state.totalPrice}
      ingredients={this.state.ingredients}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}/>
    }

    if (this.state.loading){
      orderSummary = <Spinner/>
    } 

     
    return (
      <Auxilliary>
          <Modal show={this.state.purchasing} click={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
      </Auxilliary>
    )
  }
}

export default withErrorHandler(BurgerBuilder,axios)