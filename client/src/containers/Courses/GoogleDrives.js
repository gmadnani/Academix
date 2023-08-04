import { google } from 'googleapis';

const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your OAuth 2.0 client ID
const API_KEY = 'YOUR_API_KEY'; // Replace with your API Key
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

export const authorizeGoogleDrive = (onSuccess, onError) => {
  window.gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [discoveryUrl],
      scope: SCOPES.join(' '),
    })
    .then(() => {
      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          onSuccess(window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
        })
        .catch((error) => onError(error));
    });
};

export const listFiles = (accessToken, onSuccess, onError) => {
  const drive = google.drive({
    version: 'v3',
    auth: accessToken,
  });

  drive.files
    .list({
      pageSize: 10, // Number of files to retrieve per request
      fields: 'nextPageToken, files(id, name, mimeType)', // Specify the fields you want to retrieve
    })
    .then((response) => {
      onSuccess(response.data.files);
    })
    .catch((error) => {
      onError(error);
    });
};
