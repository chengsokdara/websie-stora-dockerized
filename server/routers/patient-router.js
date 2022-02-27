const express = require("express");

const PatientController = require("../controllers/patient-controller");

const router = express.Router();

router.post("/patient", PatientController.createPatient);
router.put("/patient/:id", PatientController.updatePatient);
router.delete("/patient/:id", PatientController.deletePatient);
router.get("/patient/:id", PatientController.getPatientById);
router.get("/patients", PatientController.getPatients);

module.exports = router;
