import mongoose from "mongoose"
import HistorySchema from "../schemas/HistorySchema.js"

const HistoryModel = mongoose.model("History", HistorySchema)

export default HistoryModel
