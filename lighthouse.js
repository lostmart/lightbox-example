const fullscreen_array = document.querySelectorAll(".fullscreen")

fullscreen_array.forEach((full_btn, i) => {
	full_btn.addEventListener("click", (e) => {
		console.log(i)
	})
})
