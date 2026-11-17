const URL_API="https://6afaf195730c1d152f32cf4c.mockapi.io/api/CineTrack-v2"
export async function request(path,option={}) {
    try{
        const response= await fetch(URL_API+path,{
                
                headers :{"content-type":"application/JSON"},
                ...option
            })
            if(!response.ok) throw new Error(`HTTP ${response.status}`)
            return response.json() 

    }
    catch(error)
    {
        console.log(error.message)
    }
    finally
    {
        console.log("fetch terminer")
    }
      
}

export const getContent=()=>request("/Catalogu")











export const createContent=()=>request("/catalogu",{method:"POST",body:JSON.stringify()})
    

export function updateContent(){}
export function deleteContent(){}
export function getComments(){}