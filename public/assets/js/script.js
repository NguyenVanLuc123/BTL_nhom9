//show-alert
console.log(1)
const show_alert=document.querySelector("[show-alert]");

if(show_alert){
    const time=parseInt(show_alert.getAttribute("data-time"));
    const close_alert=show_alert.querySelector("[close-alert]");

    close_alert.addEventListener('click',()=>{
        show_alert.classList.add("alert-hidden");
    })
    setTimeout(()=>{
        show_alert.classList.add("alert-hidden");
    },time);
  
}

// and show-alert

//button-deleted
const form_deleted_Acount = document.querySelector("#form-deleted-button");
const path = form_deleted_Acount.getAttribute("data-path");

document.addEventListener('click', (event) => {
    if (event.target && event.target.hasAttribute('button-deleted')) {
        const ID_delete = event.target.getAttribute("data-id");
        const MaP=event.target.getAttribute("data-MaP");
      
        // Hiển thị modal
        const modal = document.getElementById("custom-confirm-modal");
        modal.style.display = "flex";

        // Sự kiện cho nút "Xóa"
        document.getElementById("confirm-delete").onclick = () => {
            if(MaP){
                form_deleted_Acount.action = path + `${ID_delete}/${MaP}?_method=DELETE`;
            }
            else{
            form_deleted_Acount.action = path + `${ID_delete}?_method=DELETE`;
            }
            form_deleted_Acount.submit();
            modal.style.display = "none"; // Đóng modal
        };

        // Sự kiện cho nút "Hủy"
        document.getElementById("confirm-cancel").onclick = () => {
            modal.style.display = "none"; // Đóng modal
        };
    }
});



//END button-deleted

//Slidebar

document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = window.location.pathname; // Lấy URL hiện tại
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  
    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentUrl) {
        link.classList.add("active-link"); // Thêm lớp 'active-link' vào thẻ a khớp URL
      }
    });
  });
  

// end sliderbar
// Preview multiple images
const upload_images = document.querySelectorAll("[upload-image]");

if (upload_images) {
    upload_images.forEach(upload_image => {
        const input_image = upload_image.querySelector("[upload-image-input]");
        const preview_image = upload_image.querySelector("[upload-image-preview]");

        if (input_image && preview_image) {
            input_image.addEventListener("change", (e) => {
                const file = e.target.files[0];

                if (file) {
                    // Kiểm tra định dạng file
                    if (!file.type.startsWith("image/")) {
                        alert("Vui lòng chọn file ảnh hợp lệ.");
                        input_image.value = ""; // Reset input
                        preview_image.src = ""; // Reset preview
                        return;
                    }
                    preview_image.src = URL.createObjectURL(file);
                }
            });
        }
    });
}



//form submit

document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            const submitButton = form.querySelector("button[type='submit'], input[type='submit']");
            if (submitButton) {
                submitButton.disabled = true; // Vô hiệu hóa nút
                submitButton.textContent = "Submitting..."; // Hiển thị trạng thái
            }
        });
    });
});
//end formsubmit