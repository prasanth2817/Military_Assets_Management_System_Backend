import BaseModel from "../Models/Bases.js";
import UserModel from "../Models/Users.js";

const createBase = async (req, res) => {
  try {
    const { name, code, location, region, description } = req.body;

    const base = await BaseModel.create({
      name,
      code,
      location,
      region,
      description,
      commander: null,
      logisticsOfficer: null,
    });

    res.status(201).json({ message: "Base created successfully", base });
  } catch (error) {
    console.error("Error creating base:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const assignCommanderToBase = async (req, res) => {
  try {
    const { baseId } = req.params;
    const { commanderId } = req.body;

    const base = await BaseModel.findById(baseId);
    const commander = await UserModel.findById(commanderId);

    if (!base || !commander) {
      return res.status(404).json({ message: "Base or Commander not found" });
    }

    if (commander.role !== "BaseCommander") {
      return res.status(400).json({ message: "User is not a Base Commander" });
    }

    base.commander = commander._id;
    await base.save();

    res.status(200).json({ message: "Commander assigned to base", base });
  } catch (error) {
    console.error("Error assigning commander:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const assignLogisticsOfficer = async (req, res) => {
  try {
    const { baseId } = req.params;
    const { officerId } = req.body;

    const base = await BaseModel.findById(baseId);
    const officer = await UserModel.findById(officerId);

    if (!base || !officer) {
      return res.status(404).json({ message: "Base or officer not found" });
    }

    if (officer.role !== "LogisticsOfficer") {
      return res
        .status(400)
        .json({ message: "User is not a Logistics Officer" });
    }

    // Add officer to base
    base.logisticsOfficer = officer._id;
    await base.save();

    res.status(200).json({ message: "Officer assigned successfully", base });
  } catch (error) {
    console.error("Error assigning officer:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const editBase = async (req, res) => {
  try {
    const { baseId } = req.params;
    const updateFields = req.body;

    const base = await BaseModel.findByIdAndUpdate(baseId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!base) {
      return res.status(404).json({ message: "Base not found" });
    }

    res.status(200).json({ message: "Base updated successfully", base });
  } catch (error) {
    console.error("Error updating base:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteBase = async (req, res) => {
  try {
    const { baseId } = req.params;

    const base = await BaseModel.findById(baseId);
    if (!base) {
      return res.status(404).json({ message: "Base not found" });
    }

    //  unassign base from commander
    if (base.commander) {
      await UserModel.findByIdAndUpdate(base.commander, {
        $unset: { base: null },
      });
    }

    await BaseModel.findByIdAndDelete(baseId);
    res.status(200).json({ message: "Base deleted successfully" });
  } catch (error) {
    console.error("Error deleting base:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default {
  createBase,
  assignCommanderToBase,
  assignLogisticsOfficer,
  editBase,
  deleteBase,
};
