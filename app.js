//variables
var hands,can_click,clicked,phase,activePlayer,store;
var endButton = document.getElementById('end-button');
var startButton = document.getElementById('start-button');
var hand0 = document.getElementById('hand-0');
var hand1 = document.getElementById('hand-1');
var hand2 = document.getElementById('hand-2');
var hand3 = document.getElementById('hand-3');
for(var i=0;i<4;i++){
    document.getElementById('hand-'+i).style.opacity = '0';
}

//data
hands = [0,0,0,0];
can_click = [0,0,0,0];
clicked = [0,0,0,0];
//console.log(can_click[0][0]);
document.querySelector('.splits').style.opacity ='0';
document.getElementById('turn').style.opacity ='0';
//functions
function init(){
    hands=[1,1,1,1];
    can_click=[1,1,0,0];
    clicked = [0,0,0,0];
    phase=0;
    //console.log(hands[0][0]);
    for(var i=0;i<4;i++){
        document.getElementById('hand-'+i).src = 'us-1.png';
        document.getElementById('hand-'+i).style.opacity = '1';
    }
    activePlayer=0;
    store=0;
    document.getElementById('turn').textContent ='palyer '+(activePlayer+1)+'s turn';
    document.getElementById('turn').style.opacity ='1';
}
function end(){
   for(var i=0;i<4;i++){
        document.getElementById('hand-'+i).style.opacity = '0';
   }
    can_click = [0,0,0,0];
    document.getElementById('start-button').value = 'Start';
    document.querySelector('.splits').style.opacity ='0';
    document.getElementById('turn').style.opacity ='0';
}
function funHand(x){
    console.log('fun');
    if(can_click[x]===1){
        if(phase===0){
            store=hands[x];
            phase=1;
            can_click=[1,1,1,1];
            can_click[x]=0;
            console.log('active='+activePlayer);
            console.log('hands='+hands);
            console.log('can_click='+can_click);
            console.log(store,hands[x]);
        }
        else if(phase===1){
            if(x===activePlayer*2||x===(activePlayer*2+1)) temp(x);
            else{
                hands[x]+=store;
                if(hands[x]>=5) hands[x]=0;
                document.getElementById('hand-'+x).src = 'us-'+hands[x]+'.png';
                if(hands[Math.floor(x/2)*2]===0&&hands[Math.floor(x/2)*2+1]===0){
                    document.getElementById('turn').textContent ='palyer '+(activePlayer+1)+' WINS';
                    can_click=[0,0,0,0];
                    return;
                }
                store=0;
                phase=0;
                can_click = [0,0,0,0];
                activePlayer = Math.floor(x/2);
                document.getElementById('turn').textContent ='palyer '+(activePlayer+1)+'s turn';
                can_click[activePlayer*2]=1;
                can_click[activePlayer*2+1]=1;
                console.log('active='+activePlayer);
                console.log('hands='+hands);
                console.log('can_click='+can_click);
                console.log(store,hands[x]);
            }
        }
    }
}
function temp(x){
    document.querySelector('.splits').style.opacity ='1';
    document.getElementById('split-submit').addEventListener('click',function(){
        var s1=document.getElementById('split1').value;
        var s2=document.getElementById('split2').value;
        console.log(s1,s2,store,hands[x]);
        /*if((+s1 + +s2)!=(store+hands[x])){
            //alert('invalid split');
            temp(x);
        }
        else{*/
            var y = (activePlayer*2)+((x+1)%2);
            hands[x]= +s2;
            if(hands[x]>=5) hands[x]=0;
            document.getElementById('hand-'+x).src= 'us-'+hands[x]+'.png';
            hands[y]= +s1;
            if(hands[y]>=5) hands[y]=0;
            document.getElementById('hand-'+y).src= 'us-'+hands[y]+'.png';
            store=0;
            phase=0;
            can_click = [0,0,0,0];
            activePlayer = (Math.floor(x/2)+1)%2;
            document.getElementById('turn').textContent ='palyer '+(activePlayer+1)+'s turn';
            can_click[activePlayer*2]=1;
            can_click[activePlayer*2+1]=1;
            console.log('active='+activePlayer);
            console.log('hands='+hands);
            console.log('can_click='+can_click);
            console.log(store,hands[x]);
        //}
        document.querySelector('.splits').style.opacity ='0';
    });
}
//click
startButton.addEventListener('click', init);
endButton.addEventListener('click', end);
hand0.addEventListener('click', function(){
    funHand(0)});
hand1.addEventListener('click', function(){
    funHand(1)});
hand2.addEventListener('click', function(){
    funHand(2)});
hand3.addEventListener('click', function(){
    funHand(3)});

