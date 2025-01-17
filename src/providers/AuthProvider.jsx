import { createContext, useEffect, useState } from "react";
// import { app } from "../firebase/firebase.config";
import { 
    createUserWithEmailAndPassword, 
     
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const auth = getAuth(app);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = async () => {
        setLoading(true); 
        try {
            await signOut(auth); 
            setUser(null); 
            setLoading(false); 
        } catch (error) {
            console.error("Logout failed:", error);
            setLoading(false); 
        }
    };
    

    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    };

    const authInfo = {
        user,
        loading,
        createUser,
        userLogin,
        setUser,
        logOut,
        updateUserProfile,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            
            console.log('current user', currentUser?.email);
            if(currentUser?.email){
                setUser(currentUser);
                // save user info in mongodb
                await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,{
                    name:currentUser?.displayName,
                    image:currentUser?.photoURL,
                    email:currentUser?.email,
                    
                })

              
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;