import UserModel from "../db/models/UserModel.js"

export const userRoutes = (app) => {
  app.get("/user", (req, res) => {
    res.send("Hello, world!")
  })

  app.get("/users", async (req, res) => {
    const users = await UserModel.find()

    if (!users) {
      return res.status(404).send("Aucun utilisateur trouvé !")
    }

    res.status(200).send(users)
  })

  app.get("/users/:userId", async (req, res) => {
    const userId = req.params.userId
    const user = await UserModel.findById(userId)

    if (!user) {
      return res.status(404).send("Aucun utilisateur trouvé !")
    }

    res.status(200).send({ message: "Utilisateur trouvé !", user })
  })

  app.put("/users/:userId", async (req, res) => {
    const userId = req.params.userId

    const userUpdated = await UserModel.findOneAndUpdate(
      { _id: userId },
      req.body,
      { new: true }
    )

    if (!userUpdated) {
      return res.status(404).send("User not found")
    }

    res.status(200).send(userUpdated)
  })

  app.delete("/users/:userId", async (req, res) => {
    const userId = req.params.userId

    await UserModel.deleteOne({ _id: userId })
    res.status(200).send("User deleted")
  })
}
