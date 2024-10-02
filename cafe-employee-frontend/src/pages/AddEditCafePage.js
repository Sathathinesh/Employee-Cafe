import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCafe, updateCafe, fetchCafes } from '../redux/actions/cafeActions';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditCafePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const cafes = useSelector(state => state.cafes.cafes);
  const [cafe, setCafe] = useState({
    name: '',
    description: '',
    logo: '',
    location: '',
  });

  useEffect(() => {
    if (id) {
      const selectedCafe = cafes.find(cafe => cafe.id === id);
      if (selectedCafe) {
        setCafe(selectedCafe);
      }
    }
  }, [id, cafes]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCafe(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    setCafe(prevState => ({
      ...prevState,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      dispatch(updateCafe(cafe));
    } else {
      dispatch(addCafe(cafe));
    }
    navigate('/cafes');
  };

  const handleCancel = () => {
    navigate('/cafes');
  };

  return (
    <div>
      <h1>{id ? 'Edit Cafe' : 'Add Cafe'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={cafe.name}
            onChange={handleChange}
            required
            minLength="6"
            maxLength="10"
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={cafe.description}
            onChange={handleChange}
            required
            maxLength="256"
          />
        </div>
        <div>
          <label>Logo:</label>
          <input type="file" name="logo" onChange={handleFileChange} />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={cafe.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEditCafePage;
