import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col, Form } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from API on first render
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Apply filters, sort, and search
  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // Extract unique categories for filter
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <Container className="my-4">
      <h2 className="mb-4">Product Listing</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Form.Select>
        </Col>
      </Row>

      {status === 'loading' ? (
        <p>Loading products...</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
