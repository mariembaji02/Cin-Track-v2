import { getContent ,deleteContent} from "./api.js";
import { modal } from "./modal.js";
import { afficherCardAdmin } from "./ui.js";
    let gridCard = document.querySelector(".gridMovies");

function loading()
{
gridCard.innerHTML = `
    <div class="loading col-span-full flex flex-col items-center gap-3 py-10">
        <div class="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
        <p class="text-purple-300 ">Chargement des films....</p>
    </div>
`;
}
loading()
let movies = await getContent();

  afficherCardAdmin(movies);

const deletebtn = document.querySelectorAll(".delete");
const modifierbtn = document.getElementById("modifier");
const Cards = document.querySelectorAll(".card");

    gridCard.addEventListener("click",async(e) => {
    let button = e.target.closest(".delete");
    if(!button)return
    let id = button.dataset.id;
    let movie = movies.find(m=>m.id==id)
    if (!confirm(`Supprimer « ${movie.title} » ?`)) return;
    await deleteContent(id);
    loading()
    movies=await getContent()
    afficherCardAdmin(movies)
    let modalConfirm=document.querySelector(".Confirm");
    let modal=document.querySelector(".modal")
    modal.classList.remove("hidden")
    modalConfirm.classList.remove("hidden")
    let titleC=document.querySelector(".title")
    titleC.textContent=`« ${movie.title} »`
    // items = movies.filter(i => i.id !== id);
    // renderTable(items);
  });

