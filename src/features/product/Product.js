import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts, addProduct } from "./product.slice";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Pagination,
} from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";

export function Products() {
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess, error } = useSelector(
    (state) => state.product
  );

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const onChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleProduct = (e) => {
    const { name, description } = product;
    e.preventDefault();
    dispatch(addProduct({ name, description }));
    handleClose();
    setProduct({ name: "", description: "" });
  };


  // PAGINATION
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Container fluid>
      <Sidebar />
      <Row className="m-5">
        <Col>
          <div className="d-flex pt-5 pb-2 justify-content-start">
            <h1 className="fw-bold text-uppercase">Products List</h1>
          </div>
          <div className="d-flex pb-2 justify-content-end">
            <Button
              variant="primary"
              className="primary-btn fw-bold"
              onClick={handleShow}
            >
              Add New Product
            </Button>
          </div>
          <Modal show={showModal} onHide={handleClose}>
            <form onSubmit={handleProduct}>
              <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={onChangeInput}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={product.description}
                    name="description"
                    onChange={onChangeInput}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>

          {isLoading ? (
            <Spinner animation="border" variant="info" />
          ) : isError ? (
            <h2>{error}</h2>
          ) : (
            isSuccess && (
              <>
                <Table
                  striped
                  bordered
                  hover
                  variant="striped"
                  size="sm"
                  responsive
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>
                          <div className="d-flex p-2 gap-1">
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm ts-buttom"
                              size="sm"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-success btn-sm ts-buttom"
                              size="sm"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm ml-2 ts-buttom"
                              size="sm"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination>
                  {pageNumbers.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPage}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                </Pagination>

                {/* <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-end">
                    <li class="page-item disabled">
                      <a class="page-link" href="#" tabindex="-1">
                        Previous
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav> */}
              </>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
}
