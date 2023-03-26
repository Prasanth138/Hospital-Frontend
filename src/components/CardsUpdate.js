import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Hospital.css";

function CardsUpdate({
  hospital,
  hospitals,
  newHospitalRef,
  handleUpdateHospital,
  editingHospitalId,
  handleEditHospital,
  handleDeleteHospital,
  setEditingHospitalId,
  editedHospitalData,
  setEditedHospitalData,
  Loading,
}) {
  return (
    <>
      <Card.Body>
        <Card.Title className="text-center ">
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
        </Card.Title>

        <Card.Subtitle className="mb-2 text-center ">
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
        </Card.Subtitle>

        <Card.Subtitle className="mb-2 mt-4">
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
        </Card.Subtitle>

        <Card.Subtitle className="mb-2 py-1">
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
        </Card.Subtitle>

        <Card.Subtitle className="mb-3 py-2">
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
        </Card.Subtitle>

        <hr />

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
      </Card.Body>
    </>
  );
}

export default CardsUpdate;
