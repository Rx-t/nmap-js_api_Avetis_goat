import jsonwebtoken from "jsonwebtoken";

export const auth = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  const token = authorization;

  if (!token) {
    res.status(403).send({ error: "Forbidden" });

    return;
  }

  try {
    const payload = jsonwebtoken.verify(token, "secret_key");

    req.ctx.session = payload;

    next();
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      res.status(403).send({ error: "Forbidden" });

      return;
    }

    console.error(err);

    res.status(500).send({ error: "Oops. Something went wrong." });
  }
};
