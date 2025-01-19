import { createContext, useEffect, useState } from "react";
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
    const [loading, setLoading] = useState(true);

    // Create a new user
    const createUser = (email, password, displayName) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Set the displayName explicitly after user creation
                return updateProfile(userCredential.user, {
                    displayName: displayName,
                }).then(() => {
                    setUser({
                        ...userCredential.user,
                        displayName: displayName, // Ensure it's updated in the state
                    });
                    setLoading(false);
                });
            })
            .catch((error) => {
                console.error('Error creating user: ', error);
                setLoading(false);
            });
    };

    // Login user
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Login error: ', error);
                setLoading(false);
            });
    };

    // Log out user
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

    // Update user profile
    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    };

    // Effect to handle user login status and user data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Check if displayName is missing and update it if necessary
                if (!currentUser.displayName) {
                    await updateProfile(currentUser, {
                        displayName: 'Default Name', // Set a default name if missing
                    });
                    currentUser.displayName = 'Default Name'; // Update the currentUser object
                }

                // Set the user in state
                setUser(currentUser);

                // Optionally, save user info to your backend (e.g., MongoDB)
                await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`, {
                    name: currentUser?.displayName,
                    image: currentUser?.photoURL,
                    email: currentUser?.email,
                });
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        userLogin,
        setUser,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
