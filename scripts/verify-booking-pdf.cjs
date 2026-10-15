const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ts = require("typescript");

const sourcePath = path.resolve(__dirname, "../components/Admin/OrdersActions.tsx");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const pdfModule = new Module(sourcePath, module);
pdfModule.filename = sourcePath;
pdfModule.paths = Module._nodeModulePaths(path.dirname(sourcePath));
pdfModule._compile(compiled, sourcePath);

const sample = {
  id: 1,
  price: "₹499",
  model: "NX100 Pro",
  color: "Arctic White",
  productName: "NX100 Pro",
  payment: "Paid",
  trackId: "TRACK-123",
  orderId: "BOOK-123",
  description: "NX100 Pro booking",
  transactionId: "TXN-123",
  status: "PAYMENT_COMPLETED",
  customer: "Sample Customer",
  email: "sample@example.com",
  address: "123 Sample Street",
  date: "15 Oct 2026",
  mobile: "9000000000",
  city: "Belagavi",
  state: "Karnataka",
  country: "India",
  pincode: "590001",
};

const logo = fs.readFileSync(path.resolve(__dirname, "../public/images/rivot-logo-dark-pdf.jpg"), "latin1");
const pdfBytes = pdfModule.exports.createPdf([sample, { ...sample, orderId: "BOOK-456" }], logo);
const pdf = Buffer.from(pdfBytes).toString("latin1");
const xref = Number(pdf.match(/startxref\n(\d+)/)?.[1]);
const objectCount = [...pdf.matchAll(/\d+ 0 obj\n/g)].length;
const roundedPaths = [...pdf.matchAll(/0\.65 w\n([^\n]+)\nB/g)].map((match) => match[1]);
const validRoundedPaths = roundedPaths.length === 10 && roundedPaths.every((path) => {
  const tokens = path.split(/\s+/);
  return tokens.filter((token) => token === "c").length === 4 && tokens.every((token, index) =>
    token !== "c" || tokens.slice(index - 6, index).every((operand) => /^-?\d+(?:\.\d+)?$/.test(operand))
  );
});
const required = [
  "BOOK-123", "BOOK-456", "Sample Customer", "sample@example.com", "Rs 499",
  "BOOKING DETAILS", "CUSTOMER DETAILS", "VEHICLE DETAILS", "PAYMENT DETAILS", "Page 2 of 2",
  "(Date) Tj", "/Subtype /Image", "/Im1 Do",
];

if (
  !pdf.startsWith("%PDF-1.4") ||
  xref !== pdf.indexOf("xref\n") ||
  objectCount !== 9 ||
  !validRoundedPaths ||
  required.some((value) => !pdf.includes(value)) ||
  pdf.includes("(Generated) Tj") ||
  pdf.includes("NaN")
) {
  throw new Error("Booking PDF structure or content is invalid");
}

for (const [status, shouldBeDisabled] of [
  ["PAYMENT_COMPLETED", false], ["Confirmed", false], ["PAYMENT_PENDING", true],
  ["PAYMENT_FAILED", true], ["ORDER_NOT_COMPLETED", true],
]) {
  const markup = renderToStaticMarkup(React.createElement(pdfModule.exports.BookingDownloadButton, {
    row: { ...sample, status },
  }));
  if (/\sdisabled(?:=|>)/.test(markup) !== shouldBeDisabled) {
    throw new Error(`Unexpected booking download state for ${status}`);
  }
}

console.log("Booking PDF and payment-status download states verified.");

if (process.argv[2]) fs.writeFileSync(path.resolve(process.argv[2]), pdfBytes);
