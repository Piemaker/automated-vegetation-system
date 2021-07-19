const imgInp = document.getElementById("image")
const imagePreview = document.getElementById("imagePreview")
 imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
      imagePreview.src = URL.createObjectURL(file)
    }
  }