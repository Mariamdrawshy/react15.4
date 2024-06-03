// Pixa.js

import React, { useState } from 'react';
import axios from 'axios';

const Pixa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME`);
      setImages(response.data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div className="image-list">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <a href={image.largeImageURL} target="_blank" rel="noopener noreferrer">
              <img src={image.webformatURL} alt={image.tags} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pixa;
