import styled from "styled-components";

const HomePage = () => {
  return (
    <>
      <main>
        <StyledHeroContainer>
          <picture>
            <StyledHeroPicture
              src="../public/assets/img/hero-image.webp"
              alt="Shop open sign"
            ></StyledHeroPicture>
          </picture>
          <h2>Come as costumer stay as family!</h2>
        </StyledHeroContainer>
      </main>
    </>
  );
};

export default HomePage;

//styled-components

const StyledHeroContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const StyledHeroPicture = styled.img`
  width: 100%;
`;
