const applicationState = {
    requests: [],
    plumbers: [],
    completions: []

}


const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
    .then(response => response.json())
    .then(
        (plumber) => {
            // Store the external state in application state
            applicationState.plumbers = plumber
        }
        )
    }
    
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (completion) => {
            // Store the external state in application state
            applicationState.completions = completion
        }
        )
    }
        
export const getPlumbers = () => {
return applicationState.plumbers.map(item => ({...item}))
}
        
export const getRequests = () => {
    const completedRequests = applicationState.requests.map(request => {
        //adds completed property if completion.requestId === request.id returns true
        request.completed = !!applicationState.completions.find(completion => completion.requestId === request.id)
        return request
    })

    completedRequests.sort((a,b) => {
        //sorts each object in ascending order by .completed (true/false) property
        return a.completed - b.completed
    })
    return completedRequests
}

//Fetch call for POST
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

//Fetch call for DELETE
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
