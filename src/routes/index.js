import { userRoutes } from "./userRoutes.js";
import { historyRoutes } from "./historyRoutes.js";
import { authRoutes } from "./authRoutes.js";
import { nmapRoutes } from "./nmapRoutes.js";

export const router = (app) => {
  userRoutes(app);
  historyRoutes(app);
  authRoutes(app);
  nmapRoutes(app);
};
