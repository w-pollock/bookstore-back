import Link from "next/link";

export default function Home() {
  const btn: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    textDecoration: "none",
    display: "inline-block",
  };
  const primary: React.CSSProperties = { ...btn, background: "#111", color: "#fff" };

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>¡Bienvenido a PreParcial!</h2>
        <p style={{ color: "#555", lineHeight: 1.5 }}>
          Tiene las siguientes opciones:
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
          <Link href="/authors" style={primary}>Ver autores</Link>
          <Link href="/crear" style={btn}>Crear autor</Link>
        </div>
      </div>
    </main>
  );
}
