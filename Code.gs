function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function getloc(value) {
  try {
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

    // Check if the geocode columns exist, otherwise create them
    if (headers.indexOf("GeoAddress") === -1) {
      respSheet.getRange(1, numColumns + 1).setValue("GeoStamp");
      respSheet.getRange(1, numColumns + 2).setValue("GeoCode");
      respSheet.getRange(1, numColumns + 3).setValue("GeoAddress");
      numColumns += 3;
    }

    // Helper function to set geo data
    function setGeoData(row, dateTime, coordinates, address, fontColor = "black") {
      respSheet.getRange(row, numColumns - 2).setValue(dateTime).setFontColor(fontColor);
      respSheet.getRange(row, numColumns - 1).setValue(coordinates).setFontColor(fontColor);
      respSheet.getRange(row, numColumns).setValue(address).setFontColor(fontColor);
    }

    // Retrieve address using Google Maps API
    var response = Maps.newGeocoder().reverseGeocode(c, d);
    if (response.status !== "OK" || !response.results.length) {
      throw new Error("Geocoding API error: " + response.status);
    }
    var address = response.results[0].formatted_address;

    // Process current response
    if (respSheet.getRange(numResponses, numColumns - 2).getValue() === "") {
      setGeoData(numResponses, currentDateTime, e, address);
    } else {
      setGeoData(numResponses, currentDateTime, e, address, "red");
    }

    // Process missing previous data
    for (var i = 0; i < numResponses; i++) {
      if (respSheet.getRange(numResponses - i, numColumns - 2).getValue() === "") {
        setGeoData(numResponses - i, currentDateTime, e, address, "red");
        break;
      }
    }
  } catch (error) {
    Logger.log("Error: " + error.message);
  }
}
