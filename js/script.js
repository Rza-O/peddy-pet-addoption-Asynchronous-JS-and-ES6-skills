// Fetching All pets for the Landing page
const loadAllPets = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    showAllPets(data.pets);
}


const showAllPets = (pets) => {
    // console.log(pets);
    const cardContainer = document.getElementById('pets-card-container');
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
const loadPetsCategories = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await response.json();
    categoriesByButton(data.categories);
}
loadPetsCategories();

const categoriesByButton = (categories) => {
    // console.log(categories);
    const categoryBtnContainer = document.getElementById('categories-btn-container');
    categories.forEach(category => {
        console.log(category)
        const categoriesBtn = document.createElement('button');
        categoriesBtn.classList.add('btn', 'btn-lg','text-2xl', 'rounded-2xl', 'bg-transparent', 'border-2');
        categoriesBtn.innerHTML = `<img src="${category.category_icon}" alt=""></img> ${category.category}`;
        categoryBtnContainer.append(categoriesBtn);
    });
}
