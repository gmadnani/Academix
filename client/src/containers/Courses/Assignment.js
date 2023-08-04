import React, { useState, useEffect } from "react";
import { FileViewer } from "react-file-viewer-extend";
import { Editor, EditorState, RichUtils } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Document, Page } from "react-pdf";
import DocViewer from "react-doc-viewer";
import PdfPreview from '../../pdfPreview';
import {
  Button,
  Header,
  Image,
  Input,
  Modal,
  TextArea,
} from "semantic-ui-react";
// import { authorizeGoogleDrive, listFiles } from '../Courses/GoogleDrives';
import { gapi } from "gapi-script";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Assignment = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [selectedFile, setSelectedFile] = useState(null);
  const [googleFiles, setGoogleFiles] = useState([]);
  const handleGoogleLoginSuccess = (accessToken) => {
    // listFiles(
    // accessToken,
    // (files) => {
    //     setGoogleFiles(files);
    // },
    // (error) => {
    //     console.error('Error listing files:', error);
    // }
    // );
  };
  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
  };

  const handleGoogleLogin = () => {
    // authorizeGoogleDrive(handleGoogleLoginSuccess, handleGoogleLoginFailure);
  };

  const handleSelectChange = (event) => {
    const fileId = event.target.value;
    setSelectedFile(files.find((file) => file.id === fileId));
  };

  // const [filePreview, setFilePreview] = useState(null);

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleSelectFile = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // // Create a FileReader to read the uploaded file
    // const reader = new FileReader();

    // // Set up the FileReader's onLoad event to set the file preview data
    // reader.onload = (e) => {
    //   setFilePreview(e.target.result);
    // };

    // // Read the uploaded file as a data URL (base64 format)
    // reader.readAsDataURL(file);
  };

  useEffect(() => {
    // Load Google Drive API when the component mounts
    window.gapi.load("client", () => {
      window.gapi.client.load("drive", "v3", () => {
        console.log("Google Drive API loaded.");
      });
    });
  }, []);

  const files = acceptedFiles.map((file) => (
    <p key={file.path}>
      {file.path} - {file.size} bytes
    </p>
  ));

  const handleSubmit = () => {
    setOpen(false);
  };
  const uploadGoogleFiles = () => {
    const CLIENT_ID = "livedream0630@gmail.com";
    const SCOPES = "https://www.googleapis.com/auth/drive.readonly";
    const discoveryUrl =
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
    gapi.auth
      .getClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: [discoveryUrl],
      })
      .then(() => {
        // Authenticate the user if needed (you can also check if the user is already signed in)
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
          return gapi.auth2.getAuthInstance().signIn();
        }
      })
      .then(() => {
        // Upload the files to Google Drive
        files.forEach((file) => {
          const metadata = {
            name: file.name,
            mimeType: file.type,
          };

          const accessToken = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().access_token;

          const form = new FormData();
          form.append(
            "metadata",
            new Blob([JSON.stringify(metadata)], { type: "application/json" })
          );
          form.append("file", file);

          axios
            .post(
              "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
              form,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": 'multipart/related; boundary="foo_bar_baz"',
                },
                responseType: "json",
              }
            )
            .then((response) => {
              console.log("File uploaded:", response.data.name);
            })
            .catch((error) => {
              console.error("Error uploading file:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  };

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid",
        borderRadius: "20px",
      }}
    >
      <h1>Assignment 1</h1>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={
          <div
            style={{
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button>Create a submission</Button>
          </div>
        }
      >
        <Modal.Header>Submission</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {/* <Modal.Description style={{ display: "flex", justifyContent: "space-around" }}> */}

            <div>
              <h4>Create Submission</h4>
              <div style={{ display: "flex" }}>
                <button onClick={handleBoldClick}>
                  <b>B</b>
                </button>
                <button onClick={handleItalicClick}>
                  <i>I</i>
                </button>
                <button onClick={handleUnderlineClick}>
                  <u>U</u>
                </button>
              </div>
              <div
                style={{ width: "100%", height: "300px", border: "1px solid" }}
              >
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  placeholder="Start typing here..."
                />
              </div>
            </div>

            <div style={{ marginTop: 30 }}>
              <h4>Upload Files</h4>
              <div style={{ display: "flex" }}>
                <input type="file" onChange={handleSelectFile} />
                {/* File preview */}
                {selectedFile && (
                  <div>
                    <h4>File Preview</h4>
                    {/* For PDF files */}
                    {selectedFile.type === "application/pdf" && (
                      <div style={{ width: "300px", height: "300px" }}>
                        <PdfPreview url={URL.createObjectURL(selectedFile)} />
                      </div>
                    )}
                    {/* For DOCX files */}
                    {selectedFile.type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                      <DocViewer
                        documents={[{ uri: URL.createObjectURL(selectedFile) }]}
                      />
                    )}
                  </div>
                )}
                <p style={{ marginLeft: 10, alignSelf: "center" }}>{files}</p>
              </div>
              <div style={{ margin: "10px 0", padding: 0 }}>
                <button
                  class="ui icon button"
                  style={{
                    width: 200,
                    textAlign: "left",
                    padding: "13px 10px",
                  }}
                >
                  <i class="cloud icon"></i>
                  &nbsp;&nbsp;&nbsp;Google Cloud Service
                </button>
              </div>
            </div>

            <div style={{ marginTop: 30 }}>
              <h4>Comment</h4>
              <TextArea
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "12px",
                  borderRadius: "8px",
                  borderColor: "#CCC",
                  resize: "none",
                }}
                placeholder="comment"
              ></TextArea>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            onClick={handleSubmit}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
export default Assignment;