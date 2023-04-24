import express from "express";
import cors from "cors";
import { sample_designs, sample_tags } from "./data";

const app = express();
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

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
