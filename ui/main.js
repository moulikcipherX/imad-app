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
    //request.open('GET','http://badshahmoulik.imad.hasura-app.io/submit-name',true);
    request.send(null);
};


    //Submit name
    
    var submit = document.getElementById('submit_btn');
    submit.onclick = function() {
        
    //Create A request object
    var request = new XMLHttpRequest();
    
    //Capture The response and store it in the variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE ){
            //Take Some Action
            if(request.status === 200){
                //Capture the list of names and render it as a list
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0;i<names.length ; i++){
                list += '<li>'+ names[i] +'</li>';
        }
        var ul = document.getElementById('namelist');
        ul.innerHTML = list;
                
            }
        }
        //Not Done Yet
    };
    
    //Make the request
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://badshahmoulik.imad.hasura-app.io/submit?name='+name,true);
    request.send(null);
};






    //Login Username and Password
    
    var input = document.getElementById('submit-btn');
    input.onclick = function() {
        
    //Create A request object
    var request = new XMLHttpRequest();
    
    //Capture The response and store it in the variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE ){
            //Take Some Action
            if(request.status === 200){
                //Logged In Message
                console.log('User Logged In');
            } else if(request.status === 403) {
                alert('Enter The Valid username and password');
            } else if(request.status === 500) {
                alert('Server is Down');
            } 
        }
    };
    
    //Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open('POST','http://badshahmoulik.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};









