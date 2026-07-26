import { Container, Row, Col, Button, Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import ProductSection from "../components/Home/Products-Section";
import FilterSidebar from "../components/Products/FilterSidebar";
import "./Pages.css";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector((state) => state.product.items);

  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    const categories = searchParams.get("category")?.split(",") || [];
    const types = searchParams.get("type")?.split(",") || [];
    const priceRange = searchParams.get("price");

    return products.filter((item) => {
      if (categories.length && !categories.includes(item.category)) {
        return false;
      }
      if (types.length && !types.includes(item.type)) {
        return false;
      }
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        if (item.price < min || item.price > max) {
          return false;
        }
      }
      return true;
    });
  }, [products, searchParams]);

  return (
    <Container fluid className="products-page" style={{ paddingTop: "110px" }}>
      <Row className="gy-4">
      
        <Col xs={12} className="d-lg text-center">
          <Button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Col>
        <Col lg={3} md={4}>
         
          <div className="d-none d-lg-block sticky-sidebar">
            <FilterSidebar />
          </div>
          <Collapse in={showFilters}>
            <div className="d-lg-none mobile-filter-wrapper">
              <FilterSidebar
                onFilterChange={() => setShowFilters(false)}
              />
            </div>
          </Collapse>
        </Col>
        <Col lg={9} md={8}>
          {filteredProducts.length === 0 ? (
            <div className="empty-state text-center py-5">
              <h4>Oops! No products found</h4>
              <p>Try changing your filters or search again</p>
              <button
                className="btn btn-warning"
                onClick={() => setSearchParams({})}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ProductSection title="" data={filteredProducts} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
