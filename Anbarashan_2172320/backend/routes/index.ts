import express from "express";
import { createRecord } from "../controllers/criminalRecords.js";
// We will create a router object
const router = express.Router();
router.post("/", createRecord);
// We will export the router
export default router;
