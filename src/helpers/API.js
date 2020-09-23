import Axios from "axios";
import { get } from "lodash";

// const URL = 'http://localhost:3000/'
Axios.defaults.baseURL = 'http://localhost:3000/';


export const fetchGetCatalog = async () => {
    try {
        const data = await fetch(URL + 'catalog');
        const res = await data.json();
        // console.log("fetchGetCatalog -> res", res)

        return res
    } catch (error) {
        console.log("fetchGetCatalog -> error", error)
    }
}

export const fetchGetProject = async () => {
    try {
        const data = await fetch(URL + 'project');
        const res = await data.json();
        // console.log("fetchGetCatalog -> res", res)

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
        // console.log("fetchGetCatalog -> res", res)        
        return res
    } catch (error) {
        console.log("fetchGetCatalog -> error", error)
    }
}

export const fetchAddNewItemToProject = async (item) => {
    // console.log("fetchAddNewItemToProject -> item", item)

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

export const fetchChangeParentOfNode = async (node, parent) => {

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
        // console.log("fetchGetCatalog -> res", res)        
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
        // console.log("fetchGetCatalog -> res", res)        
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
        // console.log("fetchGetCatalog -> res", res)        
        return res
    } catch (error) {
        console.log("fetchGetCatalog -> error", error)
    }
}

// export const fetchGetAllProjects = async () => {
//     try {
//         const data = await fetch(URL + 'projects');
//         const res = await data.json();
//         return res
//     } catch (error) {
//         console.log("fetchGetCatalog -> error", error)
//     }
// }

// export const fetchAddNewProject = async item => {
//     try {
//         const data = await fetch(URL + 'projects', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify(item)
//         });
//         const res = await data.json();
//         // console.log("fetchGetCatalog -> res", res)        
//         return res
//     } catch (error) {
//         console.log("fetchGetCatalog -> error", error)
//     }
// }

export const treeAPI = {
    async get(project_id) {
        try {
            const { data } = await Axios.get(`tree/${project_id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
}



export const catalogAPI = {
    async getAll(project_id) {
        try {
            const { data } = await Axios.get(`catalog/${project_id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async add(project_id, item) {
        try {
            const { data } = await Axios.post(`catalog/${project_id}`, item)
            return data
        } catch (error) {
            console.log(error)
        }
    },
}

export const projectsAPI = {
    async getProjects() {
        try {
            const { data } = await Axios.get('projects')
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async fetchAddProject(project) {
        try {
            const { data } = await Axios.post('projects', project)
            return data
        } catch (error) {
            console.log(error)
        }
    }
}