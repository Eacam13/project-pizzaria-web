import { create } from 'zustand'

type AuthContextData = {
    user: UserProps | null
    isAuthenticated: boolean
    setUser: (data: UserProps) => void
    setIsAuthenticated: (user: UserProps | null) => void
    setSignIn: (data: SignInProps) => void
}

type UserProps = {
    id: string
    name: string
    email: string
}

type SignInProps = {
    email: string
    password: string
}

export const useAuthContext = create<AuthContextData>((set) => ({
    user: null,
    isAuthenticated: false,
    setSignIn: (data: SignInProps) => {},
    setUser: (data) => set({ user: data, isAuthenticated: !!data }), 
    setIsAuthenticated: (user) => set({ isAuthenticated: !!user }), 
}))
