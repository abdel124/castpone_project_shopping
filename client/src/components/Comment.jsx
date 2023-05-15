import userEvent from "@testing-library/user-event";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
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

const Text = styled.span`
  font-size: 14px;
  whiteSpace: 'pre-wrap'
`;

const Comment = ({ comment , user }) => {
  const [channel, setChannel] = useState({});

  /*useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);*/

  async function handelDeleteComment(event) {
    // Enter key code
      event.preventDefault();
        if (!user){
            alert('your not logged in')
          return
        }
        else
        {
        if (user.email == comment.userId){
          const res = await axios.delete(`/api/comments/?id=${comment.id}`);
          res.status===200 && window.location.reload();
        }
        else {
          alert('you cannot delete a comment you don t own')
        }
     
        }
        
  }
  return (
    <Container>
      {user && comment && <Avatar src={user.img} />}
      <Details>
        <Name>
           <Date>{comment.username}</Date>
        </Name>
        <Text>{comment.desc}</Text>
        < CommetDelete onClick={handelDeleteComment}>X</CommetDelete>
      </Details>
    </Container>
  );
};

export default Comment;
