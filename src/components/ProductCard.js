import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
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
          <Button variant="primary" size="sm">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
