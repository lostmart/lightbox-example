// toutes les elements 'fullscreen'
const fullscreen_array = document.querySelectorAll(".fullscreen")

const lightbox = document.querySelector(".lightbox")
const lightboxClose = document.querySelector(".lightbox__close")
const imgThumbnail = document.getElementById("imgThumbnail")

const lightboxNext = document.querySelector(".lightbox__next")
const lightboxPrev = document.querySelector(".lightbox__prev")

// console.log(fullscreen_array)

// inicialize la variable global afficher lightbox
let showLightBox = false
let arrayIndex = null

fullscreen_array.forEach((full_btn, i) => {
	full_btn.addEventListener("click", () => {
		checkLighBox()
		// console.log(imgThumbnail.src)
		arrayIndex = i
		imgThumbnail.src = photosArray[arrayIndex].imageUrl
	})
})

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

/*    fuctions     */

function checkLighBox() {
	if (showLightBox) {
		lightbox.style.display = "none"
		showLightBox = false
	} else {
		lightbox.style.display = "flex"
		showLightBox = true
	}
}

function addImageIndex() {
	if (arrayIndex === photosArray.length - 1) {
		arrayIndex = 0
	} else {
		arrayIndex = arrayIndex + 1
	}
	imgThumbnail.src = photosArray[arrayIndex].imageUrl
}

function removeImageIndex() {
	if (arrayIndex == 0) {
		arrayIndex = photosArray.length - 1
	} else {
		arrayIndex = arrayIndex - 1
	}
	console.log(arrayIndex)
	imgThumbnail.src = photosArray[arrayIndex].imageUrl
}
