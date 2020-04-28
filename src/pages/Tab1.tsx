import React, { useState, useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import {IonContent, IonHeader, IonPage, IonToolbar, IonButton,
        IonLabel,IonTabs, IonIcon, IonGrid, IonRow,IonCard,
         IonCol,IonTabBar,IonRouterOutlet,IonTabButton,IonCardHeader,IonCardSubtitle,IonCardTitle,IonAlert} from '@ionic/react';

import {homeOutline,imageOutline,searchCircleOutline} from 'ionicons/icons';
import './Tab1.css';
import { useFirebase } from '../hooks/useFirebase';
import * as firebase from 'firebase';


const Tab1: React.FC = () => {
   const {googleLogout} = useFirebase();
    const history = useHistory();
    let [cookbook,setCookbook] = useState<any>('');
     const [showAlert1, setShowAlert1] = useState(false);
    let [recipe,setRecipe] = useState<any>('');

    var storage = firebase.storage();
 
  
   useEffect(() => {
 
     firebase
    .auth()
    .onAuthStateChanged(function(user){
        var currentUser = user;
        var file = "/users/recipes/" + currentUser?.uid ;
     
        var getPath = storage.ref(file);
    
    getPath.listAll().then(function(url) {
       
          url.items.forEach(function(itemRef) {
            
             
              var getRecipes = storage.ref(itemRef.fullPath);
              getRecipes.getDownloadURL().then(function(url) {
                 
                   fetch(url)
                    .then(response => response.json())
                    .then((recipe) => {
                 
                    setCookbook((cookbook: any) => [...cookbook,recipe]);
                 })
                   .catch((error) => {
                   
                       console.error(error)
                  })
                 

              }).catch(function(error) {

              })


          });
          
        }).catch(function(error) {
            console.log(error);
        });
    });

  },[]);

  function saveRecipe(recipe: any){
      setRecipe(recipe);
  }

   function displayCookbook(thing:any){

     return <div> 
          <IonGrid>
       <IonRow >
          {thing.map((result: any, i : any) => (
         <IonCol size="auto" key={i}>
                <IonCard style={{outline: "4px solid #e6b800"}}>
        <img src={result.image} alt="recipe img"/>
        <IonCardHeader>
         <IonCardSubtitle>{result.creditsText}</IonCardSubtitle>
          <IonCardTitle style={{fontWeight: "bold"}}>{result.title} <br/></IonCardTitle>
        </IonCardHeader>
        <br/>
        <IonTabs>
          <IonRouterOutlet></IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="speakers" onClick={() => deleteRecipe(result)}>
     
        <IonLabel>Delete Recipe</IonLabel>
      </IonTabButton>

      <IonTabButton tab="map" onClick={ () => history.push({
                pathname: "/recipe",
                state: {results: result}
            })}>

        <IonLabel>Details</IonLabel>
        
      </IonTabButton>
       <IonTabButton tab="speakers" onClick={() => {setShowAlert1(true); saveRecipe(result)}}>
     
        <IonLabel>Share it</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
  </IonCard>


         </IonCol>
      ))} 
      </IonRow>

       </IonGrid>
       
       </div>;
   }
   function deleteRecipe(thing: any){
     var storageRef = storage.ref();
     const newRecipes = cookbook.filter((p : any) => p.title !== thing.title);
     setCookbook(newRecipes);
  
      firebase
    .auth()
    .onAuthStateChanged(function(user){
        var currentUser = user;
        var file = "/users/recipes/" + currentUser?.uid + "/" + thing.title;

    var savedRecipe = storageRef.child(file); 
        savedRecipe.delete().then(function() {
          }).catch(function(error) {
              console.log(error);
        });
    });
     
    
  }
 
  return (
    <IonPage>
       <IonHeader>
        <IonToolbar color="dark" className="size">
           <IonButton fill="clear" href="/tab1" style={{color:"#e6b800"}}><IonIcon icon={homeOutline} />Home</IonButton>
           <IonButton fill="clear" href="/tab2" className="search2"><IonIcon icon={searchCircleOutline} />Search Recipe</IonButton>
           <IonButton fill="clear" href="/tab3" className="meal"><IonIcon icon={imageOutline} />Recipe Share</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bgColor theFont" scroll-x="true">
          <img src="assets/logo.svg" className="imgLoc" alt="logo"/>
          <h1 className="diffColor theStyle"> Hello {firebase.auth().currentUser?.displayName} .</h1>
       
           <h2 className="theStyle">Do you have any meals to share today and what type of leftover ingredients do you have to make a recipe?</h2>
          <IonGrid>
       <IonRow >

          <IonCol size="auto">
            <h1 className="diffSize"><u>Your Personal Cookbook:</u></h1>
          <div>{cookbook ? displayCookbook(cookbook) : <h3 className="red">Rawr Im Hungry...</h3>}</div>
            </IonCol>
          </IonRow>
         </IonGrid>
          <IonButton size="small" color="danger" className="logout"  onClick={() => googleLogout()}>Log Out</IonButton>
    
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
                state: {recipe: recipe.title, recipes: recipe, text: data.text}
            })
                
              }
            }
          ]}
          />

          
      </IonContent>
      
      
    </IonPage>
  
  )

}

export default Tab1;
