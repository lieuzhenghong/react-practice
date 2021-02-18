// @flow
import logo from './logo.svg';
import './App.css';
import * as React from 'react';

const INGREDIENTS = [
  {
    id: 1,
    name: "Chestnut Brown Rice",
    type: "carb",
    description: "Brown rice toasted to a nutty perfection",
    macros: {
      "calories": 1.11,
      "protein": 0.026,
      "fat": 0.009
    },
    price: 0.02
  },
  {
    id: 2,
    name: "Free Range Fusilli",
    type: "carb",
    description: "Fusilli that was allowed to roam free during its lifetime",
    macros: {
      "calories": 1.58,
      "protein": 0.06,
      "fat": 0.009
    },
    price: 0.015
  },
  {
    id: 11,
    name: "Sous-vide Chicken Breast",
    type: "protein",
    description: "Chicken breast gently coaxed to doneness so it stays tender and moist",
    macros: {
      "calories": 1.65,
      "protein": 0.31,
      "fat": 0.05
    },
    price: 0.035
  },
]

const initialState = {
  ingredients_ordered: [
    {
      id: 1,
      amount: 0
    },
    {
      id: 2,
      amount: 0
    },
    {
      id: 11,
      amount: 0
    },
  ],
}



function IngredientList(props): React.Node {
  const ingredients = props.ingredients
  const ingredientItems = ingredients.map((ingredient) => <Ingredient ingredient={ingredient} key={ingredient.id} />)
  return (
    <div className="IngredientList">
      {ingredientItems}
    </div>
  )
}

function Ingredient(props): React.Node {
  return (
    <div className="Ingredient">
      <b> {props.ingredient.id} {props.ingredient.name} </b>
      {props.ingredient.description}
      <AmountSelector ingredientId={props.ingredient.id} />
    </div>
  )
}



function AmountSelector(props): React.Node {
  const dispatch = React.useContext(BowlDispatch)
  function handleChange(value) {
    console.log("Am I called?", value)
    dispatch({
      type: "changeAmount",
      id: props.ingredientId,
      amount: value,
    })
  }
  return (
    <div className="AmountSelector">
      <AmountSlider onChange={handleChange} ingredientId={props.ingredientId} />
    </div>
  )
}

function AmountSlider(props): React.Node {
  const bowl_stats = React.useContext(BowlStatus)
  const idx = bowl_stats.ingredients_ordered.findIndex((e) => e.id === props.ingredientId)
  return (
    <input onChange={(e) => props.onChange(e.target.value)}
      type="range" min="0" max="500" step="10"
      value={bowl_stats.ingredients_ordered[idx].amount}
    ></input>
  )
}


const BowlDispatch = React.createContext(null);
const BowlStatus = React.createContext(initialState);

function getBowlTotal(state) {
  return state.ingredients_ordered.reduce((acc, elem) => {
    const idx = INGREDIENTS.findIndex((e) => e.id === elem.id)
    return acc + INGREDIENTS[idx].price * elem.amount
  }, 0)
}

function reduce(state, action) {
  switch (action.type) {
    case 'changeAmount':
      const newIngredients = state.ingredients_ordered
      // if id not in ingredients_ordered
      // otherwise, update 
      const indexToMutate = newIngredients.findIndex((ele) => ele.id === action.id)
      newIngredients[indexToMutate].amount = action.amount
      return { ingredients_ordered: newIngredients }
    default:
      throw new Error();
  }
}

function BowlStats(): React.Node {
  const bowl_stats = React.useContext(BowlStatus)
  const bowl_ingredients = bowl_stats.ingredients_ordered.map((elem) => {
    const i = INGREDIENTS.findIndex((e) => e.id === elem.id)
    return (
      <div key={elem.id}>
        {INGREDIENTS[i].name}: {elem.amount}g
      </div>)
  })
  const bowl_total = getBowlTotal(bowl_stats)
  return (
    <div className="BowlStats">
      <p><b>Your Bowl:</b></p>
      {bowl_ingredients}
      <b> Total: </b> ${bowl_total.toFixed(2)}
    </div>
  )
}

function App(): React.Node {
  const [state, dispatch] = React.useReducer(reduce, initialState)
  return (
    <div className="App" >
      <h2>Bowls to the Gram</h2>
      <p> Build your own bowl and get exactly the macros you need</p>
      <BowlDispatch.Provider value={dispatch} >
        <IngredientList ingredients={INGREDIENTS} />
        <BowlStatus.Provider value={state} >
          <BowlStats />
        </BowlStatus.Provider>
      </BowlDispatch.Provider>
    </div >
  );
}

export default App;
