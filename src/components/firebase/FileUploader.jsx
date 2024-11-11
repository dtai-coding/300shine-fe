import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { storage } from '../../../firebaseConfig';

const FileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  FileUploader.propTypes = {
    onUploadSuccess: PropTypes.func.isRequired,
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0); // Reset progress on new file selection
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        onUploadSuccess(url); // Returns the URL to the parent component
        setFile(null); // Optional: reset file input
        setUploadProgress(0); // Optional: reset progress
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
    </div>
  );
};

export default FileUploader;
