import { spawn } from "child_process";
import { nmapParser } from "../utils/parserNmap.js";
import { isIpv4 } from "../utils/ipUtils.js";

export const nmapRoutes = (app) => {
  app.post("/nmap", async (req, res) => {
    try {
      const { ipAddress, option } = req.body;

      if (!isIpv4(ipAddress)) {
        return res.status(400).send("Invalid IP address");
      }

      const nmapProcess = spawn("nmap", [option, ipAddress]);

      let output = "";

      nmapProcess.stdout.on("data", (data) => {
        output += data.toString("utf-8");
      });

      nmapProcess.stderr.on("data", (data) => {
        console.error(data.toString("utf-8"));
      });

      nmapProcess.on("close", async (code) => {
        const data = {
          ipAddress,
          results: nmapParser(output),
        };

        res.status(200).send(data);
      });

      nmapProcess.on("error", (err) => {
        throw err;
      });
    } catch (error) {
      console.error(`Error while sending results: ${error.message}`);
    }
  });
};
