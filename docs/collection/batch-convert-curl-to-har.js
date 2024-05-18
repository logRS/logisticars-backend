import { readFile, writeFile } from 'fs';
import curlToHar from 'curl-to-har';

// Read the http.rest file
readFile('./http.rest', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the file content by each request
  const requests = data.split('###');
  
  
  
  // Convert each curl request to HAR format
  const harRequests = requests.map((curl) => {

    const filtered=curl.split('\n').slice(1).join('\n')    //delete the first line of each requests
    const regexToRemove = /##.*/g
    const filtered2 = filtered.replace(regexToRemove, '')

    console.log('fi', filtered2,'end' )    
    const har = curlToHar(filtered2);
    return har;
  });

  // Save the HAR requests to a new file
  writeFile('./converted-requests.har', JSON.stringify(harRequests, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Curl requests converted to HAR format successfully!');
  });
});