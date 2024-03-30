// index.js

// Callbacks
const handleClick = (ramen) => {
  // Display ramen details in #ramen-detail div
  const detailImage = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  const editRamenForm = document.getElementById('edit-ramen');

  newRamenForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(newRamenForm);
    const newRamen = {
      name: formData.get('name'),
      restaurant: formData.get('restaurant'),
      image: formData.get('image'),
      rating: parseInt(formData.get('rating')),
      comment: formData.get('new-comment')
    };

    try {
      const response = await fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
      });
      if (!response.ok) {
        throw new Error('Failed to add new ramen');
      }
      // Handle successful creation (optional)
    } catch (error) {
      console.error('Error adding new ramen:', error);
      // Handle error (e.g., display error message to user)
    }
  });

  editRamenForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(editRamenForm);
    const updatedRamen = {
      rating: parseInt(formData.get('rating')),
      comment: formData.get('new-comment')
    };

    try {
      const response = await fetch(`http://localhost:3000/ramens/${ramenId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRamen)
      });
      if (!response.ok) {
        throw new Error('Failed to update ramen details');
      }
      // Handle successful update (optional)
    } catch (error) {
      console.error('Error updating ramen details:', error);
      // Handle error (e.g., display error message to user)
    }
  });
};

const displayRamens = async () => {
  try {
    const response = await fetch('http://localhost:3000/ramens');
    const ramens = await response.json();
    const ramenMenu = document.getElementById('ramen-menu');

    ramens.forEach((ramen) => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });

    // Display details for the first ramen by default
    if (ramens.length > 0) {
      handleClick(ramens[0]);
    }
  } catch (error) {
    console.error('Error fetching ramens:', error);
    // Handle error (e.g., display error message to user)
  }
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();
};

// Invoke main after DOM has fully loaded
document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
