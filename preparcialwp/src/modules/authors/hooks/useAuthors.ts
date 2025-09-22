"use client";

import { useEffect } from "react";
import { useState } from "react";
import { getAuthors } from "@/shared/servicios/authors";
import { createAuthor } from "@/shared/servicios/authors";
import { updateAuthor } from "@/shared/servicios/authors";
import { deleteAuthor } from "@/shared/servicios/authors";
import { Author } from "@/shared/tipos/author";

export function useAuthors(){
    const[ authors, setAuthors] = useState<Author[]>([]);
    const[ loading, setLoading] = useState(true);
    const[error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try{
                setLoading(true);
                const data = await getAuthors();
                setAuthors(data);
            } catch (e){
                setError((e as Error).message);
            } finally{
                setLoading(false);
            }
        })();
    }, []);

    async function addAuthor(data: Omit<Author, "id">) {
        const created = await createAuthor(data);
        setAuthors(prev => [created, ...prev]);
    }

    async function editAuthor(id:number, data: Omit<Author, "id">) {
        const updated = await updateAuthor(id, data);
        setAuthors(prev => prev.map(a => (a.id === id ? updated : a)));
    }

    async function removeAuthor(id:number) {
        await deleteAuthor(id);
        setAuthors(prev => prev.filter(a => a.id !== id));
    }

    return { authors, loading, error, addAuthor, editAuthor, removeAuthor};
}