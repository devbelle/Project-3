import styled from "styled-components";
import { useState } from "react";
import HeaderPages from "../components/HeaderPages";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 90%;
  max-width: 430px;
  height: 90%px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  position: absolute;
  border: 3px solid black;
  margin-bottom: 250px;
`;

const Section = styled.div`
  //   width: 75%;
  height: 50%;
  background-color: #ffad73;
  border: 1px solid black;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  width: 100px;
  display: block;
  border: 1px solid black;
  padding: 5px;
  margin-top: 10px;
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
    <Box>
      <HeaderPages
        title="My Packing Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="22px"
        marginTop="10px"
        imgSrc="/images/globe.jpg"
      />
      <Section>
        <h2>What should you bring?</h2>
        <h3>Packing List:</h3>
      </Section>
      <Form>

        <Section>
          <ul>
            {packingEl.map((packingEl, index) => (
              <li key={index}>{packingEl}</li>
            ))}
          </ul>
       
        </Section>
        
        <Section>
       
        </Section>

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
        <Button
          className="button is-medium is-primary is-fullwidth"
          type="submit"
          onClick={addPackingEl}
        >
          Add Item
        </Button>
      
      </Form>
      
    </Box>
  );
};

export default PackingPage;
