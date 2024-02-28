// toutes les elements 'fullscreen'
const fullscreen_array = document.querySelectorAll(".fullscreen")

const lightbox = document.querySelector(".lightbox")
const lightboxClose = document.querySelector(".lightbox__close")
const imgThumbnail = document.getElementById("imgThumbnail")

const lightboxNext = document.querySelector(".lightbox__next")
const lightboxPrev = document.querySelector(".lightbox__prev")

const lightboxRef = document.querySelector(".lightbox__ref")
const lightboxCat = document.querySelector(".lightbox__cat")

const lightboxBlackBg = document.querySelector(".lightbox__box")

// console.log(fullscreen_array)

// inicialize la variable global afficher lightbox
let showLightBox = false
let arrayIndex = null

fullscreen_array.forEach((full_btn, i) => {
	full_btn.addEventListener("click", () => {
		checkLighBox()
		// console.log(imgThumbnail.src)
		arrayIndex = i
		updateDom(arrayIndex)
	})
})

/*  EVENT LISTENERS   */

//rachouter an event listener
lightboxClose.addEventListener("click", () => {
	checkLighBox()
})

// rachouter en evenment sur la fleche souivent
lightboxNext.addEventListener("click", () => {
	addImageIndex()
})

lightboxPrev.addEventListener("click", () => {
	removeImageIndex()
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (e) => {
	if (
		e.target == lightboxBlackBg ||
		e.target.className === "lightbox__container" ||
		e.target.className === "lightbox"
	) {
		lightbox.style.display = "none"
		console.log("afuera !!!")
	}
})

// keyboard navigation
window.addEventListener("keydown", (e) => {
	// if the "esc" key is pressed
	if (showLightBox && e.code === "Escape") {
		lightbox.style.display = "none"
		showLightBox = false
		return
	}
	if (showLightBox && e.code === "ArrowRight") {
		return addImageIndex()
	}
	if (showLightBox && e.code === "ArrowLeft") {
		return removeImageIndex()
	}
})

/*    fuctions     */
// open or closes the lightbox
function checkLighBox() {
	if (showLightBox) {
		lightbox.style.display = "none"
		showLightBox = false
	} else {
		lightbox.style.display = "flex"
		showLightBox = true
	}
}

// updates the index value according to the selected pic
function addImageIndex() {
	if (arrayIndex === photosArray.length - 1) {
		arrayIndex = 0
	} else {
		arrayIndex = arrayIndex + 1
	}
	updateDom(arrayIndex)
}

// updates the index value according to the selected pic
function removeImageIndex() {
	if (arrayIndex == 0) {
		arrayIndex = photosArray.length - 1
	} else {
		arrayIndex = arrayIndex - 1
	}
	// console.log(arrayIndex)
	updateDom(arrayIndex)
}

// updates the DOM based on the changes of its index array
function updateDom(passedIndex) {
	imgThumbnail.src = photosArray[passedIndex].imageUrl
	lightboxRef.textContent = photosArray[passedIndex].reference
	lightboxCat.textContent = photosArray[passedIndex].category
}
