import styled from "styled-components";
import { useState } from "react";
import HeaderPages from "../components/HeaderPages";


const PackingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
width: 100%;
  height: 40vh;
  max-width: 400px;
  background-color: white;
  border-radius: 10px;
  border: 3px solid black;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  @media (min-width: 576px) {
    width: 60%;
    height: 60vh; // Increase height for larger screens
  }

  @media (min-width: 768px) {
    width: 70%;
    height: 80vh; // Increase height for larger screens
  }

  @media (min-width: 992px) {
    width: 60%;
  }

  @media (min-width: 1200px) {
    width: 50%;
  }
`;

const PackingSection = styled.div`
  //   width: 75%;
  height: 50%;
`;
const PackingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    width: 60%; // Increase width on smaller screens
  }

  @media (max-width: 576px) {
    width: 80%; // Increase width on even smaller screens
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
        fontSize="18px"
        marginTop="10px"
        imgSrc="/images/globe.jpg"
      />
      <PackingSection>
      <h2 style={{
  borderBottom: "2px solid black",
  fontSize: '24px',
  whiteSpace: 'nowrap', // Add this line
  '@media (max-width: 768px)': {
    fontSize: '20px',
  },
  '@media (max-width: 576px)': {
    fontSize: '16px',
  }
}}>What should you bring?</h2>      
 <h3>Packing List:</h3>
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
