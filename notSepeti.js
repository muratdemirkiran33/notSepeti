const yeniGorev = document.querySelector(".veri");
const gorevEkle = document.querySelector(".buton");
const gorev = document.querySelector(".gorev");
const gorevler = document.querySelector(".gorevler");
document.addEventListener("DOMContentLoaded", localStorageOku());
yeniGorev.addEventListener("keyup", bas);
function bas(enter) {
  if (enter.keyCode === 13) {
    gorevEkle.click();
    console.log(yeniGorev.value);
  }
}
gorevEkle.addEventListener("click", yeniGorevEkle);

function yeniGorevEkle() {
  if (yeniGorev.value != "") {
    gorevOlustur(yeniGorev.value);
    localStorageYaz(yeniGorev.value);
  }
  yeniGorev.value = "";
}

gorevler.addEventListener("click", tamamlandiVeyaSil);
function tamamlandiVeyaSil(e) {
  const tiklanan = e.target;
  if (tiklanan.classList.contains("fa-check-square")) {
    tiklanan.parentElement.parentElement.classList.toggle("gorevtamamlandi");
  }
  if (tiklanan.classList.contains("fa-trash")) {
    tiklanan.parentElement.parentElement.classList.toggle("kaybol");
    const SilinecekGorev =
      tiklanan.parentElement.parentElement.children[0].innerText;
    localeSorageSil(SilinecekGorev);
    tiklanan.parentElement.parentElement.addEventListener(
      "transitionend",
      function () {
        tiklanan.parentElement.parentElement.remove();
      }
    );
  }
}

function gorevOlustur(gorev) {
  const gorevDiv = document.createElement("div");
  gorevDiv.classList.add("gorev");
  const gorevLi = document.createElement("li");
  gorevLi.classList.add("liste");
  gorevLi.innerText = gorev;
  gorevDiv.appendChild(gorevLi);
  gorevler.appendChild(gorevDiv);
  const simgeDiv = document.createElement("div");
  simgeDiv.classList.add("simge");
  simgeDiv.innerHTML = `<i class="yapildi far fa-check-square"></i>
  <i class="gorevSil fas fa-trash"></i>`;
  gorevDiv.appendChild(simgeDiv);
}

function VeriyiDiziyeCevir() {
  let veri;
  localStorage.getItem("veri") === null
    ? (veri = [])
    : (veri = JSON.parse(localStorage.getItem("veri")));
  return veri;
}

function localStorageYaz(yeniGorev) {
  let veri = VeriyiDiziyeCevir();
  veri.push(yeniGorev);
  localStorage.setItem("veri", JSON.stringify(veri));
}

function localStorageOku() {
  let veri = VeriyiDiziyeCevir();
  veri.forEach((eleman) => {
    gorevOlustur(eleman);
  });
}

function localeSorageSil(SilinecekGorev) {
  let veri = VeriyiDiziyeCevir();
  const silinecekElemanIndex = veri.indexOf(SilinecekGorev);
  veri.splice(silinecekElemanIndex, 1);
  localStorage.setItem("veri", JSON.stringify(veri));
}
