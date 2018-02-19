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
                
            /*    var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            */
            
            }
        }
        //Not Done Yet
    };
    
    //Make the request
    //request.open('GET','http://badshahmoulik.imad.hasura-app.io/counter',true);
    request.open('GET','http://badshahmoulik.imad.hasura-app.io/submit-name',true);
    request.send(null);
    
    //Submit name
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    var submit = document.getElementById('submit_btn');
    submit.onclick = function() {
        //Make a request and send a name
        //Capture the list of names and render it as a list
        
        var names = [];
        var list = '';
        for(var i=0;i<names.length ; i++){
            list += '<li>'+ names[i] +'</li>';
        }
        var ul = document.getElementById('namelist');
        ul.innerHTML = list;
    };
    
    
    
};