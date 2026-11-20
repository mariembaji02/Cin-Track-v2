import { getContent, deleteContent,createContent,updateContent } from "./api.js";
import { afficherCardAdmin } from "./ui.js";
import { Favorite,saveFavorite } from "./listFavor.js";
let gridCard = document.querySelector(".gridMovies");
let link=document.querySelector(".imagAjoter");
let linkEdit=document.querySelector(".imagEdit")
let imageAjouter=document.getElementById("previewImage")
let imageEdit=document.getElementById("editPreviewImage")
let typeSelect = document.getElementById("type");
let duree=document.querySelector("#duree");
let seasons=document.querySelector(".seasons");
let year=document.querySelector(".year");
let dureeEdit=document.querySelector("#dureeEdit");
let seasonsEdit=document.querySelector(".seasonsEdit");
let yearEdit=document.querySelector(".yearEdit");
let editSelect = document.getElementById("editType");
import {validerMovie} from "./validation.js"
// afficher le message rechercher pendant fetch
function loading() {
  gridCard.innerHTML = `
    <div class="loading col-span-full flex flex-col items-center gap-3 py-10">
        <div class="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
        <p class="text-purple-300 ">Chargement des films....</p>
    </div>
`;
}
loading();
let movies = await getContent();
afficherCardAdmin(movies);

//delete card by delete button 
gridCard.addEventListener("click", async (e) => {
  let button = e.target.closest(".delete");
  if (!button) return;
  let id = button.dataset.id;
  let movie = movies.find((m) => m.id == id);
 
  if (!confirm(`Supprimer « ${movie.title} » ?`)) return;
  await deleteContent(id);
   let fav = [...Favorite].find((f) => f.id == id);
  movies = await getContent();
  afficherCardAdmin(movies);
  let modalConfirm = document.querySelector(".Confirm");
  let modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
  modalConfirm.classList.remove("hidden");
  let titleC = document.querySelector(".title");
  titleC.textContent = `« ${movie.title} »`;
  if(!fav)return
  Favorite.delete(fav);
  saveFavorite()
  loading();
});

let editId;
//afficher les infos dans la form modifier 
gridCard.addEventListener("click",(e)=>{
     let modalEdit = document.querySelector("#modalEdit");
     let modal = document.querySelector(".modal");
    let buttonEdit = e.target.closest(".modifier");
    if (!buttonEdit) return;
    let id = buttonEdit.dataset.id;
    editId=id
    let movie = movies.find((m) => m.id == id);
    
     document.getElementById("editTitle").value=movie.title
     document.getElementById("editType").value=movie.type
     document.getElementById("editReleaseYear").value=movie.releaseYear
     document.getElementById("editGenres").value=movie.genres
     document.getElementById("editDirectors").value=movie.directors
     document.getElementById("editCountries").value=movie.productionCountries
     document.getElementById("editDescription").value=movie.description
     document.getElementById("editPreviewImage").src=movie.image
     if(movie.type==="movie")
     {
        
        document.getElementById("editDuration").value=Number(movie.duration)
        dureeEdit.classList.remove("hidden");
        seasonsEdit.classList.add("hidden");
        yearEdit.classList.add("col-span-2")
        


        // document.getElementById("labelS").style.display="none";
     }
     else
     {
        document.getElementById("editSeasons").value=movie.seasons.length
        seasonsEdit.classList.remove("hidden");
        dureeEdit.classList.add("hidden");


        //  document.getElementById("labelD").style.display="none";
     }
      modal.classList.remove("hidden");
     modalEdit.classList.remove("hidden");
  
})


// change select 

function changeSelect(select,duree,seasons,year)
{
    select.addEventListener("change", () => {
    
    if (select.value === "movie") {

    duree.classList.remove("hidden");

    seasons.classList.add("hidden");

    year.classList.add("col-span-2");

    } else {

    seasons.classList.remove("hidden");

    duree.classList.add("hidden");

    year.classList.remove("col-span-2");

    }

})
}
changeSelect(typeSelect,duree,seasons,year)
changeSelect(editSelect,dureeEdit,seasonsEdit,yearEdit)


//Form ajouter 
let formAjouter=document.getElementById("formAdd")
formAjouter.addEventListener("submit",async(e)=>{
     e.preventDefault();
  

     let FormD=new FormData(formAjouter)
       
         
        let movie = {
            title: FormD.get("title").trim(),
            type: FormD.get("type").trim(),
            releaseYear:FormD.get("releaseYear")===""?"": Number(FormD.get("releaseYear")),

            [FormD.get("type") === "movie" ? "duration" : "seasons"]:
                FormD.get("type") === "movie"
                    ? Number(FormD.get("duration")) 
                    : Array.from({length:Number(FormD.get("seasons"))},(_,i)=>i+1),
            image:FormD.get("image"),
            description: FormD.get("description"),
          
            genres:FormD.get("genres")===""?"": FormD.get("genres").split(",").map(g=>{return g.trim()}),
            directors:FormD.get("directors")===""?"": FormD.get("directors").split(",").map(d=>{ return d.trim()}),
            productionCountries:FormD.get("productionCountries")===""?"": FormD.get("productionCountries").split(",").map(p=>{return p.trim()})
            
        }
        let error=validerMovie(movie)
        afficheError(error)
      


      if(Object.keys(error).length>0) return
      else{
        // && movie[key]!==""
        let message=""
         let res = movies.some(m =>
         Object.keys(movie)
        .filter(key => key !== "id")
        .every(key => JSON.stringify(m[key]) === JSON.stringify(movie[key])))
         console.log(movies[1])
         console.log(movie)
         if(res)
         {
            message=`« ${movie.type} déja Exist »`
             console.log("exist")
            
         }
         else
         {
            
               
                message=`« ${movie.title}  bien Ajouter»`
                document.querySelector(".formError").classList.remove("bg-red-500/20","border-red-600","text-red-400")
                document.querySelector(".formError").classList.add("bg-green-500/20","border-green-600","text-green-400")
                await createContent(movie)
                movies = await getContent();
                afficherCardAdmin(movies);
                formAjouter.reset()
                document.getElementById("previewImage").src="images/defaultImage.png";
          
            

         }
            document.querySelector(".formError").textContent=message;
            console.log(message)
            console.log(document.querySelector(".formError"))
            document.querySelector(".formError").classList.remove("hidden")


        
         }  
       
    //   document.querySelector(".formError").classList.add("hidden")
})

//
 
 
  function loadImage(link,imageItem)
  {
        link.addEventListener("input",()=>{
        if(!link.value)return
         let img = new Image()
         img.onload=()=>{
           imageItem.src=link.value
         }
          img.onerror=()=>{
            if(link.value!=="")
            imageItem.src="images/defaultImage.png"
          }
          img.src=link.value
          
      })
  }
   loadImage(link,imageAjouter)
   loadImage(linkEdit,imageEdit)

function afficheError(error)
{
    document.querySelector(".titleError").textContent=error.title  
      document.querySelector(".imageError").textContent=error.image
      document.querySelector(".typeError").textContent=error.type
      document.querySelector(".yearError").textContent=error.year
       document.querySelector(".seasonsError").textContent=error.seasons
      document.querySelector(".durationError").textContent=error.duree
      document.querySelector(".genreError").textContent=error.genres
      document.querySelector(".directorError").textContent=error.directors
      document.querySelector(".countryError").textContent=error.productionCountries
      document.querySelector(".disError").textContent=error.description
      document.querySelector(".countryError").textContent=error.country
    //   ----------------------------------------------------------
     document.querySelector(".titleErrorEdit").textContent=error.title  
    //   document.querySelector(".imageErrorEdit").textContent=error.image
      document.querySelector(".typeErrorEdit").textContent=error.type
      document.querySelector(".yearErrorEdit").textContent=error.year
       document.querySelector(".seasonsErrorEdit").textContent=error.seasons
      document.querySelector(".durationErrorEdit").textContent=error.duree
      document.querySelector(".genreErrorEdit").textContent=error.genres
      document.querySelector(".directorErrorEdit").textContent=error.directors
      document.querySelector(".countryErrorEdit").textContent=error.productionCountries
      document.querySelector(".disErrorEdit").textContent=error.description
      document.querySelector(".countryErrorEdit").textContent=error.country
}

////modifier

let formEdit=document.getElementById("formEdit")
formEdit.addEventListener("submit",async(e)=>{
     e.preventDefault();
  
     let FormE=new FormData(formEdit)
      
         
        let movie = {
            title: FormE.get("title").trim(),
            type: FormE.get("type").trim(),
            releaseYear:FormE.get("releaseYear")===""?"": Number(FormE.get("releaseYear")),

            [FormE.get("type") === "movie" ? "duration" : "seasons"]:
                FormE.get("type") === "movie"
                    ? Number(FormE.get("duration")) 
                    : Array.from({length:Number(FormE.get("seasons"))},(_,i)=>i+1),
            image:imageEdit.src,
            description: FormE.get("description"),
          
            genres:FormE.get("genres")===""?"":FormE.get("genres").split(",").map(g=>{return g.trim()}),
            directors:FormE.get("directors")===""?"": FormE.get("directors").split(",").map(d=>{ return d.trim()}),
            productionCountries:FormE.get("productionCountries")===""?"": FormE.get("productionCountries").split(",").map(p=>{return p.trim()})
            
        }
        
        let error=validerMovie(movie)
        afficheError(error)
          
        if(Object.keys(error).length>0)return
            
            let message=""
            let res = movies.find(m =>
            Object.keys(movie)
            .filter(key => key !== "id")
            .every(key => JSON.stringify(m[key]) === JSON.stringify(movie[key])))
      
         if(res)
         {
            message=`« les donnes de ${movie.type} déja Exist »`

            document.querySelector(".formErrorEdit").classList.remove("bg-green-500/20","border-green-600","text-green-400")
            document.querySelector(".formErrorEdit").classList.add("bg-red-500/20","border-red-600","text-red-400")
            
         }
         else
         {
            
               
                
                message=`« ${movie.title}  bien Modifier»`

                await updateContent(editId,movie)
                let index=[...Favorite].findIndex(f=>f.id===editId)
                if(index)
                {
               
                    console.log(Favorite[index])
                }
                else
                {
                    console.log("pas Trouver !!!!")
                }
                movies = await getContent();
                afficherCardAdmin(movies);
                document.querySelector(".formErrorEdit").classList.remove("bg-red-500/20","border-red-600","text-red-400")
                document.querySelector(".formErrorEdit").classList.add("bg-green-500/20","border-green-600","text-green-400")
                
            

         }
            document.querySelector(".formErrorEdit").textContent=message;
            console.log(message)
            console.log(document.querySelector(".formError"))
            document.querySelector(".formErrorEdit").classList.remove("hidden")




})