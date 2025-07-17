import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import {
  addToFavourites,
  removeFromFavourites
} from '../redux/favouritesSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch individual product data
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  const isFavourite = favourites.some((item) => item.id === product?.id);

  const handleToggleFavourite = () => {
    if (!product) return;
    if (isFavourite) {
      dispatch(removeFromFavourites(product));
    } else {
      dispatch(addToFavourites(product));
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              style={{ height: '400px', objectFit: 'contain' }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4>₹ {product.price}</h4>
          <p>{product.description}</p>
          <Button
            variant={isFavourite ? 'danger' : 'success'}
            onClick={handleToggleFavourite}
          >
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
