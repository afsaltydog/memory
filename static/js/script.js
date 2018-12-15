//alert("This is an alert!");

var arrOfImages = ["balloon1.jpg","balloon2.jpg","balloon3.jpg","balloon4.jpg","balloon5.jpg","balloon6.jpg","balloon7.jpg","balloon8.jpg","balloon9.jpg"];

function doubleImages(arr){
	for (var i = arr.length - 1; i >= 0; i--)
	{
		arr.push(arr[i]);
	}
	return arr;
}
console.log(doubleImages(arrOfImages));

function displayCards(arr){
	var container = document.getElementById("container");

	for (var i = 0; i < arr.length; i++)
	{
		var newImgElement = document.createElement("img");
		newImgElement.src = "static/images/" + arr[i];

		newImgElement.id = i;

		newImgElement.className = "card";

		container.appendChild(newImgElement);
	}
}

function shuffleCards(arr) {
	for (var i = 0; i < arr.length; i++)
	{
		var idx1 = Math.floor(Math.random()*arr.length);
		var idx2 = Math.floor(Math.random()*arr.length);

		var temp = arr[idx1];
		arr[idx1] = arr[idx2];
		arr[idx2] = temp;
	}
	return arr;
}

function hideACard(idx) {
	var specificCard = document.getElementById(idx);

	specificCard.src = "static/images/questionmark.png";
}

function hideAllCards(arr) {
	for (var i = 0; i < arr.length; i++)
{
	hideACard(i);
}
}

shuffleCards(arrOfImages);
displayCards(arrOfImages);
hideAllCards(arrOfImages);


var cardsPicked = [];
function revealCard(event) {
	if (cardsPicked.length > 1)
		return;

	var clickedImageId = event.target.id;

	var clickedImage = document.getElementById(clickedImageId);

	clickedImage.src = "static/images/"+arrOfImages[clickedImageId];

	cardsPicked.push(clickedImageId);

	if (cardsPicked.length == 2) {
		if (arrOfImages[cardsPicked[0]] == arrOfImages[cardsPicked[1]])
			cardsPicked = [];
		else
		{
			var hidePickedCards = function() {
				hideACard(cardsPicked[0]);
				hideACard(cardsPicked[1]);
				cardsPicked = [];
			}
			window.setTimeout(hidePickedCards, 1000);
		}
	}

	var isDone = true;
	var cCards = document.getElementsByClassName("card");
	for (var i = 0; i < cCards.length; i++)
	{
		console.log("src = "+cCards[i].src);
		if (cCards[i].src == "file:///C:/Users/aferg/Documents/School/MemoryMatch/static/images/questionmark.png")
		{
			isDone = false;
		}

	}

	if (isDone)
	{
		shuffleCards(arrOfImages);
		window.setTimeout(hideAllCards(arrOfImages), 1000);
	}
}

var cards = document.getElementsByClassName("card");
for (var i = 0; i < cards.length; i++)
{
	cards[i].addEventListener("click", revealCard);
}


