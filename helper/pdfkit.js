function pdfkit(title, header, data) {
  const PDFDocument = require('pdfkit');
  const fs = require('fs');

  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the PDF content to a writable stream (in this case, a file)
  const stream = fs.createWriteStream('output.pdf');
  doc.pipe(stream);

  // Add content to the PDF
  doc.fontSize(16).text(`Table ${title}`, { align: 'center' });
  doc.moveDown();

  // Define table headers
  const tableHeaders = header; // Use the provided header argument

  // Define table data
  const tableData = data; // Use the provided data argument

  // Set up the table
  const table = {
    headers: tableHeaders,
    rows: tableData,
  };

  // Function to draw a table
  function drawTable(table, doc, y) {
    const cellPadding = 10;
    const fontSize = 12;
    const headerColor = '#333333';
    const rowColor = '#666666';
    const textColor = '#000000';

    // Set font size for the table
    doc.fontSize(12);

    // Draw headers
    doc.fillColor(headerColor);
    table.headers.forEach((header, i) => {
      doc.text(header, i * 200, y, { width: 200, align: 'center' });
    });

    // Draw rows
    doc.fillColor(rowColor);
    table.rows.forEach((row, i) => {
      const rowY = y + (i + 1) * (fontSize + cellPadding);
      row.forEach((cell, j) => {
        doc.text(cell, j * 200, rowY, { width: 200, align: 'center' });
      });
    });

    // Set font color back to black
    doc.fillColor(textColor);
  }

  // Draw the table
  drawTable(table, doc, doc.y);

  // Finalize the PDF
  doc.end();

  console.log('PDF created successfully!');
}

module.exports=pdfkit