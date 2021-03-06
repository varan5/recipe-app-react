import React, { useEffect, useState } from 'react'
import './App.css';
import Recipe from './Recipe'

const App = () => {
  const APP_ID = '4a3b9279'
  const APP_KEY = '44a4b0e025205e0643675a17e0a25a5b'

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  const exampleRequest = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`

  useEffect(() => {
    getRecipies()
  }, [query])

  const getRecipies = async () => {
    const response = await fetch(exampleRequest)
    const data = await response.json()
    setRecipes(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />  
        ))}
      </div>
    </div>
  )
}
  
export default App;
