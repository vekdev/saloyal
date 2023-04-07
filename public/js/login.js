const theForm = document.querySelector("form")
const userInput = document.getElementById("name")

theForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    
    // login(userInput.value.toLowerCase())

    try {
        const res = await fetch("../user/login-user", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username: userInput.value.toLowerCase()})
        })
        const data = await res.json()
        
        if (data) {
            localStorage.setItem("user", userInput.value)
            window.location.replace("/card")
        } else {
            alert("NO USER FOUND")
            window.location.reload()
        }
    } catch (error) {
        console.error(error)
    }


})