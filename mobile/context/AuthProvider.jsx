import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../components/Loading";

const AuthContext = createContext()

export const useAuth = ()=> useContext(AuthContext)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async ()=>{
            const token = await AsyncStorage.getItem('token');
            const userJSON = await AsyncStorage.getItem('user');
            if (token) {
                const user = jwt_decode(token)
                setToken(token)
                setUser(JSON.parse(userJSON))
            }
            setLoading(false)
        })()
    }, [])

    const login = async (token) => {
        const user = jwt_decode(token)
        await AsyncStorage.setItem('token', token);
        setToken(token)
        setUser(user)
    }

    const updateUser = async (update)=>{
        const userJSON = await AsyncStorage.getItem('user');
        const user = JSON.parse(userJSON)
        const newUser = {...user, ...update}
        setUser(newUser)
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
    }

    const value = {
        user,
        login,
        token,
        updateUser
    }

    if (loading) return <Loading fullScreen/>

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }