//Counter Code
var button = document.getElementById('counter');


button.onclick = function()
{
    //Create A request object
    var request = new XMLHttpRequest();
    
    //Capture The response and store it in the variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE ){
            //Take Some Action
            if(request.status === 200){
                
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //Not Done Yet
    };
    
    //Make the request
    request.open('GET','http://badshahmoulik.imad.hasura-app.io/counter',true);
    request.send(null);
    
};