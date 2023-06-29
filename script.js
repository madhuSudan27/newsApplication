const API_KEY="d38c53e3fc0442d09f707d3f7bf00960";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const response=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await response.json();
    console.log(data);
    bindData(data.articles);

}
function  bindData(articles){
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById('template-news-card');
    // why this is important 
    cardsContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });

}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-image');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDescription=cardClone.querySelector('#news-description');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;

    const date= new Date(article.publisheAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name } • ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })

}
let currSelectedNav=null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=navItem;
    currSelectedNav.classList.add('active');
}

const searchButton= document.getElementById('search-button');
const searchText= document.getElementById('search-input');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=null;
});
