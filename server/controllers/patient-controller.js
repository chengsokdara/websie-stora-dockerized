const Patient = require("../models/patient-model");

createPatient = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a patient",
    });
  }

  const patient = new Patient(body);

  if (!patient) {
    return res.status(400).json({ success: false, error: err });
  }

  patient
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: patient._id,
        message: "Patient created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Patient not created!",
      });
    });
};

updatePatient = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Patient.findOne({ _id: req.params.id }, (err, patient) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Patient not found!",
      });
    }
    patient.name = body.name;
    patient.time = body.time;
    patient.rating = body.rating;
    patient
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: patient._id,
          message: "Patient updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Patient not updated!",
        });
      });
  });
};

deletePatient = async (req, res) => {
  await Patient.findOneAndDelete({ _id: req.params.id }, (err, patient) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, error: `Patient not found` });
    }

    return res.status(200).json({ success: true, data: patient });
  }).catch((err) => console.log(err));
};

getPatientById = async (req, res) => {
  await Patient.findOne({ _id: req.params.id }, (err, patient) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, error: `Patient not found` });
    }
    return res.status(200).json({ success: true, data: patient });
  }).catch((err) => console.log(err));
};

getPatients = async (req, res) => {
  await Patient.find({}, (err, patients) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!patients.length) {
      return res
        .status(404)
        .json({ success: false, error: `Patient not found` });
    }
    return res.status(200).json({ success: true, data: patients });
  }).catch((err) => console.log(err));
};

module.exports = {
  createPatient,
  updatePatient,
  deletePatient,
  getPatients,
  getPatientById,
};
