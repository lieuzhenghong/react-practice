// @flow
import * as React from 'react';
import { INGREDIENTS, BowlDispatch, BowlStatus } from './App.js';

function getBowlTotal(state): Number {
  // Helper function to calculate the total cost of the bowl
  return state.ingredients_ordered.reduce((acc, elem) => {
    const idx = INGREDIENTS.findIndex((e) => e.id === elem.id)
    return acc + INGREDIENTS[idx].price * elem.amount
  }, 0)
}

function getBowlMacros(state) {
  // Helper function to calculate the total macros of a bowl
  const initialMacros = {
    "calories": 0,
    "protein": 0,
    "fat": 0
  }
  return state.ingredients_ordered.reduce((acc, elem) => {
    const idx = INGREDIENTS.findIndex((e) => e.id === elem.id)
    const new_acc = acc
    Object.keys(new_acc).forEach((macro, index) => {
      new_acc[macro] += INGREDIENTS[idx].macros[macro] * elem.amount
    })
    console.log(new_acc)
    return new_acc
  }, initialMacros)
}


export function BowlStatsPanel(): React.Node {
  const bowl_stats = React.useContext(BowlStatus)
  const bowl_ingredients = bowl_stats.ingredients_ordered.map((elem) => {
    const i = INGREDIENTS.findIndex((e) => e.id === elem.id)
    return (
      <div key={elem.id}>
        {INGREDIENTS[i].name}: {elem.amount}g
      </div>)
  })
  const bowl_macros = getBowlMacros(bowl_stats)
  const bowl_macros_render = Object.keys(bowl_macros).map((macro) => {
    return (
      <div key={macro}>
        {macro} : {bowl_macros[macro].toFixed(2)}
      </div>
    )
  })
  const bowl_total = getBowlTotal(bowl_stats)
  return (
    <div className="BowlStats">
      <p><b>Your Bowl:</b></p>
      {bowl_ingredients}
      <p><b> Macros: </b></p>
      {bowl_macros_render}
      <b> Total: </b> ${bowl_total.toFixed(2)}
    </div>
  )
}