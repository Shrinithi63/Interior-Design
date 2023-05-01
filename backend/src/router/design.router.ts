import { Router } from "express";
import { sample_designs, sample_tags } from "../data";

const router = Router();

router.get("/", (req, res) => {
  res.send(sample_designs);
});

router.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const designs = sample_designs.filter((design) =>
    design.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(designs);
});

router.get("/tags", (req, res) => {
  res.send(sample_tags);
});

router.get("/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const designs = sample_designs.filter((design) =>
    design.tags?.includes(tagName)
  );
  res.send(designs);
});

router.get("/:designId", (req, res) => {
  const designId = req.params.designId;
  const design = sample_designs.find((design) => design.id == designId);
  res.send(design);
});

export default router;
