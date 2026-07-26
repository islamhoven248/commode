import { Accordion, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Products.css";

export default function FilterSidebar({ onFilterChange }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector((state) => state.product.items);

  const categories = [...new Set(products.map((p) => p.category))];
  const types = [...new Set(products.map((p) => p.type))];

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get(key)?.split(",") || [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    updated.length
      ? params.set(key, updated.join(","))
      : params.delete(key);

    setSearchParams(params);
    onFilterChange && onFilterChange(); 
  };

  const renderChecks = (key, items) => {
    const selected = searchParams.get(key)?.split(",") || [];

    return items.map((item) => (
      <Form.Check
        key={item}
        type="checkbox"
        label={item}
        checked={selected.includes(item)}
        onChange={() => updateParam(key, item)}
      />
    ));
  };

  const priceValue =
    searchParams.get("price")?.split("-")[1] || 1000;

  return (
    <div className="filter-box">
      <h3 className="filter-title">Filters</h3>

      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Category</Accordion.Header>
          <Accordion.Body>
            {renderChecks("category", categories)}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Type</Accordion.Header>
          <Accordion.Body>
            {renderChecks("type", types)}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <Form.Label className="price-label">
              Up to <span>${priceValue}</span>
            </Form.Label>

            <Form.Range
              min={0}
              max={1000}
              step={50}
              value={priceValue}
              onChange={(e) =>
                updateParam("price", `0-${e.target.value}`)
              }
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
