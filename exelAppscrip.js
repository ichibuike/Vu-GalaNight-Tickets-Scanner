const SHEET_NAME = 'Sheet1'; // Make sure this matches your actual sheet name

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  
  if (!data.code || !data.timestamp) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'invalid' }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  const scannedCodes = sheet.getDataRange().getValues().map(row => row[0]);

  if (scannedCodes.includes(data.code)) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'duplicate' }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([data.code, data.timestamp]);
  return ContentService.createTextOutput(JSON.stringify({ status: 'new' }))
                       .setMimeType(ContentService.MimeType.JSON);
}
