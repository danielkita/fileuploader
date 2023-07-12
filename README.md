# Simple File Uploader

This is a simple file uploader application that allows you to upload files via an API. Once a file is uploaded, it will return a unique URL where the file can be downloaded. The file will be automatically deleted after 5 seconds from the first download attempt.

## API Method

There is one main API method:

### `POST /`

This method is used to upload a file to the application. 

Upon successful upload, the API will return a response in the following JSON format:

```json
{
    "url": "http://localhost:3456/upload/<file-uuid>"
}
```

This URL can be used to download the uploaded file. Please note that the file will only be available for 5 seconds after it has been downloaded for the first time.


## Usage

To upload a file, make a POST request to the `/` endpoint. Note that the request must be of `multipart/form-data` type and the file should be included in the `file` field. 

The server will respond with a JSON containing the unique URL of the uploaded file. Use this URL to download the file. If the file is not downloaded within 5 seconds, the file will be automatically deleted.

## Disclaimer
This repository is for demonstrative purposes only. It does not provide extensive error handling or support for large files. For production ready file upload solutions, consider implementing additional features like authentication, progress tracking, error handling, and support for large file uploads.