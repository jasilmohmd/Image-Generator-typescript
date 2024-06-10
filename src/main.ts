import './css/style.css'
import axios from 'axios';

function generateImage(): void {
    const categoryElement = document.getElementById('category') as HTMLSelectElement;
    const category: string = categoryElement.value;

    if (category) {
        const imageContainer = document.getElementById('imageContainer') as HTMLElement;
        imageContainer.innerHTML = ''; // Clear previous image if any

        // Show loading message
        const loadingMessage = document.createElement('p');
        loadingMessage.innerText = 'Loading image...';
        imageContainer.appendChild(loadingMessage);

        // Axios request to fetch random image from API
        axios.get(`https://api.api-ninjas.com/v1/randomimage?category=${category}`, {
            headers: { 'X-Api-Key': 'kHC9vT+l2SE/vWn+mgvvqQ==ihDiBrS3gRmYtmEQ', 'Accept': 'image/jpg' },
            responseType: 'blob' // Set the response type to blob
        })
        .then(response => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(response.data);
            img.onload = () => {
                URL.revokeObjectURL(img.src); // Free memory
            };
            imageContainer.innerHTML = ''; // Clear loading message
            imageContainer.appendChild(img);
        })
        .catch(error => {
            console.error('Error: ', error.response?.data);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = `Failed to load image. Error: ${error.response?.data}`;
            imageContainer.innerHTML = '';
            imageContainer.appendChild(errorMessage);
        });
    } else {
        alert('Please select a category');
    }
}

// Attach the generateImage function to the button click event
(document.querySelector('button') as HTMLButtonElement).addEventListener('click', generateImage);
