import React, { useRef } from "react";
import { jsPDF } from "jspdf";

function formatDate(date: Date): string {
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();

  // Add the appropriate suffix to the day
  const dayWithSuffix: string = addOrdinalSuffix(day);

  // Concatenate the formatted date with the day suffix
  const finalFormattedDate: string = `${dayWithSuffix} ${month} ${year}`;

  return finalFormattedDate;
}

function addOrdinalSuffix(num: number): string {
  if (num >= 11 && num <= 13) {
    return `${num}th`;
  }
  const lastDigit: number = num % 10;
  switch (lastDigit) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}

const generateCertificate = (pwdNumber: string, name: string) => {
  // Get today's date
  const today: Date = new Date();

  const formattedName = name.replace(/\bnull\b/g, "");
  // Format the date
  const formattedToday: string = formatDate(today);
  console.log(formattedToday);

  const doc = new jsPDF({
    unit: "in",
    format: [11, 8.5],
    orientation: "l",
    filters: [],
  });

  var pageHeight =
    doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  doc.addImage("/img/certificate.png", 0, 0, pageWidth, pageHeight);

  doc.setFontSize(30);
  doc.text(formattedName, pageWidth / 2, 4.3, {
    align: "center",
  });
  doc.setFontSize(20);
  doc.text(pwdNumber, pageWidth / 4.1, 6.3, {
    align: "center",
  });

  doc.text(formattedToday, pageWidth / 1.27, 6.3, {
    align: "center",
  });
  return doc;
};
export const handleGeneratePdf = (pwdNumber: string, name: string) => {
  const pdf = generateCertificate(pwdNumber, name);
  pdf.save("certificate.pdf");
};

// export default function TableDemo() {
//   const pdfRef = useRef<HTMLObjectElement>(null);

//   const pdf = generateCertificate();
//   const blob = pdf.output("blob");
//   const dataUrl = URL.createObjectURL(blob);

//   if (pdfRef.current) {
//     pdfRef.current.data = dataUrl;
//     pdfRef.current.type = "application/pdf";
//   }

//   return (
// <div>
{
  /* <button onClick={handleGeneratePdf}>Generate PDF</button> */
}

{
  /* {pdfRef && (
        <object
          ref={pdfRef}
          width="100%"
          height="100%"
          type="application/pdf"
          data=""
        >
          Your browser does not support PDFs.
        </object>
      )} */
}
// </div>
//   );
// }
