// Fetching All pets for the Landing page
const loadAllPets = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    showAllPets(data.pets);
}


const showAllPets = (pets) => {
    // console.log(pets);
    const cardContainer = document.getElementById('pets-card-container');
    cardContainer.innerHTML = '';
    pets.forEach(pet => {
        // console.log(pet);
        const card = document.createElement('div');
        card.classList.add('border-2', 'rounded-xl');
        card.innerHTML = `
                        <div class="p-5 object-cover"><img class=" rounded-lg h-44 w-full" src=${pet.image} alt=""></div>
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
loadAllPets();

// fetching pets by category
const loadPetsCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await response.json();
    categoriesButton(data.categories);
}
loadPetsCategories();

const categoriesButton = (categories) => {
    // console.log(categories);
    const categoryBtnContainer = document.getElementById('categories-btn-container');
    categories.forEach(category => {
        // console.log(category)
        const categoriesBtn = document.createElement('button');
        // categoriesBtn.setAttribute('id', `${category.category}`);
        // removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category.category}`);
        // activeBtn.classList.add('active');
        categoriesBtn.classList.add('btn', 'btn-lg', 'text-2xl', 'rounded-2xl', 'bg-transparent', 'border-2');
        categoriesBtn.innerHTML = `<img src="${category.category_icon}" alt=""></img> ${category.category}`;
        // categoryBtnContainer.innerHTML = `<button class="btn btn-lg text-2xl rounded-2xl bg-transparent border-2"><img src="${category.category_icon}" alt=""></img> ${category.category}</button>`;

        // Adding onclick handler to the button
        categoriesBtn.onclick = () => {
            categoryClickHandler(category);
            btnActive(categoriesBtn);
        }
        categoryBtnContainer.append(categoriesBtn);
    });
}

// Active Button function
const btnActive = (active) => {
    const buttons = document.querySelectorAll('#categories-btn-container button');
    buttons.forEach(button =>{
        button.classList.remove('bg-[#e6f1f2]', 'border-primary');
    });
    active.classList.add('bg-[#e6f1f2]', 'border-primary');
}

// Loading Category by button
const categoryClickHandler = async (category) => {
    const spinner = document.getElementById('spinner');
    const cardContainer = document.getElementById('pets-card-container');
    cardContainer.innerHTML = '';
    spinner.classList.remove('hidden');
    cardContainer.classList.remove('bg-[#f8f8f8]')
    cardContainer.classList.add('grid');
    setTimeout(async () => {
        try {
            const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category.category}`);
            const data = await response.json();
            if (category.category === 'Bird') {
                emptyBirdMessage();
            }
            else {
                showAllPets(data.data);
            }
        }
        // catch (err) {
        //     console.log(err);
        // }
        finally {
            spinner.classList.add('hidden');
        }
    }, 2000);
}

const emptyBirdMessage = () => {
    const cardContainer = document.getElementById('pets-card-container');
    cardContainer.innerHTML = '';
    cardContainer.classList.remove('grid');
    cardContainer.classList.add('bg-[#f8f8f8]', 'flex', 'justify-center');
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'p-20');
    errorMessage.innerHTML = `
        <img class="mb-7" src="./images/error.webp" alt=""></img>
        <h2 class="text-center text-2xl font-extrabold mb-5">No information Available</h2>
        <p class="text-center text-lg font-light">We're currently out of birds. Please check back with us soon for availability updates. If you have any questions or would like to be notified when birds are back in stock, feel free to contact our customer service team.</p>
    `;
    cardContainer.append(errorMessage);

}

