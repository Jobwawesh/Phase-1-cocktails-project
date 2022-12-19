const loginForm = document.getElementById('login-form')
const header = document.getElementById('header')
const mainDetails = document.getElementById('main')

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