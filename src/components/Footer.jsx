import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterContainer>
        <StyledH3>This is not a real place!</StyledH3>
        <Link to={"https://github.com/AirDevil188/"}>
          <FaGithub size={20} />
        </Link>
      </StyledFooterContainer>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  background-color: #000;
  color: #fff;
  padding: 2rem;

  a {
    color: #fff;
  }
`;

const StyledFooterContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 10px;
`;

const StyledH3 = styled.h3``;
