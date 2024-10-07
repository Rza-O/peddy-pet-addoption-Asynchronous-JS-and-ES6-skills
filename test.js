// Fetching All pets for the Landing page
const loadAllPets = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();

    // Load all pets initially
    showAllPets(data.pets);
}

// Function to show pets (all or by category)
const showAllPets = (pets) => {
    const cardContainer = document.getElementById('pets-card-container');

    // Clear the container before appending new cards
    cardContainer.innerHTML = ''; //Change number 1

    // Iterate and display each pet
    pets.forEach(pet => {
        const card = document.createElement('div');
        card.classList.add('border-2', 'rounded-xl');
        card.innerHTML = `
            <div class="p-5 object-cover"><img class="rounded-lg h-44 w-full" src=${pet.image} alt=""></div>
            <div class="p-5 flex flex-col gap-2">
                <h3 class="text-2xl font-extrabold">${pet?.pet_name ?? 'Not Mentioned'}</h3>
                <p><i class="fa-solid fa-grip"></i> Breed: ${pet?.breed ?? 'Not Mentioned'}</p>
                <p><i class="fa-regular fa-calendar"></i> Birth: ${pet?.date_of_birth ?? 'Not Mentioned'}</p>
                <p><i class="fa-solid fa-mercury"></i> Gender: ${pet?.gender ?? 'Not Mentioned'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet?.price ?? 'Not Mentioned$'}</p>
            </div>
            <hr>
            <div class="flex justify-center gap-4 items-center p-2">
                <button class="btn btn-ghost border-2 border-solid border-gray-200 "><i class="fa-regular fa-thumbs-up"></i></button>
                <button class="btn btn-ghost border-2 border-solid border-gray-200 text-primary">Adopt</button>
                <button class="btn btn-ghost border-2 border-solid border-gray-200 text-primary">Details</button>
            </div>
        `;
        cardContainer.append(card);
    });
}

// Fetching pets by category
const loadPetsCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await response.json();
    categoriesButton(data.categories);
}
loadPetsCategories();

const categoriesButton = (categories) => {
    const categoryBtnContainer = document.getElementById('categories-btn-container');
    categories.forEach(category => {
        const categoriesBtn = document.createElement('button');
        categoriesBtn.classList.add('btn', 'btn-lg', 'text-2xl', 'rounded-2xl', 'bg-transparent', 'border-2');
        categoriesBtn.innerHTML = `<img src="${category.category_icon}" alt=""></img> ${category.category}`;

        // Adding onclick handler to load pets by category
        categoriesBtn.onclick = () => {
            categoryClickHandler(category);
        }

        categoryBtnContainer.append(categoriesBtn);
    });
}

// Loading pets by category when a category button is clicked
const categoryClickHandler = (category) => {
    const spinner = document.getElementById('spinner');
    const cardContainer = document.getElementById('pets-card-container');

    // Clear the current pets cards
    cardContainer.innerHTML = '';

    // Show the spinner
    spinner.classList.remove('hidden');

    // Delay the fetch for 2 seconds using setTimeout
    setTimeout(async () => {
        try {
            const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category.category}`);
            const data = await response.json();

            // If there are no pets for the category Birds
            if (category.category === "Birds" && data.data.length === 0) {
                showBirdMessage();
            } else {
                // Reuse showAllPets to display pets from the selected category
                showAllPets(data.data);
            }
        } catch (error) {
            console.error("Error fetching category data:", error);
        } finally {
            // Hide the spinner after the fetch is complete
            spinner.classList.add('hidden');
        }
    }, 2000); // 2 seconds delay
}

// Function to display a default message and image for the Birds category
const showBirdMessage = () => {
    const cardContainer = document.getElementById('pets-card-container');

    // Clear the container before showing the message
    cardContainer.innerHTML = '';

    // Create a div for the custom bird message
    const birdMessageDiv = document.createElement('div');
    birdMessageDiv.classList.add('text-center', 'mt-5');

    birdMessageDiv.innerHTML = `
        <h2 class="text-3xl font-bold">No birds available at the moment!</h2>
        <p class="mt-3">Please check back later. Meanwhile, enjoy this beautiful bird image.</p>
        <img class="mx-auto mt-5 rounded-lg h-64 w-auto" src="https://example.com/default-bird.jpg" alt="Default Bird Image">
    `;

    // Append the bird message div to the container
    cardContainer.append(birdMessageDiv);
}


// Load all pets on page load by default
loadAllPets();
