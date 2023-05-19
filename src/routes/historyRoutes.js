import HistoryModel from "../db/models/HistoryModel.js"
import { auth } from "../middlewares/auth.js"

export const historyRoutes = (app) => {
  app.get("/histories", auth, async (req, res) => {
    const histories = await HistoryModel.find()

    if (!histories) {
      return res.status(404).send("Aucun historique trouvé !")
    }

    res.status(200).send(histories)
  })

  app.get("/histories/:historyId", auth, async (req, res) => {
    const historyId = req.params.historyId
    const history = await HistoryModel.findById(historyId)

    if (!history) {
      return res.status(404).send("Aucun historique trouvé !")
    }

    res.status(200).send({ message: "Historique trouvé !", history })
  })

  app.get("/histories/users/:userId", async (req, res) => {
    const userId = req.params.userId
    const userHistories = await HistoryModel.find({ userId })

    if (!userHistories) {
      return res.status(404).send("Aucun historique trouvé !")
    }

    res.status(200).send({ message: "Historique trouvé !", userHistories })
  })

  app.post("/history", auth, async (req, res) => {
    const { type, ip, nmapResult } = req.body
    const userId = req.ctx.session.userId

    if (!ip || !type) {
      return res.status(400).send("Veuillez remplir tous les champs !")
    }

    const history = new HistoryModel({ ip, type, nmapResult, userId })

    await history.save()

    return res.status(200).send("Historique créé avec succès !")
  })
}
