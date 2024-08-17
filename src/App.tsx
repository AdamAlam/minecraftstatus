import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Response } from "./Response.types";
import { LampContainer } from "./components/ui/lamp";
import { motion } from "framer-motion";

function App() {
  const [resData, setResData] = useState<Response>();

  useEffect(() => {
    axios
      .get("https://api.mcstatus.io/v2/status/java/68.203.213.74:25565")
      .then((res) => res.data)
      .then((data: Response) => setResData(data));
  }, []);

  return (
    <LampContainer className="w-[100vw]">
      {resData && (
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-[-60%] bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl mb-4"
        >
          Status:{" "}
          {resData?.online ? (
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              UP
            </span>
          ) : (
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              DOWN
            </span>
          )}
        </motion.h1>
      )}

      {resData?.online && (
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-teal-400 to-blue-600 bg-clip-text text-transparent text-2xl"
        >
          Players online: {resData.players.online}
        </motion.h2>
      )}

      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {resData?.players?.list &&
          resData.players.list.map((player, index) => (
            <motion.li
              key={player.name_clean}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8 + index * 0.1,
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="text-transparent bg-gradient-to-br from-purple-400 to-pink-600 bg-clip-text text-xl"
            >
              {player.name_clean}
            </motion.li>
          ))}
      </ul>
    </LampContainer>
  );
}

export default App;
