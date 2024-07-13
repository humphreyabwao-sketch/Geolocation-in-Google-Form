# Geolocation Data Script

## Description
This project consists of a Google Apps Script and an accompanying HTML file that captures the user's geolocation data (latitude and longitude) and stores it in a Google Sheets spreadsheet. The script includes functionality to reverse geocode the coordinates to obtain the address and manages data consistency even when multiple users submit data simultaneously.

## Files
- `Code.gs`: Contains the Google Apps Script code that processes the geolocation data and updates the Google Sheets spreadsheet.
- `Index.html`: The HTML file that captures the geolocation data from the user's browser and sends it to the Google Apps Script for processing.

## Features
- **Geolocation Capture**: Uses the browser's geolocation API to capture the user's latitude and longitude.
- **Reverse Geocoding**: Converts the latitude and longitude to a human-readable address using Google Maps API.
- **Data Management**: Ensures that the geolocation data is accurately entered into the correct row in the Google Sheets spreadsheet, even with concurrent submissions.

## Installation
1. **Create a new Google Apps Script project**:
   - Go to [Google Apps Script](https://script.google.com/) and create a new project.
   
2. **Add the `Code.gs` file**:
   - Copy the contents of the `Code.gs` file and paste it into the script editor.
   
3. **Add the `Index.html` file**:
   - Create a new HTML file in the script editor named `Index.html` and copy the contents of the `Index.html` file into it.

4. **Deploy the web app**:
   - Click on the `Deploy` button in the script editor, choose `New deployment`, select `Web app`, and configure the deployment settings.

5. **Authorize the script**:
   - Follow the prompts to authorize the script to access the required resources.

6. **Access the web app**:
   - Open the provided web app URL in your browser to capture and store geolocation data.

## Usage
- When a user opens the web app, their browser will prompt them to allow access to their geolocation.
- Upon granting permission, the script will capture the latitude and longitude, reverse geocode it to an address, and store the data in the specified Google Sheets spreadsheet.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.