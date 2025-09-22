"use client";

import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useAuthors } from "../hooks/useAuthors";

type Ctx = ReturnType<typeof useAuthors> & {
    favoritos: Set<number>;
    isFavorito: (id: number) => boolean;
    toggleFavorito: (id: number) => void;
}

const AuthorsCtx = createContext<Ctx | null>(null);

export function AuthorsProvider({ children}: {children: React.ReactNode}){
    const api = useAuthors();
    const [favoritos, setFavoritos] = useState<Set<number>>(new Set());

    useEffect( () => {
        try{
            const r = localStorage.getItem("favoriteAuthors");
            if (r) setFavoritos(new Set(JSON.parse(r) as number[]));
        }catch{}
    }, []);

    useEffect( () => {
        localStorage.setItem("favoriteAuthors", JSON.stringify(Array.from(favoritos)));
    }, [favoritos]);

    const isFavorito = (id: number) => favoritos.has(id);
    const toggleFavorito = (id: number) =>
        setFavoritos(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    const removeAuthor = async(id: number) => {
        await api.removeAuthor(id);
        setFavoritos(prev => {
            if (!prev.has(id)) return prev;
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    const value: Ctx = {
        ...api,
        removeAuthor,
        favoritos,
        isFavorito,
        toggleFavorito,

    };

    return <AuthorsCtx.Provider value={value}>{children}</AuthorsCtx.Provider>
}

export function useAuthorsContext() {
    const ctx = useContext(AuthorsCtx);
    if (!ctx) throw new Error("UseAuthorsContext debe usarse dentro de <AuthorsProvider>");
    return ctx;
}