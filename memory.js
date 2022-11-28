
var cards = ["gimli.png", "legolas.png", "aragorn.png", "aragorn.png", "arwena.png", "gandalf.png", "legolas.png", "frodo.png", "gimli.png", "gandalf.png", "frodo.png", "arwena.png"];
shuffle(cards);
var cards_objects = []

for (var i = 0; i < 12; i++) 
{
     cards_objects.push(document.getElementById('c' + i ));
}

cards_objects.forEach(
    function(element, index) 
    {
        element.addEventListener("click", function() {revealCard(index); });
    }
)

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function revealCard(nr)
{
	var opacityValue = $('#c'+nr).css('opacity');
	
	
	if (opacityValue != 0 && lock == false)
	{
		lock = true;
			
		var obraz = "url(img/" + cards[nr] + ")";
		
		$('#c'+nr).css('background-image', obraz);
		$('#c'+nr).addClass('cardA');
		$('#c'+nr).removeClass('card');
		
		if(oneVisible == false)
		{
			//first card
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			//second card
			if(cards[visible_nr] == cards[nr])
			{
				setTimeout(function() { hide2Cards(nr, visible_nr) }, 750);
			}
			else
			{
				setTimeout(function() { restore2Cards(nr, visible_nr) }, 1000);
			}
			
			turnCounter++;
			$('.score').html('Turn counter: '+turnCounter);
			oneVisible = false;
		}
		
	}
	
}

function hide2Cards(nr1, nr2)
{
	$('#c'+nr1).css('opacity', '0');
	$('#c'+nr2).css('opacity', '0');
	
	pairsLeft--;
	
	if(pairsLeft == 0)
	{
		$('.board').html('<h1>Congratulations!<br>Done in '+turnCounter+' turns</h1>');
	}
	
	lock = false;
}

function restore2Cards(nr1, nr2)
{
	$('#c'+nr1).css('background-image', 'url(img/karta.png)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardA');	

	$('#c'+nr2).css('background-image', 'url(img/karta.png)');
	$('#c'+nr2).addClass('card');
	$('#c'+nr2).removeClass('cardA');
	
	lock = false;
}
