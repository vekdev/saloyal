async function init() {
    try {
        const res = await fetch("initialise/initialise", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: localStorage.getItem("user") ? localStorage.getItem("user").toLowerCase() : undefined
            })
        })
        const data = await res.json()
        setTimeout(() => {
            if (data) {
                window.location.replace("/card")
            } else {
                window.location.replace("/user/login")
            }
        }, 300)
    } catch (err) {
        console.error(err)
    }
}
init()