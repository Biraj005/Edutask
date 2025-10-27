import React from "react";
import "./Pdfviewer.css";

const FileViewer = ({ fileUrl, onClose }) => {
  console.log(fileUrl);

  // Normalize URL — if Cloudinary 'raw' upload doesn’t end with .pdf, append it for viewing
  const normalizedUrl = fileUrl?.includes("raw/upload") && !fileUrl.endsWith(".pdf")
    ? `${fileUrl}.pdf`
    : fileUrl;


  // Check for image or pdf
  const isImageUrl = /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(normalizedUrl);
  const isPdfUrl = /\.pdf$/i.test(normalizedUrl);
console.log(normalizedUrl)

  let fileContent;

  if (isImageUrl) {
    fileContent = (
      <img
        src={normalizedUrl}
        alt="File preview"
        className="file-viewer-content image"
      />
    );
  } else if (isPdfUrl) {
    fileContent = (
      <iframe
        src={normalizedUrl}
        title="PDF Viewer"
        className="file-viewer-content pdf"
        allow="fullscreen"
      />
    );
  } else {
    fileContent = (
      <div className="unsupported-file">
        <p>Preview is not available for this file type.</p>
        <a href={normalizedUrl} target="_blank" rel="noopener noreferrer">
          Download File
        </a>
      </div>
    );
  }

  return (
    <div className="file-viewer-popup" onClick={onClose}>
      <div
        className="file-viewer-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {fileContent}
      </div>
    </div>
  );
};

export default FileViewer;
