// FileUpload Component : Uploads a Single File to IPFS and returns the URL
import React, { useState } from "react";
import { FileUpload } from "react-ipfs-uploader";

const UploadIPFS = () => {
  const [fileUrl, setFileUrl] = useState("");

  return (
    <div>
      <FileUpload setUrl={setFileUrl} />
      FileUrl :{" "}
      <a className="ipfs-url" href={fileUrl} target="_blank" rel="noopener noreferrer">
        {fileUrl}
      </a>
    </div>
  );
};

export default UploadIPFS;
