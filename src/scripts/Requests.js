import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                requestId: parseInt(requestId) ,
                plumberId: parseInt(plumberId) ,
                dateCreated: Date.now()            
            }
           
            saveCompletion(completion)
                
        }
    }
    )
                /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
                */





export const Requests = () => {
    const items = getRequests()
    const plumbers = getPlumbers()
   
    let html = "<table>"

    // Use .map() for converting objects to <li> elements
    const listItems = items.map(item => {
            return `<td>
                ${item.description}
                ${item.address}
                ${item.budget}
                <button class="request__delete"
                id="request--${item.id}">
                Delete
                </button>
                <select class="plumbers" id="plumbers">
                    <option value="">Choose</option>
                    ${plumbers.map(plumber => {
                                    return `<option value="${item.id}--${plumber.id}">${plumber.name}</option>`
                                         }
                                    ).join("")
                                  }
                </select>
                 </td>
                `

        
        
            })
        
        html += listItems.join("")
        html += "</table>"
        
        return html
    }
