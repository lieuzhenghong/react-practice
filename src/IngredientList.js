// @flow
import * as React from 'react';
import { BowlDispatch, BowlStatus } from './App.js';

export function IngredientList(props: Object): React.Node {
    const ingredients = props.ingredients
    const ingredientItems = ingredients.map((ingredient) =>
        <Ingredient ingredient={ingredient} key={ingredient.id} />
    )
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
        dispatch({
            type: "changeAmount",
            id: props.ingredientId,
            amount: value,
        })
    }
    return (
        <div className="AmountSelector">
            <AmountSlider
                onChange={handleChange}
                ingredientId={props.ingredientId}
            />
        </div>
    )
}

function AmountSlider(props): React.Node {
    const bowl_stats = React.useContext(BowlStatus)
    const idx = bowl_stats.ingredients_ordered.findIndex(
        (e) => e.id === props.ingredientId
    )
    return (
        <input onChange={(e) => props.onChange(e.target.value)}
            type="range" min="0" max="500" step="10"
            value={bowl_stats.ingredients_ordered[idx].amount}
        ></input>
    )
}