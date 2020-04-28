import { useState} from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import {base64FromPath } from '@ionic/react-hooks/filesystem';
import { CameraResultType, CameraSource, CameraPhoto} from "@capacitor/core";
import useLocalStorage from 'react-use-localstorage';
import * as firebase from 'firebase';


export function usePhotoGallery() {

    const { getPhoto } = useCamera();

    let [count,setCount] = useLocalStorage('count','0');
    const [message, setMessage] = useLocalStorage('message',"");
    const [title, setTitles] = useLocalStorage('title',"");
    let [recipe,setRecipes] = useState<any>();
    var storage = firebase.storage();
    var storageRef = storage.ref();

    
  

      const takePhoto = async (thing: any) => {
            const cameraPhoto = await getPhoto({
              resultType: CameraResultType.Uri,
              source: CameraSource.Camera,
              quality: 100
            });
            savePicture(cameraPhoto,thing);

          };
          const savePicture = async (photo: CameraPhoto, thing: any) => {


      firebase
    .auth()
    .onAuthStateChanged( async function(user){
        var currentUser = user;
        
        var file = "/pictures/"+currentUser?.uid + count;
       
   
    var savedRecipe = storageRef.child(file); 
    var obj = thing.toString();
    var path = await base64FromPath(photo.webPath!);
    
    if(obj === "true"){
    savedRecipe.putString(JSON.stringify({photo: path, boolean: obj,title: getRecipe(), mess: getMess(), recipe: getRecipes()})).then(function(snapshot) {
           console.log('Uploaded a raw string!');
           localStorage.removeItem('title');
           localStorage.removeItem('message');
      }).catch(error => {
               console.log(error);
      });
    

  }

  else{
    savedRecipe.putString(JSON.stringify({photo: path, boolean: obj})).then(function(snapshot) {
           console.log('Uploaded a raw string!');
      }).catch(error => {
               console.log(error);
      });

  }
  });
  
    
      count = count + 1;
      setCount(count);
      
       };

          const setRecipe= async (thing: any) => {
              setTitles(thing);
          }
          const getRecipe = () =>{
            return title;
          }

           const setRec= async (thing: any) => {
              setRecipes(thing);
          }
          const getRecipes = () =>{
            return recipe;
          }

          const setMess = async (thing: any) =>{
              setMessage(thing);
          }
          const getMess = () =>{
            return message;

          }
  
    return {
      takePhoto,
      setRecipe,
      getRecipe,
      setMess,
      getMess,
      setRec,
      getRecipes,
      message,
      title

    };
  }

  export interface Photo {
    filepath: string;
    webviewPath?: string;
    base64?: string;
  }