function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu('AutoFill Docs');
    menu.addItem('Create New Docs', 'createNewGoogleDocs')
    menu.addToUi();
  
  }
  
  function createNewGoogleDocs() {
    //This value should be the id of your document template that we created in the last step
    const googleDocTemplate = DriveApp.getFileById('1p9LQUE2a79-tF8HPIZaaR5_zHkVeKKWRVregOsWeAk8');
    
    //This value should be the id of the folder where you want your completed documents stored
    const destinationFolder = DriveApp.getFolderById('1hrcNVJf98D57fcukxPpM8GlM0LgwXlRW')
    //Here we store the sheet as a variable
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
    
    //Now we get all of the values as a 2D array
    const rows = sheet.getDataRange().getValues();
    
    //Start processing each spreadsheet row
    rows.forEach(function(row, index){
      //Here we check if this row is the headers, if so we skip it
      if (index === 0) return;
      //Using the row data in a template literal, we make a copy of our template document in our destinationFolder
      const copy = googleDocTemplate.makeCopy(`${row[3]}-${row[2]}` , destinationFolder)
      //Once we have the copy, we then open it using the DocumentApp
      const doc = DocumentApp.openById(copy.getId())
      //All of the content lives in the body, so we get that for editing
      const body = doc.getBody();
      //In this line we do some friendly date formatting, that may or may not work for you locale
      const date = new Date();
      const d = date.getDate();
      const m  = date.toLocaleString('default', { month: 'long' });
      const y = date.getFullYear();
      const friendlyDate = `${m} ${d}, ${y}`;
  
      const arr = row[3].split(" ");
      
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
  
      const job = arr.join(" ");
      
      //In these lines, we replace our replacement tokens with values from our spreadsheet row
      body.replaceText('{{Date}}', friendlyDate);
      body.replaceText('{{A_Job Position}}', job);
      body.replaceText('{{Hiring Manager}}', row[1]);
      body.replaceText('{{Company}}', row[2]);
      body.replaceText('{{Job Position}}', row[3]);
      body.replaceText('{{Referral}}', row[4]);
      body.replaceText('{{Job Description}}', row[5]);
      body.replaceText('{{Improving Points}}', row[6]);
      body.replaceText('{{Division}}', row[7]);
      body.replaceText('{{Division_Title}}', row[8]);
      body.replaceText('{{Projects}}', row[9]);
      
      //We make our changes permanent by saving and closing the document
      doc.saveAndClose();
      //Store the url of our new document in a variable
      const url = doc.getUrl();
      return url
      
      
    })
    
  }
  
  