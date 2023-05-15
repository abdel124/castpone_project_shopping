import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess , logout } from "../redux/userSlice";
//import { auth, provider } from "../firebase";
//import { signInWithPopup } from "firebase/auth";
//import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
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

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

  const SignOut = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = async (e) => {
      e.preventDefault();
      dispatch(loginStart());
      try {
        const res = await axios.post("/api/signout");
        dispatch(logout());
        navigate("/")
      } catch (err) {
        dispatch(loginFailure());
      }
    };



  //TODO: REGISTER FUNCTIONALITY


  return (
    <Container>
      <Wrapper>
        <Button onClick={handleLogout}>Sign out</Button>
      </Wrapper>
    </Container>
  );
};

export default SignOut;
