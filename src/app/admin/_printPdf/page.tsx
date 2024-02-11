"use client";
import jsPDF from "jspdf";

const generatePDF = async () => {
  const doc = new jsPDF();

  doc.text("Hello world!", 10, 10); // Sample content, you can add any content here

  // Save the PDF
  const pdfData = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfData);

  // Open the PDF in a new window for printing
  window.open(pdfUrl);
};

export default function Home() {
  const handlePrintPDF = async () => {
    await generatePDF();
  };

  return (
    <div>
      <button onClick={handlePrintPDF}>Print PDF</button>
    </div>
  );
}
