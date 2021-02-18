// @flow
import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { IngredientList } from './IngredientList.js';
import { BowlStatsPanel } from './BowlStatsPanel.js';

export const INGREDIENTS = [
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
    description: "Whole-wheat fusilli that was allowed to roam free during its lifetime",
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

export const BowlDispatch = React.createContext(null);
export const BowlStatus = React.createContext(initialState);

function updateState(state, action) {
  // Reduce function called by useReducer Hook in App
  switch (action.type) {
    case 'changeAmount':
      const newIngredients = state.ingredients_ordered
      // if id not in ingredients_ordered
      // otherwise, update 
      const indexToMutate = newIngredients.findIndex((ele) => ele.id === action.id)
      // note that this will bung up if indexToMutate finds -1
      // [FIXME] fix this 
      newIngredients[indexToMutate].amount = action.amount
      return { ingredients_ordered: newIngredients }
    default:
      throw new Error();
  }
}

function App(): React.Node {
  const [state, dispatch] = React.useReducer(updateState, initialState)
  return (
    <div className="App" >
      <h2>Bowls to the Gram</h2>
      <p> Build your own bowl and get exactly the macros you need</p>
      <BowlDispatch.Provider value={dispatch} >
        <IngredientList ingredients={INGREDIENTS} />
        <BowlStatus.Provider value={state} >
          <BowlStatsPanel />
        </BowlStatus.Provider>
      </BowlDispatch.Provider>
    </div >
  );
}

export default App;