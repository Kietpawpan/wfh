Work from Home Check-in System

1. Open Google Sheet.
2. Rename the sheet.
3. Rename Sheet1 as Data
4. Click the menu Extension.
5. Click App Script.
6. In Code.gs, enter this code:
```
   function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
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
```
    <!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;700&display=swap" rel="stylesheet">
    
    <style>
      body { 
        font-family: 'Sarabun', sans-serif; 
        padding: 20px; 
        background-color: #eef2f3; 
        color: #333;
      }
      .container { 
        max-width: 450px; 
        margin: 20px auto; 
        background: white; 
        padding: 30px; 
        border-radius: 15px; 
        box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
      }
      .header {
        text-align: center;
        margin-bottom: 25px;
      }
      .logo-text {
        font-weight: 700;
        font-size: 1.4em;
        color: #1a5276;
        margin-bottom: 5px;
      }
      .sub-text {
        font-size: 0.9em;
        color: #7f8c8d;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: 700;
        color: #2c3e50;
      }
      select, input { 
        width: 100%; 
        padding: 12px; 
        margin-bottom: 20px; 
        border-radius: 8px; 
        border: 1px solid #ced4da; 
        font-family: 'Sarabun', sans-serif; 
        font-size: 16px;
        box-sizing: border-box; 
      }
      .btn-group {
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }
      button { 
        flex: 1;
        padding: 12px; 
        color: white; 
        border: none; 
        border-radius: 8px;
        font-weight: 700; 
        font-family: 'Sarabun', sans-serif;
        font-size: 16px;
        cursor: pointer; 
        transition: background 0.3s;
      }
      .btn-in { background-color: #1a5276; }
      .btn-in:hover { background-color: #154360; }
      .btn-out { background-color: #e74c3c; }
      .btn-out:hover { background-color: #c0392b; }
      
      #status { 
        text-align: center; 
        font-weight: 700; 
        padding: 15px 10px 0px 10px;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        font-size: 0.8em;
        color: #bdc3c7;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo-text">สคพ.11 (นครราชสีมา)</div>
        <div class="sub-text">ระบบลงเวลาปฏิบัติงานออนไลน์ (WFH)</div>
      </div>
      
      <label for="dept">ส่วนงานที่สังกัด</label>
      <select id="dept">
        <option value="">-- กรุณาเลือกส่วนงาน --</option>
        <option>ส่วนอำนวยการ (สอก.)</option>
        <option>ส่วนแผนสิ่งแวดล้อม (สผส.)</option>
        <option>ส่วนการจัดการน้ำ อากาศและเสียง (สนอ.)</option>
        <option>ส่วนการจัดการขยะของเสียและสารอันตราย (สกส.)</option>
        <option>ส่วนตรวจและบังคับใช้กฎหมาย (สตบ.)</option>
        <option>ส่วนห้องปฏิบัติการฯ (สวส.)</option>
      </select>
      
      <label for="name">ชื่อ-นามสกุล</label>
      <input type="text" id="name" placeholder="ระบุชื่อและนามสกุลของท่าน">
      
      <div class="btn-group">
        <button class="btn-in" id="btnIn" onclick="submitData('เข้างาน')">ลงชื่อเข้างาน</button>
        <button class="btn-out" id="btnOut" onclick="submitData('เลิกงาน')">ลงชื่อเลิกงาน</button>
      </div>
      
      <div id="status"></div>
      
      <div class="footer">
        สำนักงานสิ่งแวดล้อมและควบคุมมลพิษที่ 11
      </div>
    </div>

    <script>
      function submitData(statusType) {
        var btnIn = document.getElementById('btnIn');
        var btnOut = document.getElementById('btnOut');
        var dept = document.getElementById('dept').value;
        var name = document.getElementById('name').value;
        
        if(!dept || !name) { 
          alert("กรุณากรอกข้อมูลให้ครบถ้วน"); 
          return; 
        }
        
        btnIn.disabled = true;
        btnOut.disabled = true;
        document.getElementById('status').style.color = "#f39c12";
        document.getElementById('status').innerHTML = "กำลังบันทึกข้อมูล...";

        var data = { department: dept, name: name, status: statusType };

        google.script.run.withSuccessHandler(function(res) {
          document.getElementById('status').style.color = "#27ae60";
          document.getElementById('status').innerHTML = "✓ " + res;
          document.getElementById('name').value = ""; 
          btnIn.disabled = false;
          btnOut.disabled = false;
        }).recordTime(data);
      }
    </script>
  </body>
</html>
```

11. Click Deploy.
12. Set as Web App, and for anyone with account.
13. Click continue.
14. Copy the link.
