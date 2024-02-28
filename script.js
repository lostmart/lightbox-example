const filterCont = document.querySelector(".filter")

photosArray.forEach((img) => {
	filterCont.innerHTML += `
        <div class="card">
            <img
                class="post_img"
                src="${img.imageUrl}"
                alt="example photo"
            />

            <img
                class="fullscreen"
                src="./assets/maximize.svg"
                alt="logo"
                role="button"
                aria-pressed="false"
            />
            <img
                class="lightbox-eye"
                alt="lightbox eye"
                role="button"
                aria-pressed="false"
                src="./assets/eye.svg"
            />
            <span class="title">${img.title}</span>
            <span class="categorie">${img.category}</span>
        </div>
    
    `
})
