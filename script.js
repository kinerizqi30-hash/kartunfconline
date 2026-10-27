function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var headers = rows[0];
  var data = [];
  
  // Ambil parameter ID jika ada (contoh: ?id=1)
  var requestedId = e && e.parameter && e.parameter.id ? e.parameter.id : "1";

  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0].toString() === requestedId.toString()) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = rows[i][j];
      }
      return ContentService.createTextOutput(JSON.stringify(obj))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // Default ambil baris pertama jika ID tidak ditemukan
  var obj = {};
  for (var j = 0; j < headers.length; j++) {
    obj[headers[j]] = rows[1][j];
  }
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}