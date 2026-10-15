"use client";

import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";

export type OrderExportRow = {
  id: number;
  price: string;
  model: string;
  color: string;
  productName: string;
  payment: string;
  trackId: string;
  orderId: string;
  description: string;
  transactionId: string;
  status: string;
  customer: string;
  email: string;
  address: string;
  date: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

const columns: Array<{ key: keyof OrderExportRow; label: string }> = [
  { key: "id", label: "ID" },
  { key: "price", label: "Price" },
  { key: "model", label: "Model" },
  { key: "color", label: "Color" },
  { key: "productName", label: "Product" },
  { key: "payment", label: "Payment" },
  { key: "date", label: "Booking Date" },
  { key: "trackId", label: "Track ID" },
  { key: "orderId", label: "Order ID" },
  { key: "description", label: "Product Description" },
  { key: "transactionId", label: "Transaction ID" },
  { key: "status", label: "Status" },
  { key: "customer", label: "Customer" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "mobile", label: "Mobile Number" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
  { key: "pincode", label: "Pincode" },
];

function cellValue(row: OrderExportRow, key: keyof OrderExportRow) {
  return String(row[key] ?? "");
}

function downloadFile(content: BlobPart, type: string, extension: string, name = "rivot-orders") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}-${new Date().toISOString().slice(0, 10)}.${extension}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}

function printableTable(rows: OrderExportRow[]) {
  const head = columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const body = rows.map((row) => `<tr>${columns.map((column) => `<td>${escapeHtml(cellValue(row, column.key))}</td>`).join("")}</tr>`).join("");
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function openPrintView(rows: OrderExportRow[]) {
  const popup = window.open("", "_blank");
  if (!popup) return false;
  popup.opener = null;
  popup.document.write(`<!doctype html><html><head><title>RIVOT Orders</title><style>@page{size:landscape;margin:10mm}body{font-family:Arial,sans-serif;color:#111}h1{font-size:20px}table{width:100%;border-collapse:collapse;font-size:8px}th,td{padding:5px;border:1px solid #bbb;text-align:left}th{background:#eee}</style></head><body><h1>RIVOT Orders</h1>${printableTable(rows)}</body></html>`);
  popup.document.close();
  popup.focus();
  window.setTimeout(() => popup.print(), 250);
  return true;
}

function pdfText(value: string) {
  return value.replace(/₹/g, "Rs ").normalize("NFKD").replace(/[^\x20-\x7E]/g, " ");
}

function pdfEscape(value: string) {
  return pdfText(value).replace(/([\\()])/g, "\\$1");
}

function wrapPdfText(value: string, maxLength = 64) {
  const words = pdfText(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current && `${current} ${word}`.length > maxLength) {
      lines.push(current);
      current = "";
    }
    if (word.length > maxLength) {
      if (current) lines.push(current);
      for (let index = 0; index < word.length; index += maxLength) lines.push(word.slice(index, index + maxLength));
      current = "";
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : ["N/A"];
}

let pdfLogoRequest: Promise<string> | undefined;

function loadPdfLogo() {
  pdfLogoRequest ??= fetch("/images/rivot-logo-dark-pdf.jpg")
    .then(async (response) => {
      if (!response.ok) throw new Error("Could not load the RIVOT logo");
      const bytes = new Uint8Array(await response.arrayBuffer());
      return Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
    })
    .catch((error) => {
      pdfLogoRequest = undefined;
      throw error;
    });
  return pdfLogoRequest;
}

export function createPdf(rows: OrderExportRow[], logoJpeg: string) {
  const pageWidth = 595;
  const pageHeight = 842;
  const pdfRows = rows.length ? rows : [null];
  const objects: string[] = [""];
  const pageRefs = pdfRows.map((_, index) => `${5 + index * 2} 0 R`).join(" ");
  const logoId = 5 + pdfRows.length * 2;
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageRefs}] /Count ${pdfRows.length} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  const drawText = (value: string, x: number, y: number, size = 10, bold = false) =>
    `BT /F${bold ? "2" : "1"} ${size} Tf ${x} ${y} Td (${pdfEscape(value)}) Tj ET`;

  const roundedPath = (x: number, y: number, width: number, height: number, radius = 7) => {
    const k = radius * 0.55228475;
    return `${x + radius} ${y} m ${x + width - radius} ${y} l ` +
      `${x + width - radius + k} ${y} ${x + width} ${y + radius - k} ${x + width} ${y + radius} c ` +
      `${x + width} ${y + height - radius} l ` +
      `${x + width} ${y + height - radius + k} ${x + width - radius + k} ${y + height} ${x + width - radius} ${y + height} c ` +
      `${x + radius} ${y + height} l ` +
      `${x + radius - k} ${y + height} ${x} ${y + height - radius + k} ${x} ${y + height - radius} c ` +
      `${x} ${y + radius} l ` +
      `${x} ${y + radius - k} ${x + radius - k} ${y} ${x + radius} ${y} c h`;
  };

  pdfRows.forEach((row, index) => {
    const commands: string[] = [];
    const ink = "0.08 0.08 0.08";
    const muted = "0.34 0.35 0.36";
    const border = "0.86 0.87 0.88";
    const paleOrange = "1 0.94 0.88";
    const fillCard = (x: number, bottom: number, width: number, height: number, fill = "1 1 1") => {
      commands.push(`${fill} rg`, `${border} RG`, "0.65 w", roundedPath(x, bottom, width, height), "B");
    };
    const rule = (x1: number, y: number, x2: number) => {
      commands.push(`${border} RG`, "0.45 w", `${x1} ${y} m ${x2} ${y} l S`);
    };
    const label = (content: string, x: number, y: number, size = 8) => {
      commands.push(`${muted} rg`, drawText(content, x, y, size, true));
    };
    const value = (content: string, x: number, y: number, size = 9) => {
      commands.push(`${ink} rg`, drawText(content || "N/A", x, y, size));
    };
    const summaryCard = (x: number, title: string, content: string) => {
      fillCard(x, 661, 251, 67, "0.98 0.98 0.98");
      label(title, x + 15, 704, 8.5);
      wrapPdfText(content, 42).forEach((line, lineIndex) => value(line, x + 15, 686 - lineIndex * 11, 9));
    };
    const detailCard = (
      x: number, top: number, width: number, title: string,
      fields: Array<[string, string]>, labelWidth: number, maxLength: number,
    ) => {
      const rowHeights = fields.map(([, content]) => Math.max(21, wrapPdfText(content, maxLength).length * 11 + 10));
      const height = 31 + rowHeights.reduce((sum, rowHeight) => sum + rowHeight, 0) + 7;
      const bottom = top - height;
      fillCard(x, bottom, width, height);
      commands.push("q", roundedPath(x, bottom, width, height), "W n", `${paleOrange} rg`, `${x} ${top - 31} ${width} 31 re f`, "Q");
      commands.push(`${border} RG`, roundedPath(x, bottom, width, height), "S");
      commands.push(`${ink} rg`, drawText(title, x + 15, top - 20, 9, true));
      let rowTop = top - 31;
      fields.forEach(([fieldLabel, content], fieldIndex) => {
        const lines = wrapPdfText(content, maxLength);
        const baseline = rowTop - 14;
        label(fieldLabel, x + 15, baseline, 8.2);
        lines.forEach((line, lineIndex) => value(line, x + labelWidth, baseline - lineIndex * 11, 8.7));
        rowTop -= rowHeights[fieldIndex];
        if (fieldIndex < fields.length - 1) rule(x + 14, rowTop, x + width - 14);
      });
      return bottom;
    };

    commands.push("q", "140 0 0 31.5 38 774 cm", "/Im1 Do", "Q");
    commands.push(drawText("BOOKING DETAILS", 39, 764, 12, true));
    label("Date", 493, 790, 8);
    value(new Date().toLocaleDateString("en-IN"), 493, 777, 8);
    rule(38, 749, 557);
    commands.push("1 0.35 0.07 rg", "38 748 199 2 re f");

    if (row) {
      summaryCard(38, "ORDER ID", row.orderId);
      summaryCard(306, "BOOKING DATE", row.date);
      const customerBottom = detailCard(38, 645, 519, "CUSTOMER DETAILS", [
        ["Name", row.customer], ["Mobile", row.mobile], ["Email", row.email],
        ["Address", row.address], ["City", row.city], ["State", row.state],
        ["Country", row.country], ["Pincode", row.pincode],
      ], 154, 72);
      const lowerTop = customerBottom - 14;
      detailCard(38, lowerTop, 252, "VEHICLE DETAILS", [
        ["Model", row.model], ["Color", row.color], ["Product", row.productName],
        ["Description", row.description],
      ], 111, 27);
      detailCard(303, lowerTop, 254, "PAYMENT DETAILS", [
        ["Booking Amount", row.price], ["Payment", row.payment],
        ["Payment Status", row.status], ["Transaction ID", row.transactionId],
        ["Track ID", row.trackId],
      ], 116, 26);
    } else {
      value("No bookings found for the selected filters.", 38, 695, 12);
    }

    label(`Page ${index + 1} of ${pdfRows.length}`, 499, 32, 8);
    const content = commands.join("\n") + "\n";
    const pageId = 5 + index * 2;
    const contentId = pageId + 1;
    objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << /Im1 ${logoId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${content.length} >>\nstream\n${content}endstream`;
  });
  objects[logoId] = `<< /Type /XObject /Subtype /Image /Width 600 /Height 135 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logoJpeg.length} >>\nstream\n${logoJpeg}\nendstream`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let id = 1; id < objects.length; id += 1) pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Uint8Array.from(pdf, (character) => character.charCodeAt(0));
}

export function BookingDownloadButton({ row }: { row: OrderExportRow }) {
  const safeOrderId = row.orderId.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 50) || String(row.id);
  const paymentComplete = ["payment_completed", "confirmed"].includes(row.status.trim().toLowerCase());
  return (
    <button
      type="button"
      className="bookingDownloadButton bookingPdfButton"
      disabled={!paymentComplete}
      onClick={() => {
        if (!paymentComplete) return;
        void loadPdfLogo()
          .then((logo) => downloadFile(createPdf([row], logo), "application/pdf", "pdf", `rivot-booking-${safeOrderId}`))
          .catch(() => window.alert("Unable to download the booking PDF. Please try again."));
      }}
      aria-label={paymentComplete ? `Download booking ${row.orderId} as PDF` : `Booking ${row.orderId} PDF unavailable until payment is completed`}
      title={paymentComplete ? undefined : "Available after payment is completed"}
    >
      <FaRegFilePdf aria-hidden="true" />
      Download PDF
    </button>
  );
}

export function OrdersActions({ rows }: { rows: OrderExportRow[] }) {
  const [message, setMessage] = useState("");

  function showMessage(value: string) {
    setMessage(value);
    window.setTimeout(() => setMessage(""), 2200);
  }

  async function copyOrders() {
    const text = [columns.map((column) => column.label).join("\t"), ...rows.map((row) => columns.map((column) => cellValue(row, column.key)).join("\t"))].join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showMessage("Orders copied");
  }

  function exportCsv() {
    const csv = [columns.map((column) => csvValue(column.label)).join(","), ...rows.map((row) => columns.map((column) => csvValue(cellValue(row, column.key))).join(","))].join("\r\n");
    downloadFile(`\uFEFF${csv}`, "text/csv;charset=utf-8", "csv");
    showMessage("CSV downloaded");
  }

  function exportExcel() {
    const workbook = `<html><head><meta charset="utf-8"></head><body>${printableTable(rows)}</body></html>`;
    downloadFile(workbook, "application/vnd.ms-excel;charset=utf-8", "xls");
    showMessage("Excel file downloaded");
  }

  async function exportPdf() {
    try {
      const logo = await loadPdfLogo();
      downloadFile(createPdf(rows, logo), "application/pdf", "pdf");
      showMessage("PDF downloaded");
    } catch {
      showMessage("Unable to download PDF");
    }
  }

  return (
    <div className="ordersActions" aria-live="polite">
      <button type="button" className="miniBtn" onClick={() => void copyOrders()}>Copy</button>
      <button type="button" className="miniBtn" onClick={exportCsv}>CSV</button>
      <button type="button" className="miniBtn" onClick={exportExcel}>Excel</button>
      <button type="button" className="miniBtn" onClick={() => void exportPdf()} aria-label="Download all orders as PDF">PDF</button>
      <button type="button" className="miniBtn" onClick={() => { if (!openPrintView(rows)) showMessage("Allow pop-ups to print"); }}>Print</button>
      {message ? <span className="ordersActionMessage">{message}</span> : null}
    </div>
  );
}
