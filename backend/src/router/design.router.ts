import { Router } from "express";
import { sample_designs, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { DesignModel } from "../models/design.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const designsCount = await DesignModel.countDocuments();
    if (designsCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await DesignModel.create(sample_designs);
    res.send("Seed is done");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const designs = await DesignModel.find();
    res.send(designs);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const designs = await DesignModel.find({ name: { $regex: searchRegex } });
    res.send(designs);
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await DesignModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await DesignModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const designs = await DesignModel.find({ tags: req.params.tagName });
    res.send(designs);
  })
);

router.get(
  "/:designId",
  asyncHandler(async (req, res) => {
    const designs = await DesignModel.findById(req.params.designId);
    res.send(designs);
  })
);

export default router;
