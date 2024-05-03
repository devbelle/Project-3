import HeaderPages from '../components/HeaderPages';
import styled from "styled-components";
import {useState} from 'react';

const RestaurantPage = () => {
const [searchInput, setSearchInput] =useState('');

const handleSearch =() => {
    //call API with the search input
};

    return (
        <>
        <HeaderPages 
          title="Restaurants" 
          color="#ADD8E6" 
          font="Arial" 
          fontSize="22px" 
          marginTop='10px' 
          imgSrc="/images/globe.jpg" 
        />
        <input
        type="text"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)} 
        />
        <button onClick={handleSearchInput}>Search</button>
      </>
      );
    };


    export default RestaurantPage;
