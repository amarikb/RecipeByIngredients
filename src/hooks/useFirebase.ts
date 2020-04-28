import * as firebase from 'firebase';
import {useHistory} from "react-router-dom";

export function useFirebase() {
 let history = useHistory();


  const googleLogout = async () => {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
       
             console.log("logout successful ");
             localStorage.clear();
              window.location.href = '/';

         
         }).catch(function(error) {
  // An error happened.
       });
  }
  
  
  const googleLogin = async () => {
      
    var provider = new firebase.auth.GoogleAuthProvider();
    
             firebase.auth().signInWithPopup(provider).then(result => {

              firebase.auth().onAuthStateChanged(function(user) {
                       user = result.user;

             })
            
              history.push({
                      pathname: "/tab1"
              })
              
              
                   
            }).catch(function(error) {
        });
      
  }

  return {
    googleLogin,
    googleLogout,
    
  };
}