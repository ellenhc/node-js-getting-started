function search() {
    let searchString = $('#searchString').val();
    console.log(searchString);

    var params = { apikey: 'f661da59', s: searchString };

    //$.get(URL,callback);
    $.get('http://www.omdbapi.com/', params, function(data, status) {
        console.log(data);
        updateResultList(data);
    });
}

function updateResultList(data) {
    if (data.Search && data.Search.length > 0) {
        let resultList = $('#ulResults');
        resultList.empty();

        for (let i = 0; i < data.Search.length; i++) {
            let movie = JSON.stringify(data.Search[i]);
            let title = data.Search[i].Title;
            resultList.append('<li><p>' + title + "</p><button id='detailsButton' onclick='details(" + movie + ")'>Details</button></li>");
        }
    }
}

function details(movie) {
    console.log(movie.imdbID);
}