let petsData = [];
// Fetching All pets for the Landing page
const loadAllPets = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    petsData = data.pets;
    showAllPets(petsData);
}


const showAllPets = (pets) => {
    const cardContainer = document.getElementById('pets-card-container');
    cardContainer.innerHTML = '';
    pets.forEach(pet => {
        const card = document.createElement('div');
        card.classList.add('border-2', 'rounded-xl');
        card.innerHTML = `
                        <div class="p-5 object-cover"><img class=" rounded-lg h-44 w-full" src=${pet.image} alt=""></div>
                        <div class="p-5 flex flex-col gap-2">
                            <h3 class="text-2xl font-extrabold">${pet?.pet_name ?? 'Not Mentioned'}</h3>
                            <p><i class="fa-solid fa-grip"></i> Breed: ${pet?.breed ?? 'Not Mentioned'}</p>
                            <p><i class="fa-regular fa-calendar"></i> Birth: ${pet?.date_of_birth ?? new Date('2024-06-18').getFullYear()}</p>
                            <p><i class="fa-solid fa-mercury"></i> Gender: ${pet?.gender ?? 'Not Mentioned'}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet?.price ?? 'Not Mentioned$'}</p>
                        </div>
                        <hr>
                        <div class="flex justify-center gap-4 items-center p-2">
                        <button id="like-card-btn" onclick="likeBtnFn('${pet.image}')" class="btn btn-sm btn-ghost border-2 border-solid border-gray-200 "><i class="fa-regular fa-thumbs-up"></i></button>

                        <button id="adopt-card-btn" onclick="adoptedBtn(this)" class="btn btn-sm btn-ghost border-2 border-solid border-gray-200 text-primary">Adopt</button>
                        
                        <button id="details-card-btn" onclick="detailsModal('${pet.petId}')" class="btn btn-sm btn-ghost border-2 border-solid border-gray-200 text-primary">Details</button>
                        </div>
        `;
        cardContainer.append(card);
    });
}

// Adopted Button Functionality
const adoptedBtn = (btn) => {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'modal-open');

    modal.innerHTML = `
    <div class="modal-box flex flex-col justify-center text-center">
    <img class="w-14 mx-auto" src="./images/handshake.gif" alt=""></img>
    <h2 class="font-extrabold text-4xl mb-3">Congrats</h2>
    <p>Adoption Process is Started For Your Pet</p>
    <p id="countdown" class="text-4xl font-bold mt-4">3</p>
    </div>
    `;
    document.body.appendChild(modal);

    const countdownElement = document.getElementById('countdown');
    let countdownValue = 3;
    const countdownInterval = setInterval(() => {
        countdownValue--;
        countdownElement.textContent = countdownValue;

        if(countdownValue <= 0) {
            clearInterval(countdownInterval);
            modal.classList.remove('modal-open');
            document.body.removeChild(modal);

            btn.textContent = 'Adopted';
            btn.disabled = true;
            btn.classList.add('btn-disabled');
            btn.classList.remove('text-primary');
        }
    }, 1000);
}


// Details Button Functionality
const detailsModal = async (id) => {
    try {
        const res = await fetch(` https://openapi.programming-hero.com/api/peddy/pet/${id}`);
        const { petData } = await res.json();
        console.log(petData);
        const modal = document.createElement('dialog');
        modal.id = 'my_modal_5';
        modal.className = 'modal modal-bottom sm:modal-middle';
        modal.innerHTML = `
        <div class="modal-box">
            <div class="mb-5 object-cover"><img class=" rounded-lg h-full w-full" src=${petData.image} alt="">
            </div>
            <h3 class=" mb-5 text-2xl font-extrabold">${petData?.pet_name ?? 'Not Mentioned'}</h3>
            <div class=" flex gap-4">
                <div>
                    <p class="mb-1"><i class="fa-solid fa-grip"></i> Breed: ${petData?.breed ?? 'Not Mentioned'}</p>
                    <p class="mb-1"><i class="fa-regular fa-calendar"></i> Birth: ${petData?.date_of_birth ?? new Date('2024-06-18').getFullYear()}</p>
                    <p class="mb-3"><i class="fa-solid fa-mercury"></i> Vaccination Status: ${petData?.vaccinated_status ?? 'Not Mentioned'}</p>
                </div>
                <div>
                    <p class="mb-1"><i class="fa-solid fa-mercury"></i> Gender: ${petData?.gender ?? 'Not Mentioned'}</p>
                    <p class="mb-2"><i class="fa-solid fa-dollar-sign"></i> Price: ${petData?.price ?? 'Not Mentioned$'}</p>
                </div>
                </div>
                <hr>
                <div>
                    <h5 class="mt-3 font-extrabold">Details Information</h5>
                    <p class="mt-3 font-light">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                        <ul class="list-disc ml-4 mt-2 font-light">
                            <li>The point of using is that it has a more-or-less normal distribution of letters, as opposed to using.</li>
                        </ul></p>
                </div> 
            <div class="modal-action">
                <form action="dialog">
                    <button class="btn bg-[#e6f1f2] border border-[#cde2e5] text-primary">Close</button>
                </form>
            </div>
        </div>
        `;
        document.body.appendChild(modal);
        modal.showModal();
        const closeBtn = modal.querySelector('button');
        closeBtn.addEventListener('click', () => {
            event.preventDefault();
            modal.close();
            modal.remove();
        });
    } 
    catch (error) {
        console.log("This is the error message: ", error);
    }
}

loadAllPets();

// Like Button Behavior Function
const likeBtnFn = (image) => {
    console.log(image);
    const likedImgContainer = document.getElementById('liked-img-container');
    likedImgContainer.classList.add('grid', 'grid-cols-2', 'gap-6', 'p-5', 'auto-rows-min')
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('p-2', 'border', 'rounded-lg');
    imgDiv.innerHTML = `
    <img class="object-cover rounded-lg" src="${image}" alt=""></img>
    `;
    likedImgContainer.append(imgDiv);
}

// fetching pets by category
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
        categoriesBtn.classList.add('btn', 'btn-lg', 'sm:text-lg', 'md:text-2xl', 'rounded-2xl', 'bg-transparent', 'border-2');
        categoriesBtn.innerHTML = `<img class="object-cover" src="${category.category_icon}" alt=""></img> ${category.category}`;

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
    buttons.forEach(button => {
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
        catch (err) {
            console.log(err);
        }
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

// Sort by price Functionality

const sortByPrice = () => {
    const cardContainer = document.getElementById('pets-card-container');
    const spinner = document.getElementById('spinner');
    cardContainer.innerHTML = '';
    spinner.classList.remove('hidden');
    setTimeout(()=>{
        try {
            const sortedPets = [...petsData].sort((a, b) => b.price - a.price);
            showAllPets(sortedPets);
        } catch(error){
            console.log('Error Message: ', error);
        }
        finally{
            spinner.classList.add('hidden');
        }
    },2000);
}