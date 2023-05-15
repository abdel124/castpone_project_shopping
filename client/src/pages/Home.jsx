import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  console.log('here');
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/video/random`);
      setVideos(res.data.Items);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos && videos.map((video) => (
        <Card key={video.id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;
