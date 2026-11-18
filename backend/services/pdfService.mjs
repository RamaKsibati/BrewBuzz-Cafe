import PDFDocument from "pdfkit";
import { uploadReceiptToS3 } from "../services/s3Service.mjs";

export async function generateReceiptPdf(order) {
    const doc = new PDFDocument();
    const chunks = [];
    const receiptName = `receipt-${order.id}.pdf`;

    // Stream the PDF data into memory
    doc.on("data", (chunk) => {
        console.log("PDF chunk received:", chunk.length);
        chunks.push(chunk);
    });
    doc.on("end", () => {
        console.log("PDF generation finished. Total chunks:", chunks.length);
    });

    // Add content to the PDF
    doc.fontSize(20).text("BrewBuzz Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Order ID: ${order.id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
    doc.text(`Customer ID: ${order.user_id}`);
    doc.text(`Business ID: ${order.business_id}`);
    doc.moveDown();

    doc.text("Order Details:");
    order.items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.item_name} x${item.quantity} - $${item.price.toFixed(2)}`);
        if (item.modifiers.length > 0) {
            item.modifiers.forEach((mod) => {
                doc.text(`   - ${mod.name}: +$${mod.price.toFixed(2)}`);
            });
        }
    });

    doc.moveDown();
    doc.text(`Total: $${order.total_price.toFixed(2)}`, { align: "right" });

    // Finalize the PDF
    doc.end();

    // Wait for the PDF to fully stream into memory
    await new Promise((resolve) => doc.on("end", resolve));

    // Combine the chunks into a single buffer
    const pdfBuffer = Buffer.concat(chunks);

    // Debugging: Check buffer size
    console.log("PDF buffer size:", pdfBuffer.length);

    if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error("PDF buffer is empty. Failed to generate PDF.");
    }

    // Upload the PDF buffer to S3
    const receiptUrl = await uploadReceiptToS3(
        { buffer: pdfBuffer, originalname: receiptName, mimetype: "application/pdf" },
        "Receipts" // Save in the Receipts folder in S3
    );

    console.log("Receipt uploaded to S3:", receiptUrl);
    return receiptUrl; // Return the S3 URL of the uploaded receipt
}
