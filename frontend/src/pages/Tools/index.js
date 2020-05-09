import { useAuth } from "../../contexts/auth";
import React, { useEffect } from "react";
import "./style.css";
import api from "../../services/api";

export default function Tools() {
  const [tools, setTools] = React.useState([]);
  const { signed, user, signOut } = useAuth();
  console.log(signed);
  function handleSignout() {
    signOut();
  }
  useEffect(function effectFunction() {
    async function fetchTools() {
      const response = await api.get("/tools");
      setTools(response.data);
    }
    fetchTools();
  }, []);

  return (
    <div className="tools">
      <h1>Bem vindo, {user?.name}</h1>
      <h3>Mostrar as ferramentas</h3>
      <ul>
        {tools.map((tool) => (
          <>
            <li key={tool.title}>Nome: {tool.title}</li>
            <li key={tool.link}>
              Links: <a href="{tool.link}">{tool.link}</a>
            </li>
            <li key={tool.description}>Descrição: {tool.description}</li>
            <li key={tool.tags}>
              {tool.tags.map((tag) => (
                <a key={tag} href={`/tags/${tag}`}>
                  {tag},{" "}
                </a>
              ))}
            </li>
          </>
        ))}
      </ul>
      <button onClick={handleSignout}>Logout</button>
    </div>
  );
}
