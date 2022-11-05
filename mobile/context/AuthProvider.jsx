import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../components/Loading";

const AuthContext = createContext()

export const useAuth = ()=> useContext(AuthContext)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async ()=>{
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const user = jwt_decode(token)
                setUser(user)
            }
            setLoading(false)
        })()
    }, [])

    const login = async (token) => {
        const user = jwt_decode(token)
        await AsyncStorage.setItem('token', token);
        setUser(user)
    }

    const value = {
        user,
        login
    }

    if (loading) return <Loading/>

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }