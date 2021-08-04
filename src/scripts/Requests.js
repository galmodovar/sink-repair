import { getRequests, deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


export const Requests = () => {
    let items = getRequests()
   
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    const listItems = items.map(item => {
            return `<li>
                ${item.description}
                <button class="request__delete"
                id="request--${item.id}">
                Delete
                </button>
            </li>
            `

        
        
    })
        
        html += listItems.join("")
        html += "</ul>"
        
        return html
    }
