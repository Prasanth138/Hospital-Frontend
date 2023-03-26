import React from "react";
import "../styles/Hospital.css";
import Spinner from "react-bootstrap/Spinner";

function AddCard({handleSubmit, hospitalData, handleChange, errors, isLoading}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 d-flex flex-column align-items-center adding-form"
    >
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
            <Spinner animation="border" role="status" size="sm"></Spinner>{" "}
            Adding...
          </>
        ) : (
          "Add"
        )}{" "}
      </button>
    </form>
  );
}

export default AddCard;
