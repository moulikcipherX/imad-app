//Counter Code
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function()
{
    //Make a request to a counter endpoint
    
    
    //Capture The response and store it in the variable
    
    
    //Render the variable in the correct span
    
    counter = counter + 1;
    var span = document.getElementById('span');
    span.innerHTML = counter.toString();
};