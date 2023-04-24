import express from "express";
import cors from "cors";
import { sample_designs, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/designs", (req, res) => {
  res.send(sample_designs);
});

app.get("/api/designs/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const designs = sample_designs.filter((design) =>
    design.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(designs);
});

app.get("/api/designs/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/designs/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const designs = sample_designs.filter((design) =>
    design.tags?.includes(tagName)
  );
  res.send(designs);
});

app.get("/api/designs/:designId", (req, res) => {
  const designId = req.params.designId;
  const design = sample_designs.find((design) => design.id == designId);
  res.send(design);
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    const BAD_REQUEST = 400;
    res.status(BAD_REQUEST).send("Username or password is not valid");
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "RandomText",
    {
      expiresIn: "30d",
    }
  );
  user.token = token;
  return user;
};
const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
