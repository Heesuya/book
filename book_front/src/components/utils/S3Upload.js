import "./App.css";
import { useState } from "react";
import AWS from "aws-sdk";
import { Row, Col, Button, Input, Alert } from "reactstrap";

function S3Upload() {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const ACCESS_KEY = "AKIA5V6I63DGW23XJEY6";
  const SECRET_ACCESS_KEY = "at5Gkj9oxj8iA7KSc3zdRKu8JvftTu60W7WaAM / 3,";
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "my-first-book-story-dlqslek";

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });
}
return <div className="App"></div>;
