import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col, Form } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products on load
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Search with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, products]);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Product Listing</h2>
      
      <Form.Control
        type="text"
        placeholder="Search products..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Row xs={1} md={2} lg={4} className="g-4">
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          (searchTerm ? filteredProducts : products).map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
