import React from "react";

const Loading = () => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Ocupa a altura total da janela
      backgroundColor: "#f4f4f4", // Cor de fundo opcional
    },
    text: {
      fontSize: "1.5rem", // Tamanho do texto
      color: "#333", // Cor do texto
      fontFamily: "Arial, sans-serif",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.text}>Carregando...</h2>
    </div>
  );
};

export default Loading;
