import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  //Api Authentication id and key from edamam.com
  const APP_ID = "3986fc3b";
  const APP_KEY = "82c08ec9b5615a603700b6c47301a62e";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
   
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    //Search form
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder='What do you want to eat..?' value={search} onChange={updateSearch} /> 
        <button className="search-button" type="submit">Search</button>
      </form>
      
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          dietLabels={recipe.recipe.dietLabels}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
        </div>
    </div>
  );
};

export default App;
