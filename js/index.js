const loginForm = document.getElementById('login-form')
const header = document.getElementById('header')
const mainDetails = document.getElementById('main')
const abtEl = document.getElementById('Aboutinfo')

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
  abtEl.style.display= "block"
  mainDetails.style.display= "none";
  hideEl();
})

