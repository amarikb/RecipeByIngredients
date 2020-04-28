import React , {useState} from 'react';
import {useHistory } from 'react-router-dom';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonButton,IonCheckbox,
        IonLabel,IonTabs, IonIcon, IonGrid, IonRow,IonCard,
         IonCol,IonTabBar,IonRouterOutlet,IonTabButton,IonCardHeader,IonCardSubtitle,IonCardTitle,IonAlert} from '@ionic/react';
import './Tab2.css';
import { utils } from '../hooks/utils';
import {homeOutline,imageOutline,searchCircleOutline} from 'ionicons/icons';
import * as firebase from 'firebase';


const Tab2: React.FC = () => {

  const [searchText, setSearchText] = useState('');
  const { getIngredients,getIngredientsFilterDiets,getIngredientsFilterIntolerance,getIngredientsFilterBoth} = utils();
  let [message,setMessage] = useState('');
  let [theResults,setResults] = useState<any>();
  let [Diets, setDiets] = useState([{val: 'Gluten Free', isChecked: false},{val: 'Ketogenic', isChecked: false },{val: 'Vegetarian', isChecked: false},{val: 'Vegan', isChecked: false}, {val: 'Pescetarian', isChecked:false}]);
  let [Intolerances,setIntolerances] = useState([{val: 'dairy', isChecked: false},{val: 'eggs', isChecked: false },{val: 'peanuts', isChecked: false},{val: 'shellfish', isChecked: false}, {val: 'soy', isChecked:false},{val: 'tree nut', isChecked:false},{val: 'wheat', isChecked:false}]);
 const [showAlert1, setShowAlert1] = useState(false);
 const [showAlert2, setShowAlert2] = useState(false);
 let [recipe,setRecipe] = useState<any>();
  let history = useHistory();
  var storage = firebase.storage();
 
  var storageRef = storage.ref();
  

  function saveRecipe(recipe1: any){
   firebase
    .auth()
    .onAuthStateChanged(function(user){
        var currentUser = user;
        var file = "/users/recipes/" + currentUser?.uid + "/" + recipe1.title;
      

   
    var savedRecipe = storageRef.child(file); 
    savedRecipe.putString(JSON.stringify(recipe1)).then(function(snapshot) {
           console.log('Uploaded a raw string!');
      }).catch(error => {
               console.log(error);
      });

    });
    
      return null;
  }

  function saveTitle(recipe: any){
      setRecipe(recipe);
  }


function changeCheckedDiets(num: number , isChecked: boolean, Diets: any){

      if(isChecked === false){
         let newArr = [...Diets]; 
         newArr[num].isChecked = true; 
        setDiets(newArr);
        
      }
      else if(isChecked === true){
       let newArr = [...Diets];
       newArr[num].isChecked = false; 
        setDiets(newArr);
       
      }

}

function changeCheckedIntolerance(num: number , isChecked: boolean,Intolerances: any){

      if(isChecked === false){

        let newArr = [...Intolerances];
       newArr[num].isChecked = true; 
        setIntolerances(newArr);
        
      }
      else if(isChecked === true){
       let newArr = [...Intolerances];
       newArr[num].isChecked = false; 
        setIntolerances(newArr);
      }

}



  async function handleSearch(evt1: any, Diets1: any, Intolerance: any) {
      if(evt1 === ""){
        message = "Please enter your ingredients in the search bar.";
        setMessage(message);
      }
      else{
        message = "";
        setMessage(message);
        
        let checkedDiet = Diets1.filter((theDiet: any) => {
              return theDiet.isChecked = true;
        });
        let checkedResultDiet = checkedDiet.map((theDiet: any) => {
              return theDiet.val;
        });

        let checkedIntolerance = Intolerance.filter((theIntolerance: any) => {
              return theIntolerance.isChecked = true;
        });
        let checkedResultIntolerance = checkedIntolerance.map((theIntolerance: any) => {
              return theIntolerance.val;
        });

        let requestString = "https://api.spoonacular.com/recipes/complexSearch?includeIngredients=";
           requestString = requestString + searchText;
                  

        if(checkedResultDiet.length === 0 && checkedResultIntolerance.length === 0){
             
             let result = await getIngredients(requestString)
                .then(response => {
                   theResults = response;
                
                   return response;
                }
              )
              setResults(result);
            
              
         
                    
        }

        else if(checkedResultDiet.length > 0 && checkedResultIntolerance.length === 0){
               let result = await getIngredientsFilterDiets(requestString,checkedResultDiet)
                .then(response => {
                   theResults = response;
                   return response;
                }
              )
              setResults(result);
              
        
        }

        else if(checkedResultDiet.length === 0 && checkedResultIntolerance.length > 0){
           
             let result = await getIngredientsFilterIntolerance(requestString,checkedResultIntolerance).then(response => {
                   theResults = response;
                   return response;
                }
              )
              setResults(result);
             
        }

        else if(checkedResultDiet.length > 0 && checkedResultIntolerance.length > 0){
      
              let result = await getIngredientsFilterBoth(requestString,checkedResultDiet,checkedResultIntolerance).then(response => {
                   theResults = response;
                   return response;
                }
              )
              setResults(result);
             
        }
        
      
        
      
      }

  }

  function getResults(result: any){
      console.log(result);
     if(message === ''){
      return <div className="location1" style={{fontFamily: "Shadows Into Light"}}>
         <IonGrid>
       <IonRow>
         {result.map((theresult: any, i : any) => (
         
         <IonCol size="6" key={i}>
                <IonCard style={{outline: "4px solid #e6b800"}}>
              
        <img src={theresult.image} alt="..."/>
        <IonCardHeader>
         <IonCardSubtitle>{theresult.creditsText}</IonCardSubtitle>
          <IonCardTitle style={{fontWeight: "bold"}}>{theresult.title} <br/></IonCardTitle>
        </IonCardHeader>
        <br/>
        <IonTabs>
          <IonRouterOutlet></IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="speakers"  onClick={ () => {saveRecipe(theresult); setShowAlert2(true); }}>
     
        <IonLabel>Add Cookbook</IonLabel>
      </IonTabButton>

      <IonTabButton tab="map" onClick={ () => history.push({
                pathname: "/recipe",
                state: {results: theresult}
            })}>

        <IonLabel>Details</IonLabel>
        
      </IonTabButton>

       <IonTabButton onClick={() => {  setShowAlert1(true); saveTitle(theresult);}} tab="block">
        <IonLabel>Share it</IonLabel>
      </IonTabButton>
</IonTabBar>
  </IonTabs>
    
  </IonCard>


         </IonCol>
      ))} 
      </IonRow>

       </IonGrid>
       


       
        </div>
      
     
     }else{
       return <div className="location2"> {message} </div>
     }
  }
  
  
  return (
  
    <IonPage className="background">
      <IonHeader>
        <IonToolbar color="dark" className="size">
          <IonTitle className="home">Recipes</IonTitle>
           <IonButton fill="clear" href="/tab1"><IonIcon icon={homeOutline} />Home</IonButton>
           <IonButton fill="clear" href="/tab2" style={{color:"#e6b800"}}><IonIcon icon={searchCircleOutline} />Search Recipe</IonButton>
           <IonButton fill="clear" href="/tab3" ><IonIcon icon={imageOutline} />Recipe Share</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent scroll-x="true">
 
        <div className="search searchStyle">
          <br/>
          <br/>
          <h1 className="ingredients">Ingredient(s):</h1>
          <h4 className="h4">Enter ingredients, separated by commas</h4>
          <IonSearchbar className="width" value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Ingredients"></IonSearchbar>
       

          <h1 style={{textDecoration: "underline", color:"#e6b800"}}>FILTER BY:</h1>
          <h3>Special Diet: (Pick One)</h3>
   
            {Diets.map(({val}, i) => (
            <div key={i} className="diets">
             
             
              <IonCheckbox slot="end" value={val} checked={Diets[i].isChecked} onIonChange={ () => changeCheckedDiets(i,Diets[i].isChecked,Diets)}/>
              <IonLabel>{val}</IonLabel>
            </div>
            
          ))}
          
          <h3>Intolerances:</h3>
          
            {Intolerances.map(({val}, i) => (
          
            <div key={i} className="diets">
                           <IonCheckbox slot="end" value={val} checked={Intolerances[i].isChecked} onIonChange={ () => changeCheckedIntolerance(i,Intolerances[i].isChecked,Intolerances)}/>
              <IonLabel>{val}</IonLabel>
            </div>
            
          ))}
          <br/>

           <IonButton shape="round"  onClick={() => handleSearch(searchText,Diets,Intolerances)} >Search</IonButton>
        
                <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          header={'Enter Pic Comment!'}
          inputs={[
            {
              name: 'text',
              type: 'textarea',
              placeholder: 'enter message here'
            }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: 'take a pic',
              handler: data => {
                history.push({
                pathname: "/camera",
                state: {recipes: recipe, recipe: recipe.title, text: data.text}
            })
                
              }
            }
          ]}
          />

           <IonAlert
          isOpen={showAlert2}
          onDidDismiss={() => setShowAlert2(false)}
          header={'Confirm!'}
          message={'<strong>Recipe Added to Cookbook</strong>!!!'}
          buttons={[
            {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]}
        />

        

          
            
        </div>
       
        {theResults ? getResults(theResults) : null}

</IonContent>

    </IonPage>
   
    
  );
};

export default Tab2;
