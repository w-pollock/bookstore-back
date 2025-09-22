"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthorsContext } from "@/modules/authors/context/AuthorsContext";
import { Author } from "@/shared/tipos/author";

export default function EditAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const authorId = Number(id);
  const router = useRouter();
  const { authors, editAuthor } = useAuthorsContext();

  const current = useMemo(() => authors.find(a => a.id === authorId), [authors, authorId]);

  const [form, setForm] = useState<Omit<Author, "id">>({
    name: "", description: "", image: "", birthDate: "",
  });

  
  useEffect(() => {
    if (current) {
      const { id, ...rest } = current;
      setForm({ ...rest, birthDate: (current.birthDate?.split("T")[0] ?? current.birthDate) as string });
    }
  }, [current]);

  if (!current) return <p>Cargando autor…</p>;

  const isValid = form.name && form.birthDate;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    await editAuthor(authorId, form);
    router.push("/authors");
  }

  return (
    <section className="card">
      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label className="label" htmlFor="name">Nombre*</label>
          <input
            id="name"
            name="name"
            className="input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="birth">Fecha de nacimiento*</label>
          <input
            id="birth"
            type="date"
            name="birthDate"
            className="input"
            value={form.birthDate}
            onChange={e => setForm({ ...form, birthDate: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="image">Imagen (URL)</label>
          <input
            id="image"
            name="image"
            className="input"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            className="textarea"
            rows={4}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="actions">
          <button className="btn primary" type="submit" disabled={!isValid}>Guardar cambios</button>
          <button className="btn" type="button" onClick={() => router.push("/authors")}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}
