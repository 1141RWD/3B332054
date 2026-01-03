const modal = document.getElementById("modal");
const cartModal = document.getElementById("cartModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalImg = document.getElementById("modalImg");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const reviewList = document.getElementById("reviewList");
const userName = document.getElementById("userName");
const userComment = document.getElementById("userComment");



let slideIndex=0;
let cart={}, currentProduct={};

/* 輪播 */
function showSlides(){
let s=document.querySelectorAll(".slide"),
d=document.querySelectorAll(".dot");
s.forEach(x=>x.style.display="none");
d.forEach(x=>x.classList.remove("active"));
slideIndex=(slideIndex+1)%s.length;
s[slideIndex].style.display="block";
d[slideIndex].classList.add("active");
setTimeout(showSlides,3000);
}
showSlides();
function currentSlide(n){slideIndex=n-1;showSlides();}

/* 頁面 */
function showSection(id,el){
document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
document.querySelectorAll("nav a").forEach(a=>a.classList.remove("active"));
el.classList.add("active");
}

function goProducts(){
    showSection('products', document.querySelectorAll('nav a')[1]);
}

/* 商品 Modal */
function openModal(t,d,p,i){
modal.style.display="block";
modalTitle.innerText=t;
modalDesc.innerText=d;
modalPrice.innerText="NT$"+p;
modalImg.src=i;
currentProduct={title:t,price:p,img:i};
}
function closeModal(){modal.style.display="none";}

/* 購物車 */
function addCart(){
const n=currentProduct.title;
cart[n]?cart[n].qty++:cart[n]={...currentProduct,qty:1};
updateCart(); closeModal();
}
function updateCart(){
let total=0,qty=0,box=cartItems;
box.innerHTML="";
Object.values(cart).forEach(i=>{
qty+=i.qty; total+=i.price*i.qty;
box.innerHTML+=`
<div class="cart-item">
<img src="${i.img}">
<div class="cart-info"><strong>${i.title}</strong><br>NT$${i.price}</div>
<div class="qty">
<button onclick="chg('${i.title}',-1)">−</button>${i.qty}
<button onclick="chg('${i.title}',1)">＋</button>
</div></div>`;
});
cartCount.innerText=qty;
cartTotal.innerText=total;
}
function chg(n,d){
cart[n].qty+=d;
if(cart[n].qty<=0)delete cart[n];
updateCart();
}
document.querySelector(".cart").onclick=()=>cartModal.style.display="block";
function closeCart(){cartModal.style.display="none";}

function checkout(){
    if(Object.keys(cart).length === 0){
        alert("哭哭!購物車沒泡芙，趕快去購買吧～");
        return;
    }
    let message = "🧾 結帳明細\n\n";
    let total = 0;

    for(let id in cart){
        let item = cart[id];
        let subTotal = item.price * item.qty;
        total += subTotal;

        message += `${item.title} × ${item.qty} ＝ NT$${subTotal}\n`;
    }

    message += "--------------------\n";
    message += `總金額：NT$${total}\n\n`;
    message += "感謝您的購買 ❤️";

    alert(message);
    // 清空購物車
    cart = {};
    updateCart();
    closeCart();
}
/* 分類 */
function filterProducts(t,btn){
document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
document.querySelectorAll('.product').forEach(p=>{
p.style.display=(t==='all'||p.classList.contains(t))?'block':'none';
});
document.querySelector('.classic-title').style.display=(t!=='ice')?'block':'none';
document.querySelector('.ice-title').style.display=(t!=='classic')?'block':'none';
document.querySelector('.divider').style.display=(t==='all')?'block':'none';
}

let currentStar = 0;

// 點星星
function setStar(n){
    currentStar = n;
    document.querySelectorAll(".star").forEach((s,i)=>{
        s.classList.toggle("active", i < n);
    });
}

// 新增留言
function addReview(){
    const name = userName.value.trim();
    const comment = userComment.value.trim();

    if(!name || !comment || currentStar === 0){
        alert("請填寫名字、留言，並選擇星等 ⭐");
        return;
    }

    let stars = "★".repeat(currentStar) + "☆".repeat(5 - currentStar);

    const review = document.createElement("div");
    review.className = "review";
    review.innerHTML = `
        <strong>${stars} ${name}</strong>
        <p>${comment}</p>
    `;

    reviewList.prepend(review);

    // 清空
    userName.value = "";
    userComment.value = "";
    currentStar = 0;
    document.querySelectorAll(".star").forEach(s=>s.classList.remove("active"));
}