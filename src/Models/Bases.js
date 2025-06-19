// import mongoose from "./index.js";

// const baseSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//     uppercase: true,
//     trim: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   region: {
//     type: String,
//     required: false
//   },
//   commander: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: false // Optional if a commander user is assigned to this base
//   },
//   description: {
//     type: String
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Base', baseSchema);