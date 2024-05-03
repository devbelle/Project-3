import HeaderPages from "../components/HeaderPages";
import styled from 'styled-components';
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../utils/queries";

const Section = styled.div`
  width: 50%;
  height: 100%;
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
const Input = styled.input`
  padding: 5px;
  margin: 5px;
`;

export default function RestaurantsPage() {

    const [restaurantCitySearch, setRestaurantCitySearch] = useState();
    const [restaurantSearch] = useQuery(GET_RESTAURANTS);

  // restaurant stuff
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getRestaurants({
        variables: { city: "Barcelona" },
      });
      console.log(data.getRestaurants);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <HeaderPages
        title="Restaurants Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="22px"
        marginTop="10px"
        imgSrc="/images/globe.jpg"
      />

      <Form id="contact-form" onSubmit={handleSubmit}>
        <Section className="field">
          <label className="label" htmlFor="city">
            Search for a City
          </label>
          <Input
            type="text"
            className="form-control"
            name="restaurant"
            placeholder="Search for a City..."
            // value={formState.title}
            onChange={setRestaurantCitySearch}
          />
        </Section>

        <Button
          className="button is-medium is-primary is-fullwidth"
          data-testid="button"
          type="submit"
        >
          Search
        </Button>
      </Form>
    </Box>
  );
  //TODO: build this page when ready.
  return <div></div>;
}

//added Header and nav

/* <HeaderPages title="My Packing Page" color="#ADD8E6" font="Arial" fontSize="22px" marginTop= '10px' imgSrc="/images/globe.jpg" /> */
