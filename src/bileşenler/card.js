import axios from "axios";
const Card = (makale) => {
  // GÖREV 5
  // ---------------------
  // Aşağıda gördüğünüz işaretlemeyi döndürmesi gereken bu fonksiyonu uygulayın.
  // Tek argümanı olarak "anabaslik", "yazarFoto" ve "yazarAdı" özelliklerine sahip bir "makale" nesnesi alır.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle tam olarak eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  // Bir kullanıcı bir kartı tıkladığında makalenin başlığının konsola kaydedilmesi için click event dinleyicisi ekleyin.
  //
  // <div class="card">
  //   <div class="headline">{ anabaslik }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ yazarFoto }>
  //     </div>
  //     <span>{ yazarAdı } tarafından</span>
  //   </div>
  // </div>
  //
  const card = document.createElement('div');
  card.className = "card";

  const headline = document.createElement('div');
  headline.className = 'headline';
  headline.textContent = makale.anabaslik;

  const author = document.createElement("div");
  author.classList.add("author");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const yazarFoto = document.createElement("img");
  yazarFoto.setAttribute("src", makale.yazarFoto);

  const yazarAdi = document.createElement("span");
  yazarAdi.textContent = `${makale.yazarAdi} tarafından`;

  imgContainer.appendChild(yazarFoto);
  author.appendChild(imgContainer);
  author.appendChild(yazarAdi);
  card.appendChild(headline);
  card.appendChild(author);

  card.addEventListener("click", () => {
    console.log(makale.anabaslik);
    });

    return card;
}


const cardEkleyici = (secici) => {
  // GÖREV 6
  // ---------------------
  // Tek bağımsız değişkeni olarak bir css seçici alan bu fonksiyonu uygulayın.
  // Makaleleri bu uç noktadan almalıdır: `http://localhost:5001/api/makaleler` (console.log ile test edin!!).
  // Bununla birlikte, makaleler tek bir düzenli dizi halinde organize edilmemiştir. Yanıtı yakından inceleyin!
  // Card bileşenini kullanarak yanıttaki her makale nesnesinden bir kart oluşturun.
  // Her cardı, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //


  axios.get("http://localhost:5001/api/makaleler")
  .then((response) => {
    const makaleler = response.data.makaleler; 
    const categories = Object.keys(makaleler);

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const articles = makaleler[category];
      
      for (let j = 0; j < articles.length; j++) {
        const article = articles[j];
        const card = Card(article);
        const container = document.querySelector(secici);
        container.appendChild(card);
      }
    }

  })
  .catch((error) => {
    console.log(error);
  });
}

export { Card, cardEkleyici }
