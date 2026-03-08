Work from Home Check-in System

1. Open Google Sheet.
2. Rename the sheet.
3. Rename Sheet1 as Data
4. Click the menu Extension.
5. Click App Script.
6. In Code.gs, enter this code:

   ```
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
   ```
8. Add a new HTML file, named index.html.
9. Add this code in the index.html file:
10. Click Deploy.
11. Set as Web App, and for anyone with account.
12. Click continue.
13. Copy the link.
