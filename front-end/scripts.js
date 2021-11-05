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
    document.getElementById("toggleCardViewer").addEventListener("click",function() {cardViewerToggle()})
    document.getElementById("toggleDecklistViewer").addEventListener("click",function() {deckViewerToggle()})
}

function prizeTrackerToggle() 
{
    var prizeTracker = document.getElementById("prizeTracker")
    var toggleButton = document.getElementById("togglePrizeTacker")
    if(prizeTracker.style.width == "200px")
    {
        prizeTracker.style.width = "0";
        toggleButton.style.paddingLeft = "0"
    }
    else
    {
        prizeTracker.style.width = "200px";
        toggleButton.style.paddingLeft = "195px"
    }
}

function cardViewerToggle() 
{
    var prizeTracker = document.getElementById("cardViewer")
    var toggleButton = document.getElementById("toggleCardViewer")
    if(prizeTracker.style.width == "200px")
    {
        prizeTracker.style.width = "0";
        toggleButton.style.paddingRight = "0"
    }
    else
    {
        prizeTracker.style.width = "200px";
        toggleButton.style.paddingRight = "195px"
    }
}

function deckViewerToggle() 
{
    var prizeTracker = document.getElementById("decklistViewer")
    var toggleButton = document.getElementById("toggleDecklistViewer")
    if(prizeTracker.style.height == "90%")
    {
        prizeTracker.style.height = "0";
        toggleButton.style.paddingBottom = "0"
    }
    else
    {
        prizeTracker.style.height = "90%";
        toggleButton.style.paddingBottom = "52%"
    }
}