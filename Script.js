let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let userInput = document.getElementById("user-input");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function handleSearch() {
    let userTnput = userInput.value;
    if (userTnput.length == 0) {
        result.innerHTML = `<h3>Enter a dish name</h3>`;
    } else{
        fetch(url + userTnput).then(response => response.json()).then((data) => {
            let myMeal = data.meals[0];
            let count = 1;
            let ingredients = [];
            for(let i in myMeal){
                let ingredient = "";
                let measure = "";
                if(i.startsWith("strIngredient") && myMeal[i]){
                    ingredient = myMeal[i];
                    measure = myMeal[`strMeasure` + count];
                    count += 1;
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
            result.innerHTML = `<img src = ${myMeal.strMealThumb}> 
            <div class = "details">
            <h2>${myMeal.strMeal}</h2>
            <h4>${myMeal.strArea}</h4>
            </div>
            <div id="ingredient-con"></div>
            <div id="recipe">
                <button id="hide-recipe">X</button>
                <pre id="Instructions">${myMeal.strInstructions}</pre>
            </div>
            <button id="show-recipe">View Recipe</button>`;
            let ingredientCon = document.getElementById("ingredient-con");
            let parent = document.createElement("ul");
            let recipe = document.getElementById("recipe");
            let hideRecipe = document.getElementById("hide-recipe");
            let showRecipe = document.getElementById("show-recipe");
        
            ingredients.forEach((i) => {
                let child = document.createElement("li");
                child.innerText = i;
                parent.appendChild(child);
                ingredientCon.appendChild(parent);
            });
        
            hideRecipe.addEventListener("click", () => {
                recipe.style.display = "none";
            });
            showRecipe.addEventListener("click", () => {
                recipe.style.display = "block";
            });
        }).catch(() => {
            result.innerHTML = `<h3>No results found</h3>`;
        });
    }
}

searchBtn.addEventListener("click", handleSearch);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});


