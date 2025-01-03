const Payment = require("../models/Payment.js");
const logger = require("../middlewares/logger.js");

// Create a Payment
exports.createPayment = async (req, res) => {
  const { paymentMethod, paymentStatus, paymentDate, amount, patientId } =
    req.body;

  try {
    // Create a new Payment
    const payment = await Payment.create({
      paymentMethod,
      paymentStatus,
      paymentDate,
      amount,
      patientId,
      status: true,
    });

    logger.info("Payment created successfully");
    return res.status(201).json({ payment });
  } catch (error) {
    logger.error("Error creating the payment", error);
    return res.status(500).json({
      message: "Unable to create the payment",
      error: error.message,
    });
  }
};

// Update a Payment
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { paymentMethod, paymentStatus, paymentDate, amount, patientId } =
    req.body;

  try {
    // Find the Payment by ID
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update the Payment
    if (paymentMethod) {
      payment.paymentMethod = paymentMethod;
    }

    if (paymentStatus) {
      payment.paymentStatus = paymentStatus;
    }

    if (paymentDate) {
      payment.paymentDate = paymentDate;
    }

    if (amount) {
      payment.amount = amount;
    }

    if (patientId) {
      payment.patientId = patientId;
    }

    await payment.save();

    logger.info("Payment updated successfully");
    return res.status(200).json({ payment });
  } catch (error) {
    logger.error("Error updating the payment", error);
    return res.status(500).json({
      message: "Unable to update the payment",
      error: error.message,
    });
  }
};

// Get all Payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();

    logger.info("Payments retrieved successfully");
    return res.status(200).json({ payments });
  } catch (error) {
    logger.error("Error getting the payments", error);
    return res.status(500).json({
      message: "Unable to get the payments",
      error: error.message,
    });
  }
};

// Get a Payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    logger.info("Payment retrieved successfully");
    return res.status(200).json({ payment });
  } catch (error) {
    logger.error("Error getting the payment", error);
    return res.status(500).json({
      message: "Unable to get the payment",
      error: error.message,
    });
  }
};

// Delete a Payment (Soft delete)
exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = false;
    await payment.save();

    logger.info("Payment deleted successfully");
    return res.status(200).json({ id });
  } catch (error) {
    logger.error("Error deleting the payment", error);
    return res.status(500).json({
      message: "Unable to delete the payment",
      error: error.message,
    });
  }
};

// Get all Payments by Patient ID
exports.getPaymentsByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const payments = await Payment.findAll({
      where: { patientId },
    });

    logger.info("Payments retrieved successfully");
    return res.status(200).json({ payments });
  } catch (error) {
    logger.error("Error getting the payments", error);
    return res.status(500).json({
      message: "Unable to get the payments",
      error: error.message,
    });
  }
};