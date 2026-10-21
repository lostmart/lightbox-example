# Lightbox Exercise Guide

In this exercise you will build a **lightbox** (image viewer overlay) step by step. The HTML structure, CSS styles, and photo data are already provided. Your job is to write the JavaScript that brings it all to life.

## What You Have

| File            | Status        | Description                                                                 |
| --------------- | ------------- | --------------------------------------------------------------------------- |
| `index.html`    | Provided      | Page structure with one hardcoded card and the lightbox markup              |
| `style.css`     | Provided      | All styles (gallery grid, hover effects, lightbox overlay)                  |
| `photos.js`     | Provided      | An array of 11 photo objects (`imageUrl`, `title`, `category`, `reference`) |
| `script.js`     | **Your work** | You will dynamically generate cards here                                    |
| `lighthouse.js` | **Your work** | You will add all lightbox interactivity here                                |

## Before You Start

Open `index.html` in your browser. You should see:

- A header, a single hardcoded card with a beach photo, and a footer
- Hovering over the card reveals a dark overlay with an eye icon, a title, and a category
- The lightbox overlay exists in the HTML but is hidden (`display: none`)

Take a moment to read through `index.html` and `style.css` to understand the structure and class names. Look at the hardcoded `.card` div - you will reproduce this structure dynamically.

---

## Step 1 - Link the JavaScript files

The `index.html` is missing `<script>` tags. Add them **before the closing `</html>` tag**, right after `</body>`.

You need three script tags, **in this order**:

1. `photos.js` - the data (must load first)
2. `script.js` - generates the cards (needs the data)
3. `lighthouse.js` - adds interactivity (needs the cards to exist)

**Why does order matter?** Each script depends on what the previous one created. If `script.js` runs before `photos.js`, the `photosArray` variable won't exist yet.

<details>
<summary>Hint</summary>

```html
<script src="./photos.js"></script>
<script src="./script.js"></script>
<script src="./lighthouse.js"></script>
```

</details>

---

## Step 2 - Dynamically generate the photo cards

Open `script.js`. Your goal: loop over `photosArray` and create a `.card` for each photo inside the `.filter` container, replacing the single hardcoded card.

### 2.1 - Select the container

Use `document.querySelector()` to select the element with class `filter` and store it in a variable.

### 2.2 - Clear the hardcoded card

Set the container's `innerHTML` to an empty string so the hardcoded card is removed.

### 2.3 - Loop and build cards

Use `photosArray.forEach()` to loop over each photo object. For each one, append HTML to the container's `innerHTML` using a **template literal** (backtick string with `${}`).

Each card should follow this structure (look at the hardcoded card in `index.html` as reference):

```
div.card
  img.post_img        → the photo (src = imageUrl, alt = title)
  img.fullscreen      → the eye icon (src = ./assets/eye.svg)
  span.title          → the photo title
  span.categorie      → the photo category
```

Add `tabindex="0"` and an `aria-label` on the `.card` div for accessibility.

<details>
<summary>Hint - template literal structure</summary>

```js
photosArray.forEach((img) => {
  filterCont.innerHTML += `
    <div class="card" tabindex="0" aria-label="${img.title} - ${img.category}">
      <img class="post_img" src="${img.imageUrl}" alt="${img.title}" />
      <img
        class="fullscreen"
        src="./assets/eye.svg"
        alt="view fullscreen"
        role="button"
        aria-pressed="false"
      />
      <span class="title">${img.title}</span>
      <span class="categorie">${img.category}</span>
    </div>
  `;
});
```

</details>

**Checkpoint:** Refresh the browser. You should see all 11 photo cards in a grid layout with hover effects.

---

## Step 3 - Open the lightbox on click

Now open `lighthouse.js`. This is where all interactivity goes.

### 3.1 - Select the DOM elements you will need

Use `querySelector` / `querySelectorAll` / `getElementById` to grab:

```js
const fullscreen_array = document.querySelectorAll(".fullscreen");

const lightbox = document.querySelector(".lightbox");
const lightboxClose = document.querySelector(".lightbox__close");
const imgThumbnail = document.getElementById("imgThumbnail");

const lightboxNext = document.querySelector(".lightbox__next");
const lightboxPrev = document.querySelector(".lightbox__prev");

const lightboxRef = document.querySelector(".lightbox__ref");
const lightboxCat = document.querySelector(".lightbox__cat");
```

### 3.2 - Create state variables

You need two global variables to track the lightbox state:

```js
let showLightBox = false;
let arrayIndex = null;
```

- `showLightBox` - is the lightbox currently visible?
- `arrayIndex` - which photo from the array is currently displayed?

### 3.3 - Write the toggle function

Create a function called `checkLighBox()` that:

- If `showLightBox` is `true`: hides the lightbox (`display = "none"`) and sets `showLightBox` to `false`
- If `showLightBox` is `false`: shows the lightbox (`display = "flex"`) and sets `showLightBox` to `true`

<details>
<summary>Hint</summary>

```js
function checkLighBox() {
  if (showLightBox) {
    lightbox.style.display = "none";
    showLightBox = false;
  } else {
    lightbox.style.display = "flex";
    showLightBox = true;
  }
}
```

</details>

### 3.4 - Write the update function

Create a function called `updateDom(passedIndex)` that updates the lightbox content based on the photo at `photosArray[passedIndex]`:

- Set `imgThumbnail.src` to the photo's `imageUrl`
- Set `lightboxRef.textContent` to the photo's `reference`
- Set `lightboxCat.textContent` to the photo's `category`

### 3.5 - Add click listeners on the eye icons

Use `fullscreen_array.forEach()` to add a `"click"` event listener on each fullscreen icon. When clicked:

1. Set `arrayIndex` to the current index `i`
2. Call `updateDom(arrayIndex)` to load the photo
3. Call `checkLighBox()` to show the lightbox

<details>
<summary>Hint</summary>

```js
fullscreen_array.forEach((full_btn, i) => {
  full_btn.addEventListener("click", () => {
    arrayIndex = i;
    updateDom(arrayIndex);
    checkLighBox();
  });
});
```

</details>

**Checkpoint:** Click any eye icon - the lightbox should appear with that photo. There's no way to close it yet (that's next).

---

## Step 4 - Close the lightbox

### 4.1 - Close button

Add a `"click"` event listener on `lightboxClose` that calls `checkLighBox()`.

### 4.2 - Close on outside click

Add a `"click"` event listener on `window`. Inside it, check if the user clicked on the dark background (not the image). Use `e.target` to compare against the lightbox background elements:

```js
window.addEventListener("click", (e) => {
  if (
    e.target == lightboxBlackBg ||
    e.target.className === "lightbox__container" ||
    e.target.className === "lightbox"
  ) {
    lightbox.style.display = "none";
    showLightBox = false;
  }
});
```

You will need to select `lightboxBlackBg` at the top of the file:

```js
const lightboxBlackBg = document.querySelector(".lightbox__box");
```

**Checkpoint:** You should now be able to open and close the lightbox by clicking the eye icon, the close button, or the dark background.

---

## Step 5 - Next and Previous navigation

### 5.1 - Write the navigation functions

Create two functions:

**`addImageIndex()`** - moves to the next photo:

- If `arrayIndex` is at the last photo (`photosArray.length - 1`), wrap around to `0`
- Otherwise, increment by 1
- Call `updateDom(arrayIndex)`

**`removeImageIndex()`** - moves to the previous photo:

- If `arrayIndex` is `0`, wrap around to `photosArray.length - 1`
- Otherwise, decrement by 1
- Call `updateDom(arrayIndex)`

### 5.2 - Wire up the buttons

Add `"click"` event listeners on `lightboxNext` and `lightboxPrev` that call the respective functions.

<details>
<summary>Hint</summary>

```js
lightboxNext.addEventListener("click", () => {
  addImageIndex();
});

lightboxPrev.addEventListener("click", () => {
  removeImageIndex();
});
```

</details>

**Checkpoint:** Open the lightbox, then click the Next/Previous buttons. The image, reference, and category should update. It should wrap around from last to first and vice versa.

---

## Step 6 - Keyboard navigation

Add a `"keydown"` event listener on `window` that handles three keys **only when the lightbox is open** (`showLightBox === true`):

| Key          | Action                                                                    |
| ------------ | ------------------------------------------------------------------------- |
| `Escape`     | Close the lightbox (set `display` to `"none"`, `showLightBox` to `false`) |
| `ArrowRight` | Call `addImageIndex()`                                                    |
| `ArrowLeft`  | Call `removeImageIndex()`                                                 |

Use `e.code` to check which key was pressed.

<details>
<summary>Hint</summary>

```js
window.addEventListener("keydown", (e) => {
  if (showLightBox && e.code === "Escape") {
    lightbox.style.display = "none";
    showLightBox = false;
    return;
  }
  if (showLightBox && e.code === "ArrowRight") {
    return addImageIndex();
  }
  if (showLightBox && e.code === "ArrowLeft") {
    return removeImageIndex();
  }
});
```

</details>

**Checkpoint:** Open the lightbox, use arrow keys to navigate, press Escape to close.

---

## Step 7 - Open lightbox from keyboard focus

Right now, you can Tab to a card (thanks to `tabindex="0"`) but pressing Enter does nothing. Fix that.

Select all `.card` elements and add a `"keydown"` listener on each. When `Enter` or `Space` is pressed:

1. Call `e.preventDefault()` to stop the page from scrolling (for Space)
2. Set `arrayIndex` to the card's index
3. Call `updateDom(arrayIndex)`
4. Call `checkLighBox()`

<details>
<summary>Hint</summary>

```js
const cards_array = document.querySelectorAll(".card");

cards_array.forEach((card, i) => {
  card.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      e.preventDefault();
      arrayIndex = i;
      updateDom(arrayIndex);
      checkLighBox();
    }
  });
});
```

</details>

**Checkpoint:** Tab through the cards and press Enter - the lightbox should open with the correct photo.

---

## Summary of concepts used

| Concept                              | Where you used it                           |
| ------------------------------------ | ------------------------------------------- |
| `querySelector` / `querySelectorAll` | Selecting DOM elements (Step 3)             |
| `getElementById`                     | Selecting the thumbnail image (Step 3)      |
| `innerHTML`                          | Dynamically creating cards (Step 2)         |
| Template literals                    | Building HTML strings with `${}` (Step 2)   |
| `forEach`                            | Looping over arrays (Steps 2, 3, 7)         |
| `addEventListener`                   | Click, keydown events (Steps 3-7)           |
| `e.target`                           | Detecting what was clicked (Step 4)         |
| `e.code`                             | Detecting which key was pressed (Steps 6-7) |
| `e.preventDefault()`                 | Stopping default browser behavior (Step 7)  |
| `style.display`                      | Showing/hiding elements (Steps 3-4)         |
| `.textContent` / `.src`              | Updating element content (Step 3)           |
| `tabindex` / `aria-label`            | Accessibility attributes (Step 2)           |
