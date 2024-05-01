// import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Container, Col, Card, Row } from "react-bootstrap";





const SearchRestaurants = () => {

    // const [searchRestaurants, setSearchRestaurants] = useState([]);

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    
    //     if (!searchInput) {
    //       return false;
    //     }
    
    //     try {
    //       const response = await // api searchRestaurants(searchInput);
    
    //       if (!response.ok) {
    //         throw new Error('something went wrong!');
    //       }
    
    //       const { data } = await response.json();
    
    //       const restaurantData = items.map((restaurant) => ({
    //         // restaurantId: restaurant.id,
    //         // currencyCode: book.volumeInfo.authors || ['No author to display'],
    //         // title: book.volumeInfo.title,
    //         // description: book.volumeInfo.description,
    //         // image: book.volumeInfo.imageLinks?.thumbnail || '',
    //       }));
    
      //     setSearchedBooks(restaurantData);
      //     setSearchInput('');
      //   } catch (err) {
      //     console.error(err);
      //   }
      // };
      return (
        <>
          {/* <div className="text-light bg-dark p-5">
            <Container>
              <h1>Search for Books!</h1>
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col xs={12} md={8}>
                    <Form.Control
                      name='searchInput'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type='text'
                      size='lg'
                      placeholder='Search for a restaurant'
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <Button type='submit' variant='success' size='lg'>
                      Submit Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div> */}
    
          {/* <Container>
            <h2 className='pt-5'>
              {searchedBooks.length
                ? `Viewing ${searchedBooks.length} results:`
                : 'Search for a book to begin'}
            </h2>
            {<Row>
              {searchedBooks.map((book) => {
                return (
                  <Col md="4" key={book.bookId}>
                    <Card border='dark'>
                      {book.image ? (
                        <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                      ) : null}
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <p className='small'>Authors: {book.authors}</p>
                        <Card.Text>{book.description}</Card.Text>
                        {Auth.loggedIn() && (
                          <Button
                            disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                            className='btn-block btn-info'
                            onClick={() => handleSaveBook(book.bookId)}>
                            {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                              ? 'This book has already been saved!'
                              : 'Save this Book!'}
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>)}
                )};
              
            </Row>}
          </Container> */}

          <Container>
           
            {<Row>
              
                
                  <Col md="4">
                    <Card border='dark'>
                                   
                      <Card.Body>
                        <Card.Header>{"Faire Brunch & Drinks"}</Card.Header>
              
                        <Card.Text>{"Average Rating: 5"}</Card.Text>
                        <Card.Text>{"Open"}</Card.Text>
                        <Card.Text>{"$$ - $$$"}</Card.Text>
                        <Card.Img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/28/fc/ac/we-like-to-keep-things.jpg?w=200&h=200&s=1" alt={`Rest pic`} variant='top' />
                      </Card.Body>
                    </Card>
                  </Col>
                ;
              
            </Row>}
          </Container>
        </>
      );
    };




export default Restaurants; 