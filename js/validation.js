
export function validerMovie(movie)
{
    const messageError={}
    if(!movie.title.trim())
    {
        messageError.title="« le titre est obligatoire »"
    }
    
    if(!movie.type)
    {
         messageError.type="« le type est obligatoire »"
    }
    else
    {
       if(movie.type==="movie")
       {
          if(!movie.duration)
          { 
               messageError.duree="« la duree est vide »"
          }
       }
       else
       {
          if((movie.seasons).length===0)
          {
               messageError.seasons="« les seasons sont est vide »"
          }
       }
          
         
    }
     let currentYear=new Date().getFullYear()
    if(movie.year==="" && !movie.year)
    {
         messageError.year="« l'annee est obligatoire »"
    }
    else if(movie.year<1900 || movie.year>currentYear)
    {
        messageError.year=`« l'annee doit etre entre 1900 et ${currentYear} »`
    }
   
  
    if(!movie.image)
    {
         messageError.image="« l'image obligatoire »"
    }
    else
    {
         let image=new URL(movie.image)
          if(image.protocol!=="http:" && image.protocol!=="https:")
          {
               messageError.image="« lien invalide »"
          }
    }
    
    if(!movie.description)
    {
         messageError.description="« la description est vide »"
    }
     if(movie.genres==="" || !movie.genres)
    {
         messageError.genres="« les genres sont obligatoires »"
    }
    if(!movie.directors)
    {
         messageError.directors="« les directeurs sont obligatoires »"
    }
    if(!movie.productionCountries)
    {
     messageError.country="« les pays obligatoire »"
    }
    return  messageError
}