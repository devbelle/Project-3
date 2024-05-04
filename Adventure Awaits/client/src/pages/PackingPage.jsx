import styled from "styled-components";
import { useState, useEffect } from "react";
import HeaderPages from "../components/HeaderPages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { createGlobalStyle } from "styled-components";

const PackingBox = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  height: 60%;
  max-width: 600px;
  min-height: 400px;
  background: url("/images/paper.png") no-repeat center center/cover;
  border-radius: 20px;
  border: 3px solid black;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px;
  top: 20%;
  right: 20%;
  left: 10%;
`;

const StyledH2 = styled.h2`
  border-bottom: 2px dashed black;
  font-size: 30px;
  color: blue;
  margin-top: 0;
  align-items: center;
  whitespace: "nowrap";
  text-align: center;
  @media (max-width: 768px) {
    fontsize: 20px;
  }
  @media (max-width: 576px) {
    fontsize: 16px;
  }
`;

const PackingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  width: 100%;
  height: auto;
  @media (max-width: 768px) {
    max-height100%; // Increase maximum height on smaller screens
  }
`;

const StyledH3 = styled.h3`
  margin-bottom: 20px;
  font-size: 28px;
`;

const PackingForm = styled.form`
  height: auto;
  width: 50%;
  @media (max-width: 768px) {
    width: 90%; // Reduce width on smaller screens
  }
  @media (max-width: 480px) {
    width: 90%; // Further reduce width on very small screens
  }
`;

const PackingButton = styled.button`
  text-align: center;
  width: 100px;
  display: block;
  padding: 5px;
  border: 1px solid black;
  border-radius: 20px;
  transition: all 0.3s ease; // Add transition
  &:hover {
    transform: scale(1.02); // Increase size on hover
  }
  background-color: #add8e6;
  @media (max-width: 768px) {
    width: 80px; // Reduce width on smaller screens
  }
  @media (max-width: 480px) {
    width: 60px; // Further reduce width on very small screens
  }
`;
const GlobalStyle = createGlobalStyle`
body {
  background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/images/car.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
@media (max-width: 1024px) {
  body {
    background-size: cover;
    background-position: top center;
  }
}
`;
const PackingPage = () => {
  const [packingEl, setPackingEl] = useState([]);
  const [inputValue, setInputValue] = useState("");

// Load data from localStorage on component mount
useEffect(() => {
  const storedPackingEl = localStorage.getItem("packingEl");
  if (storedPackingEl) {
    setPackingEl(JSON.parse(storedPackingEl));
  }
}, []);

// Save data to localStorage whenever packingEl changes
useEffect(() => {
  localStorage.setItem("packingEl", JSON.stringify(packingEl));
}, [packingEl]);

  const addPackingEl = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setPackingEl([...packingEl, inputValue]);
      setInputValue("");
    }
  };

  const [deleting, setDeleting] = useState({});
  const [spinning, setSpinning] = useState({});

  const handleDelete = (index) => {
    setSpinning({ ...spinning, [index]: true }); // Set the trashcan as spinning

    setTimeout(() => {
      setPackingEl(packingEl.filter((_, i) => i !== index));
      setSpinning({ ...spinning, [index]: false }); // Reset the trashcan as not spinning
    }, 500);
  };

  return (
    <>
      <GlobalStyle />
      <PackingBox>
        <HeaderPages
          title="Travel Checklist"
          color="#ADD8E6"
          font="Arial"
          fontSize="24px"
          marginTop="10px"
          imgSrc="/images/globe.jpg"
        />
        <PackingSection>
          <StyledH2>What should you bring? </StyledH2>
          <StyledH3>Packing List:</StyledH3>
          <ul
            style={{
              marginTop: "0%",
              fontSize: "18px",
              color: "black",
            }}
          >
            {packingEl.map((packingEl, index) => (
              <li key={index}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    animation: deleting[index] ? "fadeOut 0.5s forwards" : "", // Apply the animation based on the state
                  }}
                >
                  <span style={{ flex: 1, width: "40%" }}>{packingEl}</span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="trashcan"
                    onClick={() => handleDelete(index)}
                    spin={spinning[index]} // Make the trashcan spin based on the state
                    style={{ marginRight: "70%" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </PackingSection>
        <PackingSection
          style={{
            position: "relative",
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PackingForm
            style={{
              position: "absolute",
              bottom: "0",
              marginTop: "80px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              value={inputValue}
              placeholder="Add item to pack..."
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginBottom: "5px" }}
            />
            <PackingButton type="submit" onClick={addPackingEl}>
              Add Item
            </PackingButton>
          </PackingForm>
        </PackingSection>
      </PackingBox>
    </>
  );
};

export default PackingPage;
