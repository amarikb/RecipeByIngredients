import React, { useState, useEffect} from 'react';
import { useLocation, useHistory} from 'react-router-dom';
import { 
  IonContent, 
  IonPage, 
  IonButton
   } from '@ionic/react';

import './Recipe.css';


const Recipe: React.FC = () => {
   

 let [recipe,setRecipe] = useState<any>();
 const location = useLocation();
 const history = useHistory();
  
   useEffect(() => {
    const state = location.state
   
    console.log((state as any)?.results);

    setRecipe((state as any)?.results);
  },[]);


function displayRecipe(thing : any){
      
      return <div>
        <img className="imgLoc1" src={thing.image} alt="img of recipe"/>
          <h1 className="h1Loc">{thing.title}</h1>
          <h3 className="h3Loc1"><u>Yield:</u> <b>{thing.servings}</b></h3>
          <h3 className="h3Loc2"><u>Total:</u> <b>{(thing.preparationMinutes + thing.readyInMinutes).toString()}</b></h3>
          <h3  className="h3Loc3"><u>Prep:</u> <b>{thing.preparationMinutes} </b></h3>
          <h3  className="h3Loc4"><u>Cook:</u> <b>{thing.readyInMinutes}</b></h3>
          <h2 className="h2Loc1"><b><u>Ingredients:</u></b></h2>
          <h3 className="h3Loc5"><b>What you have:</b> {" "}{thing.usedIngredients.map((val: any, i: any) =>((i ? ', ': '') + val.original))}</h3>
          <h3 className="h3Loc6"><b>What you need:</b> {" "}{thing.missedIngredients.length > 0 ? thing.missedIngredients.map((val: any, i: any) =>((i ? ', ': '') + val.original)) : "none"}</h3>
          <h2 className="h2Loc2"><b><u>Directions:</u></b></h2>
             <h3 className="h3Loc7">{thing.analyzedInstructions.map((val: any) =>  val.steps.map((val2: any, i: any) => <div key={i}><br/>{val2.number + ". " + val2.step} <br/></div>))}</h3>
         
          </div>;
}
  
  return (
    <IonPage className="bImg">
      <IonContent className="font">
        {recipe ? displayRecipe(recipe) : null}
     
      <div className ="white wLocation">
        <IonButton  onClick={() => history.goBack()} color="primary">Back</IonButton>

       

      </div>
     </IonContent>
    </IonPage>
  
  )
          

}

export default Recipe;
