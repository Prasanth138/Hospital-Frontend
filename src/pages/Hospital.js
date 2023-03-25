import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "../styles/Hospital.css";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

function Hospital() {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalData, setHospitalData] = useState({
    name: "",
    address: "",
    phone: "",
    capacity: "",
    specialties: [],
  });
  const [errors, setErrors] = useState(null);
  const [editedHospitalData, setEditedHospitalData] = useState({
    name: "",
    address: "",
    phone: "",
    capacity: "",
    specialties: "",
  });
  const [editingHospitalId, setEditingHospitalId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const newHospitalRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  //get all hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get("/api/v1/hospitals");
        setHospitals(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHospitals();
  }, []);

  //add hospital

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.post("/api/v1/hospitals/new", hospitalData);
      // Reset the form and any error messages
      setHospitals([...hospitals, response.data]);
      setHospitalData({
        name: "",
        address: "",
        phone: "",
        capacity: "",
        specialties: "",
      });
      setErrors(null);
      setShow(false)
      if (newHospitalRef.current) {
        newHospitalRef.current.scrollIntoView({ behavior: "smooth" });
      }
      toast.success(`${response.data.name} Hospital Added successfully`);     
    } catch (err) {
      console.error(err);
      if (err.response.status === 400) {
        toast.error("Hospital's credentials are not correct");
        setErrors(err.response.data.errors);
      } else {
        setErrors({ message: "Server Error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setHospitalData({
      ...hospitalData,
      [event.target.name]: event.target.value,
    });
  };

  //Delete hospitals

  const handleDeleteHospital = async (id) => {
    try {
      await api.delete(`/api/v1/hospitals/${id}`);
      setHospitals(hospitals.filter((hospital) => hospital._id !== id));
      toast.success(`Hospital deleted successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting Hospital");
    }
  };

  //update hospitals
  const handleEditHospital = async (id) => {
    setEditingHospitalId(id);
    const hospital = hospitals.find((hospital) => hospital._id === id);
    setEditedHospitalData({
      name: hospital.name,
      address: hospital.address,
      phone: hospital.phone,
      capacity: hospital.capacity,
      specialties: hospital.specialties.join(", "),
    });
  };

  const handleUpdateHospital = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.put(
        `/api/v1/hospitals/${editingHospitalId}`,
        editedHospitalData
      );
      setHospitals(
        hospitals.map((hospital) =>
          hospital._id === editingHospitalId ? response.data : hospital
        )
      );
      setEditedHospitalData({
        name: "",
        address: "",
        phone: "",
        capacity: "",
        specialties: "",
      });
      setEditingHospitalId(null);
      toast.success(`${response.data.name} updated successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Error updating hospital");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="hospital-container px-5 py-3 mt-3">
        <Row>
          <Col lg="12">
            <div>
              <h2 className="fw-bold p-0">
                <sup>
                  <i className="fa-solid fa-quote-left"></i>
                </sup>
                <span>"Putting Your Health First -</span> <br />
                Discover Our Comprehensive Hospital Details Today!"
              </h2>
              <p>
                <span className="text-danger">*</span>It's important to ensure
                that the hospitals credentials are correct, as this will be the
                primary way of communicating with them through the Hospital
                website.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="h-title mt-3">
        <Row>
          <Col lg="12">
            <div className="fw-bold text-center d-flex justify-content-center align-items-center flex-wrap gap-5">
              <h1 className="mt-2 p-3 fw-bold">Hospitals List</h1>
              <Button variant="success" onClick={handleShow}>
                + Add Hospital
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Hospital Adding Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit} className="p-5 d-flex flex-column align-items-center adding-form">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="hospital's name"
                  value={hospitalData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="phone.no"
                  value={hospitalData.phone}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  placeholder="capacity(rooms)"
                  value={hospitalData.capacity}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  id="specialties"
                  name="specialties"
                  placeholder="specialties"
                  value={hospitalData.specialties}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="address"
                  value={hospitalData.address}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />

                {errors && (
                  <ul>
                    {Object.values(errors).map((error, index) => (
                      <li key={index} className="text-danger">
                        {error}
                      </li>
                    ))}
                  </ul>
                )}
 
                <button
                  
                  type="submit"
                  disabled={isLoading}
                  style={{ backgroundColor: isLoading ? "green" : "" }}
                  className="button-send"
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        animation="border"
                        role="status"
                        size="sm"
                      ></Spinner>{" "}
                      Adding...
                    </>
                  ) : (
                    "Add"
                  )}{" "}
                </button>
              </form>
                </Modal.Body>
                
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="mt-3 p-0">
        <Row>
          <Col
            lg="12"
            className="d-flex flex-wrap align-items-center justify-content-around mb-5 mt-3 gap-5"
          >
            {hospitals.length === 0 ? (
              <div className="d-flex align-items-center justify-content-center w-100">
                {" "}
                <Spinner animation="border" role="status"></Spinner>
              </div>
            ) : (
              <>
                {hospitals.map((hospital) => (
                  <Card
                    style={{ width: "20rem" }}
                    key={hospital._id}
                    ref={
                      hospital.id === hospitals[hospitals.length - 1].id
                        ? newHospitalRef
                        : null
                    }
                    className="card-hospital"
                  >
                    <form onSubmit={handleUpdateHospital}>
                      <Card.Body>

                        <Card.Title className="text-center ">
                          {editingHospitalId === hospital._id ? (
                            <>
                              <label htmlFor="name"> name:</label>

                              <input
                                type="text"
                                className="w-100"
                                value={editedHospitalData.name}
                                onChange={(event) =>
                                  setEditedHospitalData({
                                    ...editedHospitalData,
                                    name: event.target.value,
                                  })
                                }
                              />
                            </>
                          ) : (
                            <span className="text-success">
                              {hospital.name}
                            </span>
                          )}
                        </Card.Title>

                        <Card.Subtitle className="mb-2 text-center ">
                          {editingHospitalId === hospital._id ? (
                            <>
                              <label htmlFor="name"> specialties:</label>

                              <input
                                type="text"
                                className="w-100"
                                value={editedHospitalData.specialties}
                                onChange={(event) =>
                                  setEditedHospitalData({
                                    ...editedHospitalData,
                                    specialties: event.target.value,
                                  })
                                }
                              />
                            </>
                          ) : (
                            <span className="text-muted">
                              {hospital.specialties}
                            </span>
                          )}
                        </Card.Subtitle>

                        <Card.Subtitle className="mb-2 mt-4">
                          {editingHospitalId === hospital._id ? (
                            <>
                              <label htmlFor="name"> capacity:</label>

                              <input
                                type="text"
                                className="w-100"
                                value={editedHospitalData.capacity}
                                onChange={(event) =>
                                  setEditedHospitalData({
                                    ...editedHospitalData,
                                    capacity: event.target.value,
                                  })
                                }
                              />
                            </>
                          ) : (
                            <span className="p-3">
                              <i className="fa-solid fa-bed fs-5 px-3"></i>{" "}
                              Rooms: {hospital.capacity}
                            </span>
                          )}
                        </Card.Subtitle>

                        <Card.Subtitle className="mb-2 py-1">
                          {editingHospitalId === hospital._id ? (
                            <>
                              <label htmlFor="name"> address:</label>

                              <input
                                type="text"
                                className="w-100"
                                value={editedHospitalData.address}
                                onChange={(event) =>
                                  setEditedHospitalData({
                                    ...editedHospitalData,
                                    address: event.target.value,
                                  })
                                }
                              />
                            </>
                          ) : (
                            <span className="p-3">
                              <i className="fa-solid fa-location-dot fs-5 px-3"></i>{" "}
                              &nbsp; {hospital.address}
                            </span>
                          )}
                        </Card.Subtitle>

                        <Card.Subtitle className="mb-3 py-2">
                          {editingHospitalId === hospital._id ? (
                            <>
                              <label htmlFor="name"> phone:</label>

                              <input
                                type="text"
                                className="w-100"
                                value={editedHospitalData.phone}
                                onChange={(event) =>
                                  setEditedHospitalData({
                                    ...editedHospitalData,
                                    phone: event.target.value,
                                  })
                                }
                              />
                            </>
                          ) : (
                            <span className="p-3">
                              <i className="fa-solid fa-square-phone fs-5 px-3"></i>{" "}
                              +91: {hospital.phone}
                            </span>
                          )}
                        </Card.Subtitle>

                        <hr />
                        {editingHospitalId === hospital._id ? (
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <Button
                              type="submit"
                              variant="success"
                              className="mx-2 w-100"
                              style={{
                                backgroundColor: Loading ? "green" : "",
                              }}
                            >
                              {Loading ? "Saving..." : "Save"}{" "}
                            </Button>
                            <Button
                              type="button"
                              variant="warning"
                              className="mx-2 w-100"
                              onClick={() => setEditingHospitalId(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}

                        {editingHospitalId !== hospital._id ? (
                          <>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <Card.Link>
                                {editingHospitalId !== hospital._id && (
                                  <Button
                                    type="button"
                                    variant="warning"
                                    onClick={() =>
                                      handleEditHospital(hospital._id)
                                    }
                                  >
                                    <i className="fa-solid fa-user-pen"></i>{" "}
                                    Update
                                  </Button>
                                )}
                              </Card.Link>
                              <Card.Link>
                                <Button
                                  type="button"
                                  variant="danger"
                                  onClick={() =>
                                    handleDeleteHospital(hospital._id)
                                  }
                                >
                                  <i className="fa-solid fa-user-minus"></i>{" "}
                                  Remove
                                </Button>
                              </Card.Link>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </Card.Body>
                    </form>
                  </Card>
                ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Hospital;
