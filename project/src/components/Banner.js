import styled from "styled-components";
import { useEffect, useState } from "react";
import { makeImagePath } from "../utils";

const BannerWrap = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  padding-right: 900px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h1`
  font-size: 58px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 20px;
  width: 100vh;
`;

const Banner = ({ data }) => {
  const [randomIndex, setRandomIndex] = useState(0);
  useEffect(() => {
    const min = 0;
    const max = 20;
    setRandomIndex(Math.floor(min + Math.random() * (max - min)));
  }, []);

  return (
    <BannerWrap
      bgPhoto={makeImagePath(data?.results[randomIndex].backdrop_path || "")}
    >
      <Title>{data?.results[randomIndex].title}</Title>
      <Overview>{data?.results[randomIndex].overview}</Overview>
    </BannerWrap>
  );
};

export default Banner;
