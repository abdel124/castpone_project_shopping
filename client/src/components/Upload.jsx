import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContactlessOutlined } from "@mui/icons-material";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen , user}) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate()
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
 

  const uploadFile = (file, urlType ) => {
    const fileName = new Date().getTime() + file.name;

  };
  /*useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);*/

  const handleUpload = async (e)=>{
    e.preventDefault();

    console.log(inputs)

    const options = {
      headers: {
        'Content-Type': 'image/jpeg' // Set the Content-Type header
      },
      onUploadProgress: (progressEvent) => {
        const percentComplete = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setImgPerc(percentComplete);
      },
    };
    const options_1 = {
      headers: {
        'Content-Type': 'video/mp4' // Set the Content-Type header
      },
      onUploadProgress: (progressEvent) => {
        const percentComplete = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setVideoPerc(percentComplete);
      },
    };
    if (!img || !video) {
      alert('please check if you have selected video or image')
    }
    else {
    const res = await axios.post("/video", {...inputs})
    console.log(res.data[0])
    console.log(res.data[1])
    await axios.put(res.data[0], img,options)
    await axios.put(res.data[1], video,options_1)
    setOpen(false)
    //res.status===200 && navigate(`/video/${res.data.id}`)
    }
    
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <div>
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
          {videoPerc > 0 && <div>Upload progress: {videoPerc}%</div>}
          </div>
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          {imgPerc > 0 && <div>Upload progress: {imgPerc}%</div>}
          </div>
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
