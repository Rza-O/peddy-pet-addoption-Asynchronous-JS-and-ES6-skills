const loadAllPets = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    showAllPets(data.pets);
}
const showAllPets = (pets) => {
    // console.log(pets);
    const cardContainer = document.getElementById('pets-card-container');
    pets.forEach(pet => {
        console.log(pet);
        const card = document.createElement('div');
        card.classList = 'border-2', 'border-solid', ' border-gray-400', 'rounded-xl';
        card.innerHTML = `
                        <div class="p-5"><img class="object-cover rounded-lg" src=${pet.image} alt=""></div>
                        <div class="p-5 flex flex-col gap-2">
                            <h3 class="text-2xl font-extrabold">${pet.pet_name}</h3>
                            <p><i class="fa-solid fa-grip"></i> Breed: ${pet.breed}</p>
                            <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
                            <p><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
                        </div>
        `;
        cardContainer.append(card);
    });
}
loadAllPets();
