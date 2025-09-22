"use client";
import { useRouter } from "next/navigation";
import { useAuthorsContext } from "@/modules/authors/context/AuthorsContext";

const onlyDate = (s?: string) => (s ? s.split("T")[0] : "");

export default function AuthorsPage() {
  const router = useRouter();
  const { authors, loading, error, removeAuthor } = useAuthorsContext();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <section>
      <h1>Autores</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Imagen</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Nombre</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Fecha de nacimiento</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a => (
            <tr key={a.id}>
              <td style={{ padding: "6px 0" }}>
                {a.image ? (
                  <img
                    src={a.image}
                    alt={a.name}
                    width={48}
                    height={48}
                    style={{ objectFit: "cover", borderRadius: 8, display: "block" }}
                  />
                ) : (
                  <span style={{ color: "#999", fontSize: 12 }}>Sin imagen</span>
                )}
              </td>

              <td style={{ padding: "6px 0" }}>
                <button
                  onClick={() => router.push(`/authors/${a.id}/edit`)}
                  style={{ background: "transparent", border: "none", color: "#0366d6", cursor: "pointer" }}
                >
                  {a.name}
                </button>
              </td>

              <td>{onlyDate(a.birthDate)}</td>

              <td>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => router.push(`/authors/${a.id}/edit`)}>Editar</button>
                  <button onClick={() => removeAuthor(a.id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
