const filterCont = document.querySelector(".filter")

photosArray.forEach((img) => {
	filterCont.innerHTML += `
        <div class="card" tabindex="0" aria-label="${img.title} - ${img.category}">
            <img
                class="post_img"
                src="${img.imageUrl}"
                alt="${img.title}"
            />

            <img
                class="fullscreen"
                src="./assets/maximize.svg"
                alt="logo"
                role="button"
                aria-pressed="false"
            />
            <span class="title">${img.title}</span>
            <span class="categorie">${img.category}</span>
        </div>
    
    `
})
