//PHASE 1 PROJECT

//Fetched URLS
const search = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const randomDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
const categories = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'

document.addEventListener('DOMContentLoaded',()=> {

  //Data
  const loginForm = document.getElementById('login-form')
  const header = document.getElementById('header')
  const mainDetails = document.getElementById('main')
  const abtEl = document.getElementById('Aboutinfo')
  const abouttag = document.getElementById("abttag")
  const mainContainer = document.getElementById('main-container')
  const randomDrinkRow = document.getElementById('main-container')
  const categoriesLink = document.getElementById('category-link')
  const drinksCategoryRow = document.getElementById('drink-category')
  const searchForm = document.getElementById('search-form')
  const searchRow = document.getElementById('search-result')
  const searchInput = document.getElementById('search')
  
  //Function to hide elements
  function hideElems(){
    loginForm.style.display="none"
    abtEl.style.display="none"


    // header.style.display = 'none'
  }

  //This function submits our login form
  loginForm.addEventListener("submit", function onsubmit(e) {
    e.preventDefault()

    hideElems();
    abtEl.style.display = "none"
    mainContainer.removeAttribute('hidden')
    mainDetails.style.display= "block";
    loginForm.reset()
  })

  //This function links our About tag in the navigation menu to the About page
  abouttag.addEventListener("click", () => {
    //hide this elements
    randomDrinkRow.style.display = "none"
    mainDetails.style.display= "none";
    loginForm.style.display="none"
    //show these elements
    abtEl.removeAttribute('hidden')
    abtEl.style.display= "block"
  })

  // Click event for categories
  categoriesLink.addEventListener('click', () => {
    // hide random drink
    randomDrinkRow.style.display = "none"
    categoriesLink.style.display = 'none'
    abtEl.style.display ="none"
    // drinksCategoryRow.removeAttribute('hidden')
    drinksCategoryRow.style.display = "block"
  })
  // search form submit listener
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = searchInput.value
    SearchDrink(query)
    randomDrinkRow.style.display = "none"
    drinksCategoryRow.style.display = "none"
    searchRow.removeAttribute('hidden')
    searchRow.style.display = "block"
  })

  //create an element for the random drink
  const createRandomDrink = (image, name, description) => {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')

    const rowDiv = document.createElement('div')
    rowDiv.classList.add('row')

    const imgDiv = document.createElement('div')
    imgDiv.classList.add('col')

    const bodyDiv = document.createElement('div')
    bodyDiv.classList.add('card-col')

    const drinkImg = document.createElement('img')
    drinkImg.classList.add('card-img')
    drinkImg.src = image

    const drinkTitle = document.createElement('h3')
    drinkTitle.classList.add('card-title')
    drinkTitle.innerText = name

    const drinkDescription = document.createElement('p')
    drinkDescription.classList.add('card-text')
    drinkDescription.innerText = description

    //append body elements
    bodyDiv.appendChild(drinkTitle)
    bodyDiv.appendChild(drinkDescription)

    //append image elements
    imgDiv.appendChild(drinkImg)

    //append divs to row
    rowDiv.appendChild(imgDiv)
    rowDiv.appendChild(bodyDiv)

    //append row to card
    cardDiv.appendChild(rowDiv)

    //return the cardDiv
    return cardDiv
  }
  //initialize Random drink
  const initRandomDrink = () => {
    fetch(randomDrinks)
    .then((response) => response.json())
    .then((data) => {
        const drinkData = data.drinks[[0]]
        const name = drinkData.strDrink
        const description = drinkData.strInstructions
        const image = drinkData.strDrinkThumb
        const drinkElement = createRandomDrink(image, name, description)
        randomDrinkRow.appendChild(drinkElement)
    })
  }

  //create category element
  const createCategory = (image, name) =>{
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')

    const categoryImg = document.createElement('img')
    cardDiv.classList.add('card-img-top')
    categoryImg.src = image

    const categoryTitle = document.createElement('h4')
    categoryTitle.classList.add('card-title')
    categoryTitle.innerText = name


    //append title and image to card
    cardDiv.appendChild(categoryImg)
    cardDiv.appendChild(categoryTitle)

    return cardDiv
  }

//search data
const SearchDrink = (drink) => {
  fetch(`${search}${drink}`)
  .then((response) => response.json())
  .then((data) =>{
    const drinksDataList = data.drinks
    const searchResults = drinksDataList.map(
      drinksData => {
        const name = drinksData.strDrinks
        const image = drinksData.strDrinksThumb
        console.log(name)
        return createSearchResult(name, image)
      }
    )
    searchRow.replaceChildren(...searchResults)
  })
}

// create search result
const createSearchResult = (name, image) => {
  const rootDiv = document.createElement('div')
  rootDiv.classList.add('col')

  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')

  const mealImg = document.createElement('img')
  mealImg.classList.add('card-img-top')
  mealImg.src = image

  const mealTitle = document.createElement('h4')
  mealTitle.classList.add('p')
  mealTitle.innerText = name

  cardDiv.appendChild(mealImg)
  cardDiv.appendChild(mealTitle)

  rootDiv.appendChild(cardDiv)
  return rootDiv

}

//initialize drink categories
const initCategories = () => {
    fetch(categories)
    .then((response) => response.json())
    .then((data) => {
        const categoriesData = data.drinks
        const categoryElems  = categoriesData.map(
          cat => createCategory(cat.strDrinkThumb, cat.strDrink)
        )
        drinksCategoryRow.append(...categoryElems)
    })
}
  initRandomDrink()
  initCategories()
})