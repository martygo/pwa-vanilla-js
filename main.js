const apiKey = 'd607f83907ef497fb3b7e014e3547a18';

const row = document.querySelector("#row");

window.addEventListener("load", e => {
	updateNews();

	if ('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('sw.js');
		} catch(e) {
			console.error("sw registered failed", e);
		}
	}
});

async function updateNews () {
	const response = await fetch(`https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`);
	const json = await response.json();

	row.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle (article) {
	return `
		<div class="col-sm-4 mb-3">
			<div class="card">

      			<img src="${article.urlToImage}" class="card-img-top">
      			<div class="card-body">
      				<h4 class="card-title">
      					<a href="${article.url}" class="card-link">
      						${article.title}
      					</a>
      				</h4>
      				<p class="card-text">
      					${article.description}
      				</p>
      				<p class="card-subtitle text-muted">
      					Escrito por <strong>${article.author}</strong>
      				</p>

                </div>
           	</div>
        </div>
	`;
}