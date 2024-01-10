console.log("Let's get this party started!");
document.getElementById('gif-search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    let searchTerm = document.getElementById('search-input').value;
    let response = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=2QxMGtSbGPQNIFPdJPwDtrBgGmiBEYOH`);
    console.log(response.data);

    try {
        // Select a random GIF from the response data
        let randomIndex = Math.floor(Math.random() * response.data.data.length);
        let gifData = response.data.data[randomIndex];
        let gifUrl = gifData.images.original.url;

        // Create a container for the GIF and its remove button
        let gifContainer = document.createElement('div');
        gifContainer.style.position = 'relative';
        gifContainer.style.display = 'inline-block';

        // Create the GIF image element
        let imgElement = document.createElement('img');
        imgElement.src = gifUrl;
        gifContainer.appendChild(imgElement);
  
        let removeButton = document.createElement('button');
        removeButton.className = 'removeButton'; // Setting the CSS class
        removeButton.innerText = 'X ';
        removeButton.addEventListener('click', function() {
            gifContainer.remove();
        });

        gifContainer.appendChild(removeButton);

        document.getElementById('gifs-container').appendChild(gifContainer);

        document.getElementById('search-input').value = '';

    } catch (e) {
        console.log("No GIFs found for the search term.");
    }
});

document.getElementById('remove-gifs').addEventListener('click', function() {
    let gifContainers = document.querySelectorAll('#gifs-container > div');
    gifContainers.forEach(function(container) {
        container.remove();
    });
});
