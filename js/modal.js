import {validerComment} from "./validation.js"
import{createComment,getComments, getContent} from "./api.js"

export async function modal(movies)
{
       let grid=document.querySelector(".CardGrid");
       let modal=document.querySelector(".modal")
       let infos=document.querySelector(".infos")
       
        grid.addEventListener("click",async(e)=>{
            let card = e.target.closest("[data-id]");
            if(!card)return
             let id=card.dataset.id

             let result=movies.find(item=>{
                return item.id===id
             })
             if(result)
             {
                let allComments =await getComments(id) || []
                  
                  let comments=allComments.filter(c=>c.CataloguId===id)
               infos.innerHTML=""
               //  console.log(result)
                modal.classList.remove("hidden")
               //  infos.style.backgroundImage=`url(${result.image})`
               //  infos.style.backgroundSize="100% 100%"
                infos.innerHTML+=
                `<button id="closeDetails"
                     class="hideModal absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 cursor-pointer hover:bg-[rgba(220,206,220,0.52)] text-white text-xl">
                     &times;
                  </button>
                <div class="details relative h-auto p-2 shadow-xl rounded-lg flex flex-col sm:flex-row  gap-1 ">
                         <div>
                           <img id="detailsImage"
                              src="${result.image}"
                              class="w-[80%] rounded-xl object-cover border border-purple-500/50 max-h-[500px]"
                              alt="Poster">
                           </div>
                         
                         <div class="flex flex-col w-full ml-2 relative sm:w-[50%]  sm:h-full sm:gap-3">
                          <h1 class=" text-2xl lg:text-2xl  font-bold mt-5 ">${result.title}</h1>
                         <ul class="flex justify-start gap-2 md:gap-4  mt-3">
                         ${
                               infos.innerHTML=(result.genres).map(genre=>{
                                   return `<li class=" rounded-lg text-xs md:text-sm p-2 bg-[rgba(173,168,173,0.39)] ">${genre}</li>`
                               }).join("")
                          }
                         </ul>
                         <p class="flex flex-col"> <span class="font-semibold text-md">Year:</span> <span id="year" class="text-sm">${result.releaseYear}</span></p>
                         <p class="flex flex-col">
                         <span class="font-semibold text-md">Description:</span><span id="description" class="text-sm w-[90%] mt-1">${result.description}</span></p>
                         <p class="flex flex-col">
                         <span class="font-semibold text-md">Director:</span>
                          <div class="flex">
                              ${(result.directors).map(director=>{
                                   return `<div class="rounded-lg text-sm p-2">${director}</div>`
                               }).join("_")}
                         
                          </div>
                         
                       
                         </p> 
                         <p class="flex flex-col"> <span class="font-semibold text-md">${result.type==="movie"?`Duree : `:`Seasons: `}</span><span>${result.type==="movie"?`<i class="fa-solid fa-clock" style="color: rgb(250, 246, 251);"></i> ${Math.floor(result.duration/60)}h ${Math.floor(result.duration%60)}min`:`<i class="fa-solid fa-clapperboard" style="color: rgb(250, 248, 252);"></i> {${result.seasons.join("-")}}`}</span>
                         </p>
                        
                         </div>
                        
                        </div>
                         
             <!-- Comments -->
            <div class="border-t border-purple-500/20 pt-4">

               <!-- Title -->
               <h3 class="font-semibold text-xl mb-4 text-white flex items-center gap-2">
                  <i class="fa-solid fa-comment"></i>
                  Comments (<span class="count">${allComments.length}</span>)
               </h3>

               <!-- Comments list -->
               <div class="flex flex-col gap-2 mb-4">
                   <div id="commentsList" class="flex flex-col gap-2 mb-4">
                    ${comments.map(c=>{
                          return ` <div class="flex items-center gap-3 bg-white/5 border border-purple-500/10 rounded-2xl p-3">

                                 <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold shrink-0">
                                    ${c.author[0]}
                                 </div>

                                 <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-2">
                                       <span class="text-white font-semibold text-sm">${c.author}</span>
                                       <span class="text-gray-400 text-xs">· ${new Date(c.createdAt).toLocaleDateString("fr-FR").split('/').join("-")}</span>
                                    </div>

                                    <p class="text-gray-200 text-sm">
                                       ${c.text}
                                    </p>
                                 </div>
                           </div>`
                        }).join("") }
                   </div>
                
               
            <!-- Add comment -->
              <form class="AjouterComments">
                  <div class="flex gap-2 items-center">

               <div class="flex  gap-3 flex-1 relative   rounded-xl px-4 py-3 ">
                           <div class="w-[30%] ">
                           <input
                              id="commentUser"
                              type="text"
                              placeholder="Tapez votre Nom..."
                              class="w-full p-2  outline-none bg-white/5 rounded-xl focus-within:border-purple-500 border border-purple-500/20  text-white placeholder-gray-500 "
                           >
                           <p class="userError text-red-500 text-xs mt-1"></p>
                           </div>
                           <div class="w-[60%] ">
                             <input
                              id="commentInput"
                              type="text"
                              placeholder="Ajouter un Commentaire..."
                              class="w-full p-2  outline-none bg-white/5 rounded-xl focus-within:border-purple-500 border border-purple-500/20 text-white placeholder-gray-500 "
                           >
                           <p class="commentError text-red-500 text-xs mt-1"></p>
                           </div>
                     </div>

                     <button
                           id="sendComment"
                           class="bg-purple-600 hover:bg-purple-700 transition px-5 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
                     type="submit">
                           <i class="fa-solid fa-paper-plane"></i>
                           Send
                     </button>

                  </div>

              
              
              </form>
               </div>`
                let btnHide=document.querySelector(".hideModal");
                btnHide.addEventListener("click",()=>{
                modal.classList.add("hidden")
                    
                })
                let formComment=document.querySelector(".AjouterComments")
                  formComment.addEventListener("submit",async(e)=>{
                     e.preventDefault()
                        const comment={
                           author:document.getElementById("commentUser").value.trim(),
                           text:document.getElementById("commentInput").value.trim(),
                           createdAt:new Date()
                        }

                        const error=validerComment(comment)
                        document.querySelector(".commentError").textContent=error.text
                        document.querySelector(".userError").textContent=error.author
                        if(Object.keys(error).length>0)return
                         await createComment(id,comment)
                         let allComments =await getComments(id)
                        console.log(id)
                        console.log(allComments)
                        document.querySelector(".count").textContent=allComments.length
                        let comments=allComments.filter(c=>c.CataloguId===id)
                        
                        document.getElementById("commentsList").innerHTML=comments.map(c=>{
                          return ` <div class="flex items-center gap-3 bg-white/5 border border-purple-500/10 rounded-2xl p-3">

                                 <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold shrink-0">
                                    ${c.author[0]}
                                 </div>

                                 <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-2">
                                       <span class="text-white font-semibold text-sm">${c.author}</span>
                                       <span class="text-gray-400 text-xs">· ${new Date(c.createdAt).toLocaleDateString("fr-FR").split('/').join("-")}</span>
                                    </div>

                                    <p class="text-gray-200 text-sm">
                                       ${c.text}
                                    </p>
                                 </div>
                           </div>`
                        }).join("") 
                        document.getElementById("commentUser").value=""
                        document.getElementById("commentInput").value=""

                      })
                              
                
             }
             else
             {
                console.log("not found")
             }
        })
        
}


