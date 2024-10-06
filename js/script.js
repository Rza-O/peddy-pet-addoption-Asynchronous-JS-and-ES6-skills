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
                            <h3 class="text-2xl font-extrabold">${pet?.pet_name ?? 'Not Mentioned'}</h3>
                            <p><i class="fa-solid fa-grip"></i> Breed: ${pet?.breed ?? 'Not Mentioned'}</p>
                            <p><i class="fa-regular fa-calendar"></i> Birth: ${pet?.date_of_birth ?? 'Not Mentioned'}</p>
                            <p><i class="fa-solid fa-mercury"></i> Gender: ${pet?.gender ?? 'Not Mentioned'}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet?.price ?? 'Not Mentioned$'}</p>
                        </div>
                        <div>
                        </div>
        `;
        cardContainer.append(card);
    });
}
loadAllPets();
// const card = `
//   <div class="card">
//     <h2>${user?.name ?? 'Unknown Name'}</h2>
//     <p>${user?.age ?? 'Age not available'}</p>
//     <p>${user?.job ?? 'Job not specified'}</p>
//   </div>
// `;
