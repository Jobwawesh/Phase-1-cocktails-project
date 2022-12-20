const loginForm = document.getElementById('login-form')
const header = document.getElementById('header')
const mainDetails = document.getElementById('main')
const abtEl = document.getElementById('Aboutinfo')
const abouttag = document.getElementById("abttag")


function hideElems(){
    loginForm.style.display = "none"
    // header.style.display = 'none'
}

//This function submits our login form
loginForm.addEventListener("submit", function onsubmit(e) {
    e.preventDefault()

    hideElems();
    
    mainDetails.style.display= "block";
    loginForm.reset()
})

//This function links our About tag in the navigation menu to the About page
abouttag.addEventListener("click", () => {
  abtEl.removeAttribute('hidden')
  abtEl.style.display= "block"
  mainDetails.style.display= "none";
  hideElems();
})

//Fetched URLS
//1. Random drinks
const randomDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

//2. cattegories
const CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'


document.addEventListener('DOMContentLoaded',()=> {

  //Data
  const randomDrinkRow = document.getElementById('main-container')
  const categoriesLink = document.getElementById('category-link')
  const drinksCategoryRow = document.getElementById('drink-category')


  // CLICK EVENTS FOR LINKS
  categoriesLink.addEventListener('click', () => {
    // hide random meal
    randomDrinkRow.style.display = "none"
    
    // drinksCategoryRow.removeAttribute('hidden')
    drinksCategoryRow.style.display = "block"

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

  const loadRandomDrink = () => {
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

//load drink categories
const loadCategories = () => {
    fetch(CATEGORIES)
    .then((response) => response.json())
    .then((data) => {
        const categoriesData = data.drinks
        const categoryElems  = categoriesData.map(
          cat => createCategory(cat.strDrinkThumb, cat.strDrink)
        )
        drinksCategoryRow.append(...categoryElems)
    })
}
  loadRandomDrink()
  loadCategories()

})