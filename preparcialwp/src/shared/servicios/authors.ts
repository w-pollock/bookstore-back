import { Author } from "../tipos/author";

const BASE = "/api/authors";

export async function getAuthors(): Promise<Author[]> {
    const res= await fetch(BASE, {cache: "no-store"});
    if (!res.ok) throw new Error("Hubo un error fetching a los autores");
    return res.json();
    
}

export async function createAuthor(data: Omit<Author, "id">): Promise<Author> {
    const res = await fetch(BASE, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hubo un error creando el autor");
    return res.json();
}

export async function updateAuthor(id: number, data: Omit<Author, "id">): Promise<Author> {
    const res = await fetch(`${BASE}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hubo un error actualizando el autor");
    return res.json();
}

export async function deleteAuthor(id: number): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, {method: "DELETE"});
    if (!res.ok) throw new Error("Hubo un error borrando el autor");
    
}