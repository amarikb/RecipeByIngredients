import React,{ useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {IonFab, IonFabButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
        IonLabel,IonTabs, IonIcon, IonGrid, IonRow,IonCard,
         IonCol,IonTabBar,IonRouterOutlet,IonTabButton,IonImg,IonCardHeader,IonCardTitle,IonCardContent,IonAlert} from '@ionic/react';
import {homeOutline,searchCircleOutline, camera,imageOutline} from 'ionicons/icons';
import { usePhotoGallery} from '../hooks/usePhotoGallery';



import './Tab3.css';
import * as firebase from 'firebase';



const Tab3: React.FC = () => {
   var storage = firebase.storage();
 
  var storageRef = storage.ref();
  let [save,setRecipes] = useState<any>('');
 const history = useHistory();
 const {takePhoto,title,message } = usePhotoGallery();
  const [showAlert1, setShowAlert1] = useState(false);

 

    
    
 
   

 

   useEffect(() => {

    
 firebase
    .auth()
    .onAuthStateChanged(function(user){

        var file = "/pictures/";
     
        var getPath = storage.ref(file);
    
  
    getPath.listAll().then(function(url) {
       
          url.items.forEach(function(itemRef) {
            
             
              var getRecipes = storage.ref(itemRef.fullPath);
              getRecipes.getDownloadURL().then(function(url) {
                 
                   fetch(url)
                    .then(response => response.json())
                    .then((recipe) => {
                    setRecipes((rep: any) => [...rep,recipe]);
                    
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

function displaySaved(thing:any){
    
return <div>
     <IonGrid>
       <IonRow >
         
       
      {thing.map((photo:any, index: any) => (
        <IonCol size="2" key={index}>
      

          <IonCard style={{outline: "4px solid #e6b800", zIndex: "4"}}>
      
      

             <IonImg key={index} src={photo.photo}/>
    
        <IonCardHeader>
      <IonCardTitle style={{fontWeight: "bold"}}>{photo.boolean === "true" ?  photo.title : "recipe"} <br/></IonCardTitle>
        </IonCardHeader>
        <br/>
       <IonCardContent className="content">{photo.boolean === "true" ? photo.mess : "grrr..."} </IonCardContent> 
      {photo.boolean === "true" ?
        <IonTabs>
          <IonRouterOutlet></IonRouterOutlet>
       <IonTabBar slot="bottom">
      <IonTabButton tab="map" onClick={ () => history.push({
                pathname: "/recipe",
                state: {results: photo.recipe}
            })}>

        <IonLabel>Details</IonLabel>
        
      </IonTabButton>
       <IonTabButton tab="speakers" onClick={() => {saveRecipe(photo.recipe); setShowAlert1(true); }}>
     
        <IonLabel>Add Cookbook</IonLabel>
      </IonTabButton>
    </IonTabBar> 
    </IonTabs>
    : null }
          </IonCard> 


        
        </IonCol>
      ))}

    </IonRow>
  </IonGrid>
  </div>
   
}

  return (
    <IonPage >
       <IonHeader>
        <IonToolbar color="dark" className="size">
          <IonTitle className="h1Title">Share Your Creations To The Community!</IonTitle>
           <IonButton fill="clear" href="/tab1"><IonIcon icon={homeOutline} />Home</IonButton>
           <IonButton fill="clear" href="/tab2" className="search2"><IonIcon icon={searchCircleOutline} />Search Recipe</IonButton>
           <IonButton fill="clear" href="/tab3" style={{color:"#e6b800"}} className="meal"><IonIcon icon={imageOutline} />Recipe Share</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonContent>
   <div className="backgroundImg4"> </div>
   
 <div>{save ? displaySaved(save) : null}</div>
    
</IonContent>
 <IonFab vertical="bottom" horizontal="center" slot="fixed">
    <IonFabButton onClick={() => takePhoto(false)}>
      <IonIcon icon={camera}></IonIcon>
    </IonFabButton>
  </IonFab>

  <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
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


 
    </IonContent>
    </IonPage>
  );
};

export default Tab3;
