import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f2f2f2",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", color: "#333", marginBottom: "1rem" }}>
        Welcome to TaskIt
      </h1>
      <h2 style={{ fontSize: "1.5rem", color: "#666", marginBottom: "2rem", textAlign: "center" }}>
        An easy, fast way to manage your tasks
      </h2>
      <button
        onClick={() => navigate("/home")}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Get Started
      </button>
    </div>
  );
}

export default Welcome;
