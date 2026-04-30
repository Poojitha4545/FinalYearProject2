import mongoose from "mongoose";
const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
     coordinates: {
      type: [Number],     
      required: true,
    }
  },
});
const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;