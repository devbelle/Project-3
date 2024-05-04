import styled from "styled-components";
import { useState } from "react";
import HeaderPages from "../components/HeaderPages";


const PackingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 60%;
  max-width: 600px;
  max-height: 400px;
  background: url('/images/paper.png')no-repeat center center/cover; 
   border-radius: 20px;
  border: 3px solid black;
  margin: 0 auto; 
  box-sizing: border-box;
  position: absolute; 
  top: 20%; 
  right: 20%;
  left: 10%;
  padding: 20px;
  `;

const StyledH2 = styled.h2`
  border-bottom: 2px dashed black;
  font-size: 30px;
  color: blue;
  margin-top: -20px;
  align-items: center;
  whiteSpace: 'nowrap'; 
  text-align: center;
  @media (max-width: 768px) {
    fontSize: 20px;
  }
  @media (max-width: 576px) {
    fontSize: 16px;
  }
`;
const PackingSection = styled.div`
  width: 100%;
  height: 50%;
  @media (max-width: 768px) {
    height: 100%; // Increase height on smaller screens
  }
`;
const StyledH3 = styled.h3`
  margin-bottom: 20px; 
  font-size: 30px;
`;

const PackingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    width: 90%; // Reduce width on smaller screens
  }
  @media (max-width: 480px) {
    width: 100%; // Further reduce width on very small screens
  }
`;

const PackingButton = styled.button`
  width: 100px;
  display: block;
  border: 1px solid black;
  padding: 5px;
  margin-top: 10px;
  transition: all 0.3s ease; // Add transition
  &:hover {
    transform: scale(1.02); // Increase size on hover
  }
  background-color: #ADD8E6;
  @media (max-width: 768px) {
    width: 80px; // Reduce width on smaller screens
  }
  @media (max-width: 480px) {
    width: 60px; // Further reduce width on very small screens
  }
`;

//from Devin's React Portfolio
const PackingPage = () => {
  const [packingEl, setPackingEl] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const addPackingEl = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setPackingEl([...packingEl, inputValue]);
      setInputValue("");
    }
  };

//   const deletePackingEl = (index) => {
//     const updatedPackingEl = packingEl.filter((packingEl, i) => i !== index);
//     setPackingEl(updatedPackingEl);
//   };

  return (
    <PackingBox>
      <HeaderPages
        title="My Packing Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="20px"
        marginTop="10px"
        imgSrc="/images/globe.jpg"
      />
      <PackingSection>
      <StyledH2>What should you bring?</StyledH2>  
      <StyledH3>Packing List:</StyledH3>      
      </PackingSection>
      <PackingForm>

        <PackingSection>
          <ul>
            {packingEl.map((packingEl, index) => (
              <li key={index}>{packingEl}</li>
            ))}
          </ul>
       
        </PackingSection>
        
        <PackingSection> 
       
        </PackingSection>

        <input
          type="text"
          value={inputValue}
          placeholder="Add item to pack..."
          onChange={(e) => setInputValue(e.target.value)}
        />
          {/* <ul>
        {packingEl.map((packingEl, index) => (
          <li key={index}>
            {packingEl}
            <button onClick={() => deletePackingEl(index)}>Delete</button>
          </li>
        ))}
      </ul> */}
        <PackingButton
          className="button is-medium is-primary is-fullwidth"
          type="submit"
          onClick={addPackingEl}
        >
          Add Item
        </PackingButton>
      
      </PackingForm>
      
    </PackingBox>
  );
};

export default PackingPage;
