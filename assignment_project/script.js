// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Fetch portfolio items from JSON
    fetch('data/portfolio_items.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load portfolio items');
            }
            return response.json();
        })
        .then(data => {
            const portfolioContainer = document.getElementById('portfolio-items');
            
            // Loop through portfolio items and create HTML
            data.forEach(item => {
                const portfolioItem = document.createElement('div');
                portfolioItem.classList.add('portfolio-item');
                
                // Check if the image field is a video (.mp4) or an image
                const mediaElement = item.image.endsWith('.mp4')
                    ? `<video src="${item.image}" controls width="100%" height="200px" style="object-fit: cover;"></video>`
                    : `<img src="${item.image}" alt="${item.title}" style="object-fit: cover;">`;
                
                portfolioItem.innerHTML = `
                    ${mediaElement}
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" target="_blank">View Project</a>
                `;
                
                portfolioContainer.appendChild(portfolioItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const portfolioContainer = document.getElementById('portfolio-items');
            portfolioContainer.innerHTML = '<p>Sorry, unable to load portfolio items at this time.</p>';
        });
});