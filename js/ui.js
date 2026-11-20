export function afficherData(movies)
{
    let gird=document.querySelector(".CardGrid");
    gird.innerHTML=movies.map(card=>{
        const {image,type,id}=card
        
        return `<div class="card relative border-gray-600 border rounded-md shadow-lg shadow-white/30  w-[90%] h-[90%] " data-id=${id} ><img src=${image} class="rounded-lg  relative w-full h-full cursor-pointer "  alt="big Picture">
         <button data-model=${id} class="addFavor cursor-pointer hover:text-red-500 text-gray-300 absolute top-7 right-6 text-xl"><i class="heart fa-regular fa-heart " data-btn=${id}></i></button>
                             <div class="absolute bottom-20 left-4 text-white w-[80%] p-2 ">                               
                             </div>
                              <p class="type text-center py-2 mr-10 text-sm absolute top-5 w-15 rounded-lg left-5 bg-[rgba(230,225,225,0.78)] font-semibold">${type}</p>  
                            </div>`
         
    }).join("")
}
 let gridCard=document.querySelector(".gridMovies")

export function afficherCardAdmin(movies)
{
    gridCard.innerHTML=movies.map(card=>{
        const {id,image}=card
        return `
            <div class="card  relative border-gray-200 border rounded-md shadow-lg shadow-white/30 overflow-hidden w-full max-w-[380px] " data-id=${id}>

                <img src="${image}" 
                     class="w-full aspect-[2/3] object-cover block relative">

               
                    <p class="flex  justify-center gap-1   top-2 right-2 p-1 absolute ">

                        <button class="modifier" data-id=${id}>
                            <i class="fa-solid fa-pen text-white bg-green-500/70 p-2 text-sm rounded-lg"></i>
                        </button>

                        <button class="delete" data-id=${id}>
                            <i class="fa-solid fa-trash text-white bg-red-500/70 p-2 text-sm rounded-lg"></i>
                        </button>

                </p>
            </div>
        `;
    }).join("");
}