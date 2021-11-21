import React from 'react';
import { IconContext } from 'react-icons'
import { IoCloudUploadOutline } from 'react-icons/io5'

import './CreatePostForm.css';

export default function CreatePostForm({
  fileName,
  onChange,
  onSubmit,
  postTextValue
}) {
  return (
    <form onSubmit={onSubmit} className="create-post-form">
      <div className="create-post-form-file-box">
        <IconContext.Provider value={{ size: '100px', color: '#e4ccff' }}>
          <IoCloudUploadOutline/>
        </IconContext.Provider>
        {fileName ? <div className="file-name">{fileName}</div> : null}
        <div className="file-input-container">
          <label htmlFor="file-upload" className="app-button file-upload-label">
            <input type="file" id="file-upload" name="file-upload" className="file-upload-input" accept="image/png, image/gif, image/jpeg" onChange={onChange}/>
            Browse
          </label>
        </div>
      </div>
      <div className="post-text-input-container">
        <label htmlFor="post-text-input" className="post-text-input-label">Post Description</label>
        <textarea className="post-text-input" id="post-text-input" name="post-text-input" onChange={onChange} value={postTextValue}></textarea>
      </div>
      <div className="submit-button-container">
        <button className="app-button app-button-primary" type="submit">Submit</button>
      </div>
    </form>
  );
}