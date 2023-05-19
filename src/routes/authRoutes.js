import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../db/models/UserModel.js";

export const authRoutes = (app) => {
  app.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send("Veuillez remplir tous les champs !");
    }
    //TODO: check if ok for this
    const emailExist = await UserModel.findOne({ email });

    if(!!emailExist) {
        return res.status(400).send("Cet email existe déjà !");
    }


    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de tours de hachage

    const user = new UserModel({ username, password: hashedPassword, email });

    await user.save();

    res.status(200).send("Utilisateur créé avec succès !");
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Veuillez remplir tous les champs !");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .send("Nom d'utilisateur ou mot de passe incorrect !");
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .send("Nom d'utilisateur ou mot de passe incorrect !");
    }

    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        userId: user._id,
      },
      "secret_key",
      { expiresIn: "3d" }
    );

    res.status(200).send({ message: "Connexion réussie !", token });
  });
};
