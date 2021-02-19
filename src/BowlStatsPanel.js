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
    const newMacros = acc
    Object.keys(newMacros).forEach((macro, index) => {
      newMacros[macro] += INGREDIENTS[idx].macros[macro] * elem.amount
    })
    return newMacros
  }, initialMacros)
}


export function BowlStatsPanel(): React.Node {
  const bowlStats = React.useContext(BowlStatus)
  const bowlStatsRender = bowlStats.ingredients_ordered.map((elem) => {
    const i = INGREDIENTS.findIndex((e) => e.id === elem.id)
    return (
      <div key={elem.id}>
        {INGREDIENTS[i].name}: {elem.amount}g
      </div>)
  })
  const bowlMacros = getBowlMacros(bowlStats)
  const bowlMacrosRender = Object.keys(bowlMacros).map((macro) => {
    return (
      <div key={macro}>
        {macro} : {bowlMacros[macro].toFixed(2)}
      </div>
    )
  })
  const bowl_total = getBowlTotal(bowlStats)
  return (
    <div className="BowlStats">
      <p><b>Your Bowl:</b></p>
      {bowlStatsRender}
      <p><b> Macros: </b></p>
      {bowlMacrosRender}
      <b> Total: </b> ${bowl_total.toFixed(2)}
    </div>
  )
}