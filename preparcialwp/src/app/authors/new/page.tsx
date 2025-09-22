"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthorsContext } from "@/modules/authors/context/AuthorsContext";
import { Author } from "@/shared/tipos/author";

type Draft = Omit<Author, "id">;

export default function NewAuthorPage() {
  const router = useRouter();
  const { addAuthor } = useAuthorsContext();

  const [form, setForm] = useState<Draft>({
    name: "",
    description: "",
    image: "",
    birthDate: "",
  });
  const [touched, setTouched] = useState<Record<keyof Draft, boolean>>({
    name: false, description: false, image: false, birthDate: false,
  });

  const errors: Partial<Record<keyof Draft, string>> = {};
  if (!form.name) errors.name = "El nombre es obligatorio";
  if (!form.birthDate) errors.birthDate = "La fecha es obligatoria";
  const isValid = Object.keys(errors).length === 0;

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTouched(prev => ({ ...prev, [e.target.name as keyof Draft]: true }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    await addAuthor(form);
    router.push("/authors");
  }

  return (
    <section className="card">
      <p className="help">Los campos con * son obligatorios.</p>

      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label className="label" htmlFor="name">Nombre*</label>
          <input
            id="name"
            name="name"
            className="input"
            placeholder="Ej. Gabriel García Márquez"
            value={form.name}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {touched.name && errors.name && <p id="err-name" className="error">{errors.name}</p>}
        </div>

        <div className="field">
          <label className="label" htmlFor="birth">Fecha de nacimiento*</label>
          <input
            id="birth"
            type="date"
            name="birthDate"
            className="input"
            value={form.birthDate}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={touched.birthDate && !!errors.birthDate}
            aria-describedby={errors.birthDate ? "err-birth" : undefined}
          />
          {touched.birthDate && errors.birthDate && <p id="err-birth" className="error">{errors.birthDate}</p>}
        </div>

        <div className="field">
          <label className="label" htmlFor="image">Imagen (URL)</label>
          <input
            id="image"
            name="image"
            className="input"
            placeholder="https://…/foto.jpg"
            value={form.image}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            className="textarea"
            placeholder="Biografía corta…"
            rows={4}
            value={form.description}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        <div className="actions">
          <button className="btn primary" type="submit" disabled={!isValid}>Guardar</button>
          <button className="btn" type="button" onClick={() => router.push("/authors")}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}
