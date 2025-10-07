import * as XLSX from "xlsx";

export async function readExcelFile(filePath) {
  const response = await fetch(filePath);
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });

  const sheets = workbook.SheetNames;
  const allData = {};

  sheets.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);
    allData[sheetName] = rows;
  });

  return allData;
}
