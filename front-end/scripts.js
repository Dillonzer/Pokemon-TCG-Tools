const pokeurl = "https://pkmntcgapi-production.up.railway.app"
let decklistObject;

window.Twitch.ext.onAuthorized((auth) => {
    token = auth.token;
    userId = auth.userId;
    channelId = auth.channelId
  });

window.onload = function()
{
    EventListeners()  
}

function EventListeners()
{ 
    document.getElementById("togglePrizeTacker").addEventListener("click",function() {prizeTrackerToggle()})
    document.getElementById("toggleDecklistViewer").addEventListener("click",function() {deckViewerToggle()})
    document.getElementById("showDeck").addEventListener("click",function() {ReturnToDeck()})
}

function prizeTrackerToggle() 
{
    var prizeTracker = document.getElementById("prizeTracker")
    var togglePrizeTrackerButton = document.getElementById("togglePrizeTacker")
    var deckViewer = document.getElementById("decklistViewer")
    var toggleDeckViewerButton = document.getElementById("toggleDecklistViewer")

    if(prizeTracker.style.width == "30%")
    {
        prizeTracker.style.width = "0";
        togglePrizeTrackerButton.style.left = "0"
    }
    else
    {
        GetPrizes()
        prizeTracker.style.width = "30%";
        togglePrizeTrackerButton.style.left = "30%"
        deckViewer.style.width = "0";
        toggleDeckViewerButton.style.left = "0"
    }
}

function deckViewerToggle() 
{
    var prizeTracker = document.getElementById("prizeTracker")
    var togglePrizeTrackerButton = document.getElementById("togglePrizeTacker")
    var deckViewer = document.getElementById("decklistViewer")
    var toggleDeckViewerButton = document.getElementById("toggleDecklistViewer")

    if(deckViewer.style.width == "90%")
    {
        deckViewer.style.width = "0";
        toggleDeckViewerButton.style.left = "0"
    }
    else
    {
        CreateDecklistTable()
        deckViewer.style.width = "90%";
        toggleDeckViewerButton.style.left = "90%"
        prizeTracker.style.width = "0";
        togglePrizeTrackerButton.style.left = "0"
    }
}

async function CreateDecklistTable()
{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(pokeurl+"/deckutils/twitchIntegration/decklist/"+channelId, requestOptions)
        .then(response => {return response.json()})
        .then(data => {
            decklistObject = data["decklist"]
            document.getElementById("decklistText").innerHTML = decklistObject;
            var raw = JSON.stringify({ "decklist": data["decklist"]})
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions2 = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            
            fetch(pokeurl+"/deckutils/generateDecklist", requestOptions2)
                .then(response => {return response.json()})
                    .then(data => {
                        var decklistTable = document.getElementById('decklistTable');    
                        decklistTable.innerHTML="";
                        let fullList = data["cards"];
                        for(let i = 0; i < fullList.length; i++)
                        {
                            let card = fullList[i]
                            let cardDiv = document.createElement('div');
                            let cardImage = document.createElement('img');//CREATE CARD IMAGE
                            let cardAmountSpan = document.createElement('span');//CREATE CARD AMOUNT SPAN
                            cardImage.src = card.imageUrlHiRes
                            cardImage.className = "deckCard"
                            cardAmountSpan.innerHTML = card.deckCount
                            cardDiv.appendChild(cardImage);
                            cardDiv.appendChild(cardAmountSpan);
                            decklistTable.appendChild(cardDiv);

                            if(i == fullList.length - 1)
                            {
                                let cardDiv = document.createElement('div');
                                let exportDecklist = document.createElement('button');
                                exportDecklist.innerHTML = "Show Decklist"
                                exportDecklist.className = "exportButton"
                                cardDiv.appendChild(exportDecklist);                                
                                exportDecklist.addEventListener("click",function() {ShowDecklist()})
                                decklistTable.appendChild(cardDiv);
                            }
                        }
                })
            
        })

    
}

async function GetPrizes()
{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(pokeurl+"/deckutils/twitchIntegration/prizes/"+channelId, requestOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById("prize1").src = data["prize1"]
            document.getElementById("prize2").src = data["prize2"]
            document.getElementById("prize3").src = data["prize3"]
            document.getElementById("prize4").src = data["prize4"]
            document.getElementById("prize5").src = data["prize5"]
            document.getElementById("prize6").src = data["prize6"]

            if(data["prize1Taken"])
            {                
                document.getElementById("prize1").style.opacity = "15%"
            }
            else
            {
                document.getElementById("prize1").style.opacity = "100%"
            }
            if(data["prize2Taken"])
            {                
                document.getElementById("prize2").style.opacity = "15%"
            }
            else
            {
                document.getElementById("prize2").style.opacity = "100%"
            }
            if(data["prize3Taken"])
            {                
                document.getElementById("prize3").style.opacity = "15%"
            }
            else
            {
                document.getElementById("prize3").style.opacity = "100%"
            }
            if(data["prize4Taken"])
            {                
                document.getElementById("prize4").style.opacity = "15%"
            }
            else
            {
                document.getElementById("prize4").style.opacity = "100%"
            }
            if(data["prize5Taken"])
            {                
                document.getElementById("prize5").style.opacity = "15%"
            }
            else
            {
                document.getElementById("prize5").style.opacity = "100%"
            }
            if(data["prize6Taken"])
            {                
                document.getElementById("prize6").style.opacity = "15%"
            }
            else
            {
                document.getElementById("prize6").style.opacity = "100%"
            }
        })
}

function ShowDecklist()
{   
    document.getElementById('decklistTable').style.display = "none"   
    document.getElementById("decklistTextArea").style.display = "block"
}

function ReturnToDeck()
{   
    document.getElementById('decklistTable').style.display = "flex"   
    document.getElementById("decklistTextArea").style.display = "none"
}