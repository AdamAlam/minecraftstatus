import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Response } from "./Response.types";
import { Vortex } from "./components/ui/vortex";
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
    <div className="w-screen h-screen">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={180}
        className="flex flex-col items-center justify-center h-full"
      >
        {resData && (
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl mb-4"
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
      </Vortex>
      <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

export default App;
