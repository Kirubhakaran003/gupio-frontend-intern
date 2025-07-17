import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavourites } from '../redux/favouritesSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  if (favourites.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h4>No favourites added yet.</h4>
        <Link to="/">
          <Button variant="primary" className="mt-3">Browse Products</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Your Favourite Products</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {favourites.map(product => (
          <Col key={product.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{product.title.slice(0, 50)}...</Card.Title>
                <Card.Text>₹ {product.price}</Card.Text>
                <Link to={`/product/${product.id}`}>
                  <Button variant="info" size="sm" className="me-2">View</Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch(removeFromFavourites(product))}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favourites;
