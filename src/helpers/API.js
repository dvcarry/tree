
const URL = 'http://localhost:3000/'


export const fetchGetCatalog = async () => {
    try {
        const data = await fetch(URL + 'catalog');
        const res = await data.json();
        console.log("fetchGetCatalog -> res", res)
        
        return res
    } catch (error) {
        console.log("fetchGetCatalog -> error", error)
    }
}

export const fetchGetProject = async () => {
    try {
        const data = await fetch(URL + 'project');
        const res = await data.json();
        console.log("fetchGetCatalog -> res", res)
        
        return res
    } catch (error) {
        console.log("fetchGetCatalog -> error", error)
    }
}

export const fetchAddNewItemToCatalog = async (item) => {
    try {
        const data = await fetch(URL + 'catalog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
          });
        const res = await data.json();
        console.log("fetchGetCatalog -> res", res)        
        return res
    } catch (error) {
        console.log("fetchGetCatalog -> error", error)
    }
}

export const fetchAddNewItemToProject = async (item) => {
console.log("fetchAddNewItemToProject -> item", item)
    
    try {
        const data = await fetch(URL + 'project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
          });
        const res = await data.json();
        console.log("fetchGetCatalog -> res", res)        
        return res
    } catch (error) {
        console.log("fetchGetCatalog -> error", error)
    }
}

export const fetchChangeParentOfNode = async (parent, node) => { 
    
        const dataForNewNode = {
            parent,
            node
        }

        try {
            const data = await fetch(URL + 'project', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(dataForNewNode)
              });
            const res = await data.json();
            console.log("fetchGetCatalog -> res", res)        
            return res
        } catch (error) {
            console.log("fetchGetCatalog -> error", error)
        }
    }

    export const fetchDeleteFromCatalog = async (id) => {    

        try {
            const data = await fetch(URL + 'catalog', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(id)
              });
            const res = await data.json();
            console.log("fetchGetCatalog -> res", res)        
            return res
        } catch (error) {
            console.log("fetchGetCatalog -> error", error)
        }
    }

    export const fetchDeleteFromProject = async id => {    

        try {
            const data = await fetch(URL + 'project', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(id)
              });
            const res = await data.json();
            console.log("fetchGetCatalog -> res", res)        
            return res
        } catch (error) {
            console.log("fetchGetCatalog -> error", error)
        }
    }