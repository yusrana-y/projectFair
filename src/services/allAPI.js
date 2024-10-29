import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

// register called by Auth.jsx
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/register`, reqBody)
}

//login
export const loginAPI = async(reqBody) => {
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

//add project called by Add
export const addProjectAPI = async(reqBody,reqHeader) => {
    console.log("inside add project API");
    return await commonAPI("POST",`${serverURL}/add-project`,reqBody,reqHeader)
}

//homeProjectAPI called by home
export const homeProjectAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/home-projects`,"")
}

//allProjectsAPI called by Projects
export const allProjectsAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-projects?search=${searchKey}`,"",reqHeader)
}

//userProjectsAPI called by View

export const userProjectsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-projects`,"",reqHeader)
}

//deleteProjectAPI called by View

export const deleteProjectAPI = async(pId,reqHeader)=> {
    return await commonAPI("DELETE",`${serverURL}/${pId}/remove-project`,{},reqHeader)
}

// editProjectAPI called by Edit

// export const editProjectAPI = async(pId,reqHeader,reqBody) =>
// {
//     return await commonAPI("PUT",`${serverURL}/${pId}/edit-project`,reqBody,reqHeader)
// }

// edit Profile called by Profile

export const editProfileAPI = async(reqBody,reqHeader) => {
    return await commonAPI("PUT",`${serverURL}/user/edit`,reqBody,reqHeader)
}