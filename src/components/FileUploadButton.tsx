import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

interface FileUploadButtonProps {
  onFileSelect: (file: File) => void;
  initialImage?: string | null;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect, initialImage }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // Show preview
        onFileSelect(file); // Call parent onFileSelect with the selected file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="center" alignItems="center">
      <Button variant="outlined" component="label" sx={{ mb: 3, mt: 3, width: 50, height: 50 }}>
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
      </Button>
      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Preview"
          sx={{ ml: 2, width: 100, height: 100 }}
        />
      )}
    </Box>
  );
};

export default FileUploadButton;
