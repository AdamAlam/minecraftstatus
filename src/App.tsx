import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export interface Response {
  online: boolean;
  host: string;
  port: number;
  ip_address: string;
  eula_blocked: boolean;
  retrieved_at: number;
  expires_at: number;
  srv_record: null;
  version: Version;
  players: Players;
  motd: MOTD;
  icon: null;
  mods: any[];
  software: null;
  plugins: any[];
}

export interface MOTD {
  raw: string;
  clean: string;
  html: string;
}

export interface Players {
  online: number;
  max: number;
  list: any[];
}

export interface Version {
  name_raw: string;
  name_clean: string;
  name_html: string;
  protocol: number;
}

function App() {
  const [resData, setResData] = useState<Response>();

  useEffect(() => {
    axios
      .get("https://api.mcstatus.io/v2/status/java/68.203.213.74:25565")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data: Response) => setResData(data));
  }, []);

  return (
    <>
      {resData && (
        <h1>
          Status:{" "}
          {resData?.online ? (
            <span style={{ color: "green" }}>UP</span>
          ) : (
            <span style={{ color: "red" }}>NO, TOUCH GRASS</span>
          )}
        </h1>
      )}

      {resData?.online && <h2>Players online: {resData.players.online}</h2>}
      <ul>
        {resData?.players.list &&
          resData.players.list.map((player) => <li>{player.name_clean}</li>)}
      </ul>
    </>
  );
}

export default App;
