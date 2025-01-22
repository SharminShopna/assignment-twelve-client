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
    const createUser = async (email, password, displayName) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName });
            const userData = {
                name: displayName,
                email: userCredential.user.email,
                image: userCredential.user.photoURL || "", 
            };
    
            await axios.post(`${import.meta.env.VITE_API_URL}/users/${userCredential.user.email}`, userData);
    
            setUser({
                ...userCredential.user,
                displayName,
            });
    
            return userCredential;
        } catch (error) {
            console.error('Error creating user:', error.message);
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('The email address is already in use by another account.');
            } else {
                throw new Error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    
    

    // Login user
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setLoading(false);
                return userCredential;
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Get JWT token and store it in localStorage
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser.email });
                localStorage.setItem('token', data.token);

                // Update or save user data to the database
                if (currentUser?.displayName && currentUser?.photoURL) {
                    await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`, {
                        name: currentUser?.displayName,
                        image: currentUser?.photoURL,
                        email: currentUser?.email,
                    });
                }
            } else {
                setUser(null);
                localStorage.removeItem('token');
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // Set axios headers to include JWT token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [user]);

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
