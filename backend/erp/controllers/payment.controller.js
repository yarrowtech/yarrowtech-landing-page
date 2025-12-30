import ERPPayment from "../models/Payment.js";
import ERPProject from "../models/Project.js";
import sendEmail from "../utils/sendEmail.js";
import { generateInvoicePDF } from "../utils/generateInvoice.js";

export const addPayment = async (req, res) => {
  try {
    const { projectId, amount, method } = req.body;

    // 1️⃣ Find project
    const project = await ERPProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2️⃣ Generate invoice number
    const invoiceNo = `INV-${Date.now()}`;

    // 3️⃣ Save payment
    const payment = await ERPPayment.create({
      project: project._id,
      clientEmail: project.clientEmail,
      amount,
      method,
      invoiceNo,
      status: "paid",
    });

    // 4️⃣ Generate invoice PDF
    const invoicePath = generateInvoicePDF(payment, project);

    // 5️⃣ Send invoice email
    await sendEmail(
      project.clientEmail,
      `Invoice ${invoiceNo} | YarrowTech`,
      `Hello ${project.clientName},

We have received your payment successfully.

Invoice No: ${invoiceNo}
Project: ${project.name}
Amount Paid: ₹${amount}
Payment Method: ${method}

Please find the invoice attached.

Thank you,
YarrowTech Team`,
      [
        {
          filename: `invoice-${invoiceNo}.pdf`,
          path: invoicePath,
        },
      ]
    );

    // 6️⃣ Response
    res.json({
      success: true,
      message: "Payment added & invoice sent",
      payment,
    });

  } catch (err) {
    console.error("❌ PAYMENT ERROR:", err);
    res.status(500).json({ message: "Payment failed" });
  }
};
