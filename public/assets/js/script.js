//show-alert

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
const form_deleted_Acount=document.querySelector("#form-deleted-button");
const path=form_deleted_Acount.getAttribute("data-path");
document.addEventListener('click', (event) => {
    
    if (event.target && event.target.hasAttribute('button-deleted')) {
        const isconfirm=confirm ("bạn có chắc chắn muốn xóa tài khoản này không");
        if(isconfirm){
        const ID_delete=event.target.getAttribute("data-id");
        form_deleted_Acount.action=path + `${ID_delete}?_method=DELETE`;
        form_deleted_Acount.submit();
        }
        
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
  

//end sliderbar