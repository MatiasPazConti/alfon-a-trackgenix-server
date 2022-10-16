import Admins from '../models/Admins';

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndDelete(id);
    if(result == null){
      throw new Error(`There is no admin with id ${id}`);
    }else{
      return res.status(200).json({
        message: `Admin with id ${id} deleted.`,
        data: result,
        error: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const modifyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `Admin with id ${id} modified.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export default {
  deleteAdmin,
  modifyAdmin,
};
