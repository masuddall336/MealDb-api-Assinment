function calls() {
    const takeInput = document.getElementById("name_input").value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${takeInput}`
    const parentDiv = document.getElementById("parentDiv");
    const mealIngredientsHere = document.getElementById("strIngredient");
    if (takeInput) {
        parentDiv.innerText = ``;
        mealIngredientsHere.innerText = ``;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                inner(data);
            })
    } else {
        parentDiv.innerText = "Type your meal first...";
        mealIngredientsHere.innerText = ``;
        parentDiv.style.fontWeight = "bold";
        parentDiv.style.fontSize = "20px";
    }
}


const inner = params => {
    const takeData = params.meals;
    const parent = document.getElementById("parentDiv");
    if (takeData) {

        takeData.forEach(data => {
            const takeName = data.strMeal;
            const takeImg = data.strMealThumb;
            const takeId = data.idMeal;


            const div = document.createElement("div");
            const div2 = document.createElement("div");
            const img = `
                <img class = "img-fluid img" src = "${takeImg}"/>
                <h2>${takeName}</h2>

            `

            div2.addEventListener("click", function () {
                takeMealId(takeId);
            })


            div.classList.add("mb-5")
            div2.classList.add("mealImageAndName");
            div.classList.add("col-md-3");
            div2.innerHTML = img;
            div.appendChild(div2);
            parent.appendChild(div);
        })
    } else {
        parent.innerText = "invalid your meal name";
        parent.style.fontWeight = "bold";
    }
}


let takeMealId = params => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params}`)
        .then(res => res.json())
        .then(data => {
            Ingredients(data);
        })
}


let Ingredients = (params) => {
    document.getElementById("strIngredient").innerHTML = `
    <img class = "image" src ="${params.meals[0].strMealThumb}"/>
    <h1>${params.meals[0].strMeal}</h1>
    <h3>Ingredients:</h3>
    <h4>${params.meals[0].strIngredient1}</h4>
    <h4>${params.meals[0].strIngredient10}</h4>
    <h4>${params.meals[0].strIngredient11}</h4>
    <h4>${params.meals[0].strIngredient12}</h4>
    <h4>${params.meals[0].strIngredient13}</h4>
`
}