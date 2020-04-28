import axios from 'axios';

export function utils() {
 
    const getIngredients = async (Ingredients: any) => {
               
            
            return axios.get(Ingredients +"&fillIngredients=true&addRecipeInformation=true&apiKey=YOUR-API-KEY").then(response => {
                
                 return response.data.results;})
            .catch(error => {
               console.log(error);
            });
           

        }
        
    const getIngredientsFilterDiets =  (Ingredients: any, Diets: any) => {
                
            return axios.get(Ingredients +"&diet=" + Diets + "&fillIngredients=true&addRecipeInformation=true&apiKey=YOUR-API-KEY").then(response => {
                
                 return response.data.results;})
            .catch(error => {
               console.log(error);
            });
    }

    const getIngredientsFilterIntolerance =  (Ingredients: any, Intolerance: any) => {
            return axios.get(Ingredients +"&intolerances=" + Intolerance + "&fillIngredients=true&addRecipeInformation=true&apiKey=YOUR-API-KEY").then(response => {return response.data.results;})
            .catch(error => {
               console.log(error);
            });
    }

    const getIngredientsFilterBoth =  (Ingredients: any, Diet: any, Intolerance: any) => {
            return axios.get(Ingredients +"&intolerances=" + Intolerance + "&diet=" + Diet + "&fillIngredients=true&addRecipeInformation=true&apiKey=YOUR-API-KEY").then(response => {return response.data.results;})
            .catch(error => {
               console.log(error);
            });
    }



    return{
    getIngredients,
    getIngredientsFilterDiets,
    getIngredientsFilterIntolerance,
    getIngredientsFilterBoth
    }

  }
