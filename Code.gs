function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getLoc(value) {
  var destId = FormApp.getActiveForm().getDestinationId();
  var ss = SpreadsheetApp.openById(destId);
  var respSheet = ss.getSheets()[0];
  var data = respSheet.getDataRange().getValues();
  var headers = data[0];
  var numColumns = headers.length;
  var numResponses = data.length;
  var c = value[0];
  var d = value[1];
  var e = c + "," + d;
  var currentDateTime = Utilities.formatDate(new Date(), "GMT+7", "MM/dd/yyyy HH:mm:ss");

  // Check if the geocode columns exist
  if (respSheet.getRange(1, numColumns).getValue() == "GeoAddress") {
    // Filling data for second respondents onwards with no missing geo data
    if (respSheet.getRange(numResponses, numColumns - 2).getValue() == "" && respSheet.getRange(numResponses - 1, numColumns - 2).getValue() != "") {
      respSheet.getRange(numResponses, numColumns - 2).setValue(currentDateTime);
      respSheet.getRange(numResponses, numColumns - 1).setValue(e);
      var response = Maps.newGeocoder().reverseGeocode(value[0], value[1]);
      var f = response.results[0].formatted_address;
      respSheet.getRange(numResponses, numColumns).setValue(f);
    }
    // Filling data with previous geo data missing in red font
    else if (respSheet.getRange(numResponses, numColumns - 2).getValue() == "" && respSheet.getRange(numResponses - 1, numColumns - 2).getValue() == "") {
      respSheet.getRange(numResponses, numColumns - 2).setValue(currentDateTime).setFontColor("red");
      respSheet.getRange(numResponses, numColumns - 1).setValue(e).setFontColor("red");
      var response = Maps.newGeocoder().reverseGeocode(value[0], value[1]);
      var f = response.results[0].formatted_address;
      respSheet.getRange(numResponses, numColumns).setValue(f).setFontColor("red");
    }
    // Filling missing previous data in red font
    else if (respSheet.getRange(numResponses, numColumns - 2).getValue() != "") {
      for (var i = 0; i < numResponses; i++) {
        if (respSheet.getRange(numResponses - i, numColumns - 2).getValue() == "") {
          respSheet.getRange(numResponses - i, numColumns - 2).setValue(currentDateTime).setFontColor("red");
          respSheet.getRange(numResponses - i, numColumns - 1).setValue(e).setFontColor("red");
          var response = Maps.newGeocoder().reverseGeocode(value[0], value[1]);
          var f = response.results[0].formatted_address;
          respSheet.getRange(numResponses - i, numColumns).setValue(f).setFontColor("red");
          break;
        }
      }
    }
  } else {
    // Create labels in the first row
    respSheet.getRange(1, numColumns + 1).setValue("GeoStamp");
    respSheet.getRange(1, numColumns + 2).setValue("GeoCode");
    respSheet.getRange(1, numColumns + 3).setValue("GeoAddress");

    // Fill data for the first respondent
    if (numResponses == 2) {
      respSheet.getRange(numResponses, numColumns + 1).setValue(currentDateTime);
      respSheet.getRange(numResponses, numColumns + 2).setValue(e);
      var response = Maps.newGeocoder().reverseGeocode(value[0], value[1]);
      var f = response.results[0].formatted_address;
      respSheet.getRange(numResponses, numColumns + 3).setValue(f);
    } else if (numResponses > 2) {
      respSheet.getRange(numResponses, numColumns + 1).setValue(currentDateTime).setFontColor("red");
      respSheet.getRange(numResponses, numColumns + 2).setValue(e).setFontColor("red");
      var response = Maps.newGeocoder().reverseGeocode(value[0], value[1]);
      var f = response.results[0].formatted_address;
      respSheet.getRange(numResponses, numColumns + 3).setValue(f).setFontColor("red");
    }
  }
}