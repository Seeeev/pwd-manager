"use client";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function Print() {
  const fullName = "Seven F. Abante";
  const birthDate = "11/11/11";
  const gender = "Male";
  const disability = "Lorem, ipsum dolor.";
  const bloodType = "a+";
  const address = "Lorem ipsum dolor sit amet";
  const contactNumber = "0912312312";

  const pdfRef = useRef<HTMLObjectElement>(null);
  const doc = new jsPDF({
    unit: "in",
    format: [11, 8.5],
    orientation: "p",
    filters: [],
  });
  doc.text("PWD: Number: 12-121-1211-111111",1,1);
  doc.text(`Full Name: ${fullName}`, 1, 1.3);
  doc.text(`Birth Date: ${birthDate}`, 1, 1.6);
  doc.text(`Gender: ${gender}`, 1, 1.9);
  doc.text(`Disability: ${disability}`, 1, 2.2);
  doc.text(`Blood Type: ${bloodType}`, 1, 2.5);
  doc.text(`Address: ${address}`, 1, 2.8);
  doc.text(`Contact Number: ${contactNumber}`, 1, 3.1);

  const blob = doc.output("blob");
  const dataUrl = URL.createObjectURL(blob);

  if (pdfRef.current) {
    pdfRef.current.data = dataUrl;
    pdfRef.current.type = "application/pdf";
  }

  return (
    <>
      <div className="h-[600px]">
        {pdfRef && (
          <object
            ref={pdfRef}
            width="100%"
            height="100%"
            type="application/pdf"
            data=""
          >
            Your browser does not support PDFs.
          </object>
        )}
      </div>
    </>
  );
}
