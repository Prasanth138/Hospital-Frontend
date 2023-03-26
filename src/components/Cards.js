import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Hospital.css";

function Cards({
  hospital,
  hospitals,
  newHospitalRef,
  handleUpdateHospital,
  editingHospitalId,
  handleEditHospital,
  handleDeleteHospital,
}) {
  return (
    <>
      <Card.Body>
        <Card.Title className="text-center ">
          <span className="text-success">{hospital.name}</span>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-center ">
          <span className="text-muted">{hospital.specialties}</span>
        </Card.Subtitle>

        <Card.Subtitle className="mb-2 mt-4">
          <span className="p-3">
            <i className="fa-solid fa-bed fs-5 px-3"></i> Rooms:{" "}
            {hospital.capacity}
          </span>
        </Card.Subtitle>

        <Card.Subtitle className="mb-2 py-1">
          <span className="p-3">
            <i className="fa-solid fa-location-dot fs-5 px-3"></i> &nbsp;{" "}
            {hospital.address}
          </span>
        </Card.Subtitle>

        <Card.Subtitle className="mb-3 py-2">
          <span className="p-3">
            <i className="fa-solid fa-square-phone fs-5 px-3"></i> +91:{" "}
            {hospital.phone}
          </span>
        </Card.Subtitle>

        <hr />

        <div className="d-flex align-items-center justify-content-center gap-2">
          <Card.Link>
            {editingHospitalId !== hospital._id && (
              <Button
                type="button"
                variant="warning"
                onClick={() => handleEditHospital(hospital._id)}
              >
                <i className="fa-solid fa-user-pen"></i> Update
              </Button>
            )}
          </Card.Link>
          <Card.Link>
            <Button
              type="button"
              variant="danger"
              onClick={() => handleDeleteHospital(hospital._id)}
            >
              <i className="fa-solid fa-user-minus"></i> Remove
            </Button>
          </Card.Link>
        </div>
      </Card.Body>
    </>
  );
}

export default Cards;
