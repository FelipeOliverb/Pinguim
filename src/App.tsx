import { useState, useEffect } from "react";
import "./App.css";
import icon from "./assets/icon.png"; // favicon importado

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Define o favicon
  useEffect(() => {
    const link: HTMLLinkElement | null = document.querySelector(
      "link[rel~='icon']"
    );
    if (link) {
      link.href = icon;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = icon;
      document.head.appendChild(newLink);
    }
  }, []);

  const gerarPinguim = async () => {
    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch(
        "https://api.pexels.com/v1/search?query=penguin&per_page=50",
        {
          headers: {
            Authorization:
              "ca48C6ePYquDTDaj29EvWaB8gz33YL5oldNBEWWi4sFnZHAw0ZMIwGrm", // sua API key do Pexels
          },
        }
      );

      if (!res.ok) throw new Error("Erro ao buscar imagem");

      const data = await res.json();
      const fotos = data.photos;
      if (!fotos.length) throw new Error("Nenhuma imagem encontrada");

      const random = fotos[Math.floor(Math.random() * fotos.length)];
      setImageUrl(random.src.large2x);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar imagem. Verifique a API key ou tente novamente.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div className="app">
      <h1>Gerador de Pinguins</h1>
      <p>Clique e veja um pinguim</p>

      <button onClick={gerarPinguim} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Pinguim"}
      </button>

      <div className="image-container">
        {imageUrl ? (
          <img
            key={imageUrl}
            src={imageUrl}
            alt="Pinguim aleatório"
            className="fade-in"
          />
        ) : (
          <p className="placeholder">Nenhuma imagem gerada ainda.</p>
        )}
      </div>
    </div>
  );
}

export default App;
