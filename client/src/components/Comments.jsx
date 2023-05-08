import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DivContainer = styled.div`
position: relative;

`;

const CommetDelete =styled.div`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #f00;`;


const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;


const Comments = ({videoId}) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchComments = async () => {
      try {
       
        const res = await axios.get(`/comments/?videoId=${videoId}`);
        setComments(res.data.Items);
      } catch (err) {}
    };
    fetchComments();
    return () => {
      setComments([]);
    };
  }, [videoId]);

  function handleChange(event) {
    setComment(event.target.value);
  }

  async function handleKeyDown(event) {
    if (event.keyCode === 13) { // Enter key code
      event.preventDefault();
      if (comment.trim()) {
        const res = await axios.post(`/comments/?videoId=${videoId}`, {username : currentUser.user,userId : currentUser.email,desc:comment});
        const updatedComments = [...comments, res.data];
        setComments(updatedComments);
        
        event.target.value =''
        
      }
    }
  }

  return (
    <Container>
      {currentUser  && <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..."
          onChange={handleChange}
          onKeyDown={handleKeyDown} />
      </NewComment>
      }
      {comments.map((comment)=>(
        <DivContainer>
        <Comment key={comment.id} comment={comment} user={currentUser} />
        </DivContainer>
      ))}
    </Container>
  );
};

export default Comments;
