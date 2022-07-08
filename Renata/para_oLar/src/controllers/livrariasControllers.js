const libraryModel = require("../model/librarySchema");

const getAll = async (req, res) => {
  libraryModel.find((error, libraries) => {
    if (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
    return res.status(200).json(libraries);
  });
};

const createLibrary = async (req, res) => {
  try {
    const newLibrary = new libraryModel(req.body);
    const savedLibrary = await newLibrary.save();

    return res.status(201).send({
      message: "Livraria Criada com Sucesso",
      savedLibrary,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateLibraryById = async (req, res) => {
  try {
    const findLibrary = await libraryModel.findById(req.params.id);

    if (findLibrary) {
      findLibrary.name = req.body.name || findLibrary.name;
      findLibrary.address = req.body.address || findLibrary.address;
      findLibrary.site = req.body.site || findLibrary.site;
    }

    const savedLibrary = await findLibrary.save();

    return res.status(200).send({
      message: "Livraria atualizada com sucesso!",
      savedLibrary,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteLibraryById = async (req, res) => {
  try {
    const libraryFind = await libraryModel.findById(req.params.id);

    await libraryFind.delete();

    return res.status(200).send({
      mensagem: `Livraria '${libraryFind.nome}' deletada com sucesso!`,
      libraryFind,
    });
  } catch (error) {
    return res.status(400).send({
      mensagem: error.message,
    });
  }
};

module.exports = {
  getAll,
  createLibrary,
  updateLibraryById,
  deleteLibraryById,
};
