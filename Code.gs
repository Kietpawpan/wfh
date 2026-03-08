function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('ระบบลงเวลา WFH - สคพ.11')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function recordTime(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Data');
  var timestamp = new Date();
  
  sheet.appendRow([timestamp, data.department, data.name, data.status]);
  
  return "บันทึกข้อมูล " + data.status + " สำเร็จเวลา " + Utilities.formatDate(timestamp, "GMT+7", "HH:mm:ss");
}
