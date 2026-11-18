import {getContent } from "./api.js";
import { afficherCardAdmin} from "./ui.js";



let movies=await getContent()
afficherCardAdmin(movies)
const deletebtn =document.querySelectorAll(".delete");
const modifierbtn =document.getElementById("modifier");
const Cards=document.querySelectorAll(".card")
deletebtn.forEach(btn=>{
     btn.addEventListener("click",(e)=>{
     let card=e.target.closest(".card")
     let id = Number(card.dataset.id)
     console.log(id)
})
})
