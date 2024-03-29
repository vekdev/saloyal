// document.querySelector("button").addEventListener("click", addItem)
const numberOfStampsText = document.getElementById("number")
const boxes = document.querySelectorAll(".box")

// ACCESS INFO FROM DATABASE AND SAVE THEM TO MINIMISE CALLS TO THE DATABASE

let currentStampNumber

// async function addItem() {
//     try {
//         const res = await fetch("card/addItem", {
//             method: "post",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 item: "Hello",
//                 insert: `Visited on ${new Date(Date.now())}`,
//                 genius: true,
//                 nextVisitBooked: false
//             })
//         })
//         const data = await res.json()
//         numberOfStampsText.innerText = data
//         highlightBoxes(data)
//     } catch(error) {
//         console.error(error)
//     }
// }

async function getCount() {
    try {
        const res = await fetch("count")
        const data = await res.json()
        currentStampNumber = data
        console.log(data)
        highlightBoxes(data.number)
    } catch (error) {
        console.error(error)
    } 
}

function highlightBoxes(n) {
    for (i=0; i<n; i++) {
        boxes[i].classList.add("stamped")
    }
}

getCount()