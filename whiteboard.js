var player={
    x:0,
    y:0,
    xSpeed: 0,
    ySpeed: 0,
    speed: 0.085,
    color: "black",
    size: 20
}
const move={
    left: false,
    right: false,
    up: false,
    down: false
}
const grid=document.getElementById("grid");
const mapGrid=document.getElementById("mapGrid");
var gameTime=20;
var pause=false;
var friction=0.1;
var blockSize=30;
function drawMap(){
    let canvas=document.getElementById("mapCanvas");
    let ds=canvas.getContext("2d");
    /*Initialize left first
    canvas.style.left=mapGrid.offsetLeft+"px";
    if(parseInt(canvas.style.left)+canvas.width>=grid.offsetLeft+grid.offsetWidth){
        
    }
    canvas.style.top=mapGrid.offsetTop+"px";
    if(parseInt(canvas.style.top)+canvas.height>=grid.offsetTop+grid.offsetHeight){
        //Use map size as indicator for speed
        
    }*/
    canvas.style.left=mapGrid.offsetLeft-(player.x)+"px";
    canvas.style.top=mapGrid.offsetTop-player.y+"px";
    canvas.width = USMap[0].length*blockSize;
    canvas.height = USMap.length*blockSize;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    //Draws the color and shape of each state block
    for(let i=0;i<USMap.length;i++){
        for(let j=0;j<USMap[i].length;j++){
            let blockX=j*blockSize;
            let blockY=i*blockSize;
            switch(USMap[i][j]){
                //May need to change colors so need to separate, using if and includes
                case "":
                    ds.fillStyle="rgba(0,0,0,0)";
                    break;
                default:
                    ds.fillStyle="rgb(100,255,100)";
                    break;
            }
            if(spanishMap){
                if(USMap[i][j].includes("NM")||USMap[i][j].includes("AZ")||USMap[i][j].includes("TX")||USMap[i][j].includes("CO")||USMap[i][j].includes("UT")||USMap[i][j].includes("NV")||USMap[i][j].includes("CA")){
                    ds.fillStyle="blueviolet";
                }
            }
            if(englishMap){
                if(USMap[i][j].includes("NH")||USMap[i][j].includes("VT")||USMap[i][j].includes("ME")||USMap[i][j].includes("MA")||USMap[i][j].includes("RI")||USMap[i][j].includes("CT")||USMap[i][j].includes("VA")||USMap[i][j].includes("NC")||USMap[i][j].includes("SC")||USMap[i][j].includes("GA")){
                    ds.fillStyle="green";
                }
            }
            if(frenchMap){
                if(USMap[i][j].includes("LA")||USMap[i][j].includes("AR")||USMap[i][j].includes("MO")||USMap[i][j].includes("IA")||USMap[i][j].includes("MN")||USMap[i][j].includes("ND")||USMap[i][j].includes("SD")||USMap[i][j].includes("NE")||USMap[i][j].includes("KS")||USMap[i][j].includes("OK")||USMap[i][j].includes("WY")||USMap[i][j].includes("MT")||USMap[i][j].includes("ID")||USMap[i][j].includes("WA")||USMap[i][j].includes("OR")){
                    ds.fillStyle="orange";
                }
            }
            if(dutchMap){
                if(USMap[i][j].includes("NJ")||USMap[i][j].includes("DE")||USMap[i][j].includes("NYLI")){
                    ds.fillStyle="red";
                }
            }
            if(portugalMap){
                if(USMap[i][j].includes("BZ")){
                    ds.fillStyle="rgb(20, 163, 182)";
                }
            }
            if(coloniesMap){
                if(USMap[i][j].includes("ME")||USMap[i][j].includes("NY")||USMap[i][j].includes("NH")||USMap[i][j].includes("MA")||USMap[i][j].includes("RI")||USMap[i][j].includes("CT")||USMap[i][j].includes("PA")||USMap[i][j].includes("NJ")||USMap[i][j].includes("MD")||USMap[i][j].includes("DE")||USMap[i][j].includes("VA")||USMap[i][j].includes("NC")||USMap[i][j].includes("SC")||USMap[i][j].includes("GA")){
                    ds.fillStyle="blue";
                }
            }
            ds.fillRect(blockX,blockY,blockSize,blockSize);
            ds.lineWidth=2;
            if(USMap[i][j].includes("l")){
                ds.beginPath();
                ds.moveTo(blockX+blockSize,blockY);
                ds.lineTo(blockX+blockSize,blockY+blockSize);
                //change to white later or else the dutch colonziation will cover lines
                ds.strokeStyle="red";
                ds.stroke();
            }
            if(USMap[i][j].includes("r")){
                ds.beginPath();
                ds.moveTo(blockX,blockY);
                ds.lineTo(blockX,blockY+blockSize);
                ds.strokeStyle="red";
                ds.stroke();
            }
            if(USMap[i][j].includes("t")){
                ds.beginPath();
                ds.moveTo(blockX,blockY);
                ds.lineTo(blockX+blockSize,blockY);
                ds.strokeStyle="red";
                ds.stroke();
            }
            if(USMap[i][j].includes("b")){
                ds.beginPath();
                ds.moveTo(blockX,blockY+blockSize);
                ds.lineTo(blockX+blockSize,blockY+blockSize);
                ds.strokeStyle="red";
                ds.stroke();
            }
        }
    }
}
function drawPlayer(){
    let canvas=document.getElementById("playerCanvas");
    let dp=canvas.getContext("2d");
    canvas.style.left=grid.offsetLeft+"px";
    canvas.style.top=grid.offsetTop+"px";
    canvas.width = grid.offsetWidth;
    canvas.height = grid.offsetHeight;
    dp.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    /*
    if(document.getElementById("blockColor1").value>=170&&document.getElementById("blockColor2").value<=30&&document.getElementById("blockColor3").value<=70){
        dp.fillStyle="blue";
    } else{
        dp.fillStyle="red";
    }*/
    if(!pic){
        dp.fillStyle=player.color;
    } else{
        dp.fillStyle="rgba(0,0,0,0)";
    }
    dp.fillRect((grid.offsetWidth/2)-(player.size/2),(grid.offsetHeight/2)-(player.size/2),player.size,player.size);
}
document.addEventListener("keydown", function(a){
    let control=a.code;
    switch(control){
        case "ArrowLeft":
            move.left=true;
            break;
        case "ArrowRight":
            move.right=true;
            break;
        case "ArrowUp":
            move.up=true;
            break;
        case "ArrowDown":
            move.down=true;
            break;
        case "KeyM":
            beforeAfter();
            break;
        default:
            break;
    }
});
document.addEventListener("keyup", function(a){
    let control=a.code;
    switch(control){
        case "ArrowLeft":
            move.left=false;
            break;
        case "ArrowRight":
            move.right=false;
            break;
        case "ArrowUp":
            move.up=false;
            break;
        case "ArrowDown":
            move.down=false;
            break;
        case "KeyI":
            info();
            break;
        case "KeyD":
            showD();
            break;
        case "KeyE":
            closeCheckbox();
            break;
        case "KeyP":
            showPerson();
            break;
        default:
            break;
    }
});
var canView=false;
var stateName="";
var pic=false;
function showPerson(){
    let photo=document.getElementById("photo");
    photo.src="Downloads/unnamed-removebg-preview (1).png";
    if(photo.style.display=="block"){
        photo.style.display="none";
        pic=false;
    } else{
        photo.style.display="block";
        pic=true;
    }
}
function closeCheckbox(){
    let box=document.getElementById("checkBox");
    if(box.style.top=="-50%"){
        box.style.top="0%";
    } else{
        box.style.top="-50%";
    }
}
function beforeAfter(){
    let page=document.getElementById("beforeAfter");
    if(canView){
        if(page.style.bottom=="100%"){
            page.style.bottom="12.5%";
        } else{
            page.style.bottom="100%";
        }
    }
}
function closeBeforeAfter(){
    document.getElementById("beforeAfter").style.bottom="100%";
}
function showOcean(){
    let ocean=document.getElementById("ocean");
    if(ocean.style.display=="block"){
        ocean.style.display="none";
    } else{
        ocean.style.display="block";
    }
}
const slideLeft=document.getElementById("slideLeft");
const slideRight=document.getElementById("slideRight");
var slideNum=0;
slideLeft.addEventListener("mouseleave", function(){
    slideLeft.style.borderRightColor="rgba(0, 0, 0, 0.2)";
});
slideLeft.addEventListener("mouseover", function(){
    slideLeft.style.borderRightColor="rgb(241, 183, 94)";
});
slideRight.addEventListener("mouseleave", function(){
    slideRight.style.borderLeftColor="rgba(0, 0, 0, 0.2)";
});
slideRight.addEventListener("mouseover", function(){
    slideRight.style.borderLeftColor="rgb(241, 183, 94)";
});
slideLeft.addEventListener("click", function(){
    slideNum--;
});
slideRight.addEventListener("click", function(){
    slideNum++;
});
var labels=false;
function showLabels(){
    if(!labels){
        labels=true;
    } else{
        labels=false;
    }
}
function info(){
    let info=document.getElementById("infoPage");
    if(info.style.bottom=="0%"){
        info.style.bottom="100%";
        pause=false;
    } else{
        info.style.bottom="0%";
        pause=true;
    }
}
function locateMap(){
    player.x=0;
    player.y=0;
}
function game(){
    player.xSpeed*=friction;
    player.ySpeed*=friction;
    //Moves player, but allow no movement if there's collision
    if(move.right){
        player.xSpeed+=player.speed*gameTime;
    }
    if(move.left){
        player.xSpeed-=player.speed*gameTime;
    }  
    if(move.up){
        player.ySpeed-=player.speed*gameTime;
    }
    if(move.down){
        player.ySpeed+=player.speed*gameTime;
    }
    player.x+=player.xSpeed;
    player.y+=player.ySpeed;
}
var spanishMap=false;
var englishMap=false;
var frenchMap=false;
var dutchMap=false;
var portugalMap=false;
var coloniesMap=false;
setInterval(function(){
    let spanish=document.getElementById("s");
    let english=document.getElementById("e");
    let french=document.getElementById("f");
    let dutch=document.getElementById("d");
    let colonies=document.getElementById("c");
    let reasons=document.getElementById("showReason");
    let portugal=document.getElementById("p");
    let page=document.getElementById("reasonPage");
    drawMap();
    drawPlayer();
    if(spanish.checked){
        spanishMap=true;
    } else{
        spanishMap=false;
    }
    if(english.checked){
        englishMap=true;
    } else{
        englishMap=false;
    }
    if(french.checked){
        frenchMap=true;
    } else{
        frenchMap=false;
    }
    if(dutch.checked){
        dutchMap=true;
    } else{
        dutchMap=false;
    }
    if(colonies.checked){
        coloniesMap=true;
    } else{
        coloniesMap=false;
    }
    if(portugal.checked){
        portugalMap=true;
    } else{
        portugalMap=false;
    }
    if(reasons.checked){
        page.style.top="25%";
    } else{
        page.style.top="-100%";
    }
    let spanishSlide=document.getElementById("slideSpanish");
    let englishSlide=document.getElementById("slideEnglish");
    let frenchSlide=document.getElementById("slideFrench");
    let dutchSlide=document.getElementById("slideDutch");
    let portugalSlide=document.getElementById("slidePortugal");
    let colonySlide=document.getElementById("slideColonies");
    switch(slideNum){
        case 0:
            spanishSlide.style.left="0%";
            englishSlide.style.left="100%";
            frenchSlide.style.left="100%";
            dutchSlide.style.left="100%";
            portugalSlide.style.left="100%";
            colonySlide.style.left="100%";
            slideLeft.style.display="none";
            break;
        case 1:
            spanishSlide.style.left="-100%";
            englishSlide.style.left="0%";
            frenchSlide.style.left="100%";
            dutchSlide.style.left="100%";
            portugalSlide.style.left="100%";
            colonySlide.style.left="100%";
            slideLeft.style.display="block";
            break;
        case 2:
            spanishSlide.style.left="-100%";
            englishSlide.style.left="-100%";
            frenchSlide.style.left="0%";
            dutchSlide.style.left="100%";
            portugalSlide.style.left="100%";
            colonySlide.style.left="100%";
            break;
        case 3:
            spanishSlide.style.left="-100%";
            englishSlide.style.left="-100%";
            frenchSlide.style.left="-100%";
            dutchSlide.style.left="0%";
            portugalSlide.style.left="100%";
            colonySlide.style.left="100%";
            break;
        case 4:
            spanishSlide.style.left="-100%";
            englishSlide.style.left="-100%";
            frenchSlide.style.left="-100%";
            dutchSlide.style.left="-100%";
            portugalSlide.style.left="0%";
            colonySlide.style.left="100%";
            slideRight.style.display="block";
            break;
        case 5:
            spanishSlide.style.left="-100%";
            englishSlide.style.left="-100%";
            frenchSlide.style.left="-100%";
            dutchSlide.style.left="-100%";
            portugalSlide.style.left="-100%";
            colonySlide.style.left="0%";
            slideRight.style.display="none";
            break;
        default:
            break;
    }
    player.speed=0.085*document.getElementById("speed").value;
    document.getElementById("speedValue").innerHTML=document.getElementById("speed").value;
    let tooltip=document.getElementById("tooltip");
    //Make tool tip on top of player
    tooltip.style.top=(grid.offsetHeight/2)-(player.size/2)+grid.offsetTop-tooltip.offsetHeight-10+"px";
    tooltip.style.left=(grid.offsetWidth/2)+grid.offsetLeft-(tooltip.offsetWidth/2)+"px";
    let left=Math.floor((player.x+(grid.offsetWidth/2-(player.size/2)))/blockSize);
    let right=Math.floor((player.x+player.size+(grid.offsetWidth/2-(player.size/2)))/blockSize);
    let top=Math.floor((player.y+(grid.offsetHeight/2-(player.size/2)))/blockSize);
    let bottom=Math.floor((player.y+player.size+(grid.offsetHeight/2-(player.size/2)))/blockSize);
    if(labels){
        if(USMap[top][left].substring(0,2)==USMap[top][right].substring(0,2)&&USMap[top][right].substring(0,2)==USMap[bottom][right].substring(0,2)&&USMap[bottom][right].substring(0,2)==USMap[bottom][left].substring(0,2)){
            tooltip.style.display="block";
            document.getElementById("states").innerHTML=USMap[top][left].substring(0,2);
        } else{
            tooltip.style.display="none";
        }
    } else{
        tooltip.style.display="none";
    }
    if(USMap[top][left].includes("VA")||USMap[top][left].includes("CT")||USMap[top][left].includes("NY")||USMap[top][left].includes("BZ")||USMap[top][left].includes("TX")){
        stateName=USMap[top][left].substring(0,2);
        document.getElementById("states").style.color="black";
        tooltip.style.backgroundColor="rgba(255, 217, 0, 0.8)";
        document.getElementById("moreInfo").style.color="black";
        document.getElementById("moreInfo").innerHTML="Press \"M\" for more Info";
        canView=true;
    } else{
        stateName="";
        document.getElementById("states").style.color="white";
        tooltip.style.backgroundColor="rgba(0, 0, 0, 0.8)";
        document.getElementById("moreInfo").style.color="white";
        document.getElementById("moreInfo").innerHTML="No Info";
        canView=false;
    }
    let state=document.getElementById("stateName");
    let stateInfo=document.getElementById("stateInfo");
    let timeline=document.getElementById("timeline");
    let img=document.getElementById("infoImg");
    switch(stateName){
        case "VA":
            state.innerHTML="Jamestown";
            if(timeline.value==1){
                stateInfo.innerHTML="Before colonized by the British, the location of Jamestown(before being established by the British Colonists as the first permanent settement in the Americas) was inhabited by a Native American group called the Powhatans. The chief of the Powhatan tribes, Wahunsenacawh, formed the Powhatan Confederacy, which consisted of more than 30 Algonquian-speaking Native American tribes that spread out thorugh modern-day Virginia, Maryland, and North Carolina. From agriculture, trades, and battles, the Native Americans in the Powhatan Confederacy were able to sustain a healthy well-being and gain increases in their economy. Moreover, in order to expand his empire and the Powhatan Confederacy, Wahunsenacawh murdered the chiefs of other tribes and appointed his sons, or trusted relatives, in their place. Consequently, those tribes paid tribute to Wahunsenacawh in return for peace and protection. Although the Powhatan Confederacy was only formed due to the deaths of the other chiefs of other tribes, Wahunsenacawh managed to maintain peace among the tribes and their people for a long period of time before the British colonist came.";
                img.src="https://www.historyfiles.co.uk/images/Americas/North/Map_Powhatan_AD1600_max.jpg";
            } else{
                stateInfo.innerHTML="The first group of British people came here to seek for gold and treasure, which they thought were free of taking. Since they came here in search of more power(more land in the Americas than back in Europe, giving them more status), they believed that the Native Americans would assist them and willingly become slaves for them. This did not go as planned, however, as they could not find any gold to bring home. Since all of them were unexperienced farmers with little agricultural knowledge, they soon died to disease. The remaining ones went back to England after a short while after their relationships with the Powhatans grew poor as they kept the habit of stealing provision.<br><br>";
                stateInfo.innerHTML+="Another group of British colonist came after the first ones left with the intention of cultivating tobacco at a large scale, which requires more land and more laborers. This drove them to use the lands that belonged to the Native Powhatan tribes without any compensation or reward. By doing so, the hostility and tension between the Powhatans and the British Colonists increased at a rapid rate. Although the Powhatans viewed the British as valuable allies that would help them fight against Spanish raids and conflicts at first, this continual build up of tension finally broke out into what was known as the Anglo-Powhatan War(1610-1646 CE). This war is separated into three wars, but each one of them was won by the British colonists.<br><br>";
                stateInfo.innerHTML+="<strong>The First Powhatan War(1610-1614 CE)</strong> started when the British colonists started to demand for the return of weaponries that the Powhatans have after previous trades with the colonists. However, the Powhatans did not agree to do so. This start the first war, where instead of a continuous conflict between the two groups of people, it was more like a series of raids and counterraids. Although no one was winning at first, the economic success of the tobacco plantation managed to drove more colonists to come, which became troublesome for Wahunsenacawh. At the end, the colonists kidnapped Pocahontas(Wahunsenacawh\'s daughter) and forced Wahunsenacawh to comply to their demands. Although the Powhatans returned all their tools and weaponries, Pocahontas was not released. However, her stay at the British colony turned her into Christian and made her fell in love with a British men, who then married her.<br><br>";
                stateInfo.innerHTML+="Following the marriage of Pocahontas, the two groups ceased all hostility, leading to a peaceful period known as the Peace of Pocahontas. However, <strong>The Second Powhatan War(1622-1626 CE)</strong> broke out after Wahunsenacawh\'s half brother Opechancanough succeeded his place as the chief of the Powhatans. The reason for this war was unknown, but it started when Opechancanough sent his soldiers into the British colonies, pretending that they wanted to convert to Christianity. Since the colonists have been successful at converting Pocahontas into Christian, they were trying to do the same thing with the other Powhatans. Without the sense of any danger, the colonists welcomed the Powhatan warriors into their colonies, only for them to start what was known as the India Massacre of 1622 CE that killed many of the colonists in the span of only one night. After the massacre, the colonists fought back too, but no one was winning. At the end, the British pretended to hold a peace offering and offered the Powhatans poisoned drinks that killed many of them. This made Opechancanough sue for peace and ended the second war.<br><br>";
                stateInfo.innerHTML+="After the second war, the colonists built a large fence to protect themselves from the Powhatans, maintaining peace for some time. However, Opechancanough did not give up on trying to drive the colonists away from their land, so he launched yet another attack against the colonists, which was the <strong>Third Powhatan War(1644-1646 CE)</strong>. However, Opechancanough was captured at the end and killed, ending the Anglo-Powhatan War once and for all.<br><br>";
                stateInfo.innerHTML+="<strong>Repercussions of European colonization</strong><br>With the establishment of Jamestown, the colonists built enormous tobacco plantations to mass produce tobacco. This lead to Virginia becoming the location of the headquarters of the largest tobacco company in the world. Moreover, due to the fact that British colonists spread Christianity throughout Jamestown, Virginia now has one of the largest Christian populations and one of the most religious population in the United States.";
                img.src="https://o.quizlet.com/hE-OyF77mGAuvfusGkfx4A.jpg";
            }
            break;
        case "BZ":
            state.innerHTML="Inca Empire";
            if(timeline.value==1){
                stateInfo.innerHTML="*Please note that the Inca empire did not include any parts of Brazil, but since the territory of the Inca Empire is not shown on the map, Brazil is the closest region to the Inca Empire, so that's where you can access information about it.<br><br>The Inca Empire stretched all the way from modern Ecuador to Peru, Northern Chile, Bolivia, upland Argentina, and southern Colombia, with the capital being Cuzco. The Incas believed that they were the Children of the Sun God, giving them a divine right to conquer other tribes and people. This helped them become the largest empire in 1533 CE. However, the large expansion of the Inca Empire caused several serious internal problems. First of all, the massive empire was a politically fragile and loose integration of conquered states whose subservience came from Inca military dominance and the taking of hostages to ensure a continued, if uneasy, compliance to Cuzco's rule. Secondly, lots of taxes were extracted from the civilians. Moreover, they also forced people to believe in the Sun God and abandone their religion. All these reasons forced many people to relocate to other parts of the Inca Empire. However, the worst of all is that the Incas had a civil war between Waskar and Atahualpa, who battled in a damaging six-year civil war for control of their father's(the previous king) empire. All of these internal conflicts would soon cause a devastating impact on the Inca Empire when the Spanish onquistadores came.";
                img.src="https://i.pinimg.com/originals/f1/04/2f/f1042f9ecc3f486a39976af5ca8af92c.jpg";
            } else{
                stateInfo.innerHTML="Since he did not find any gold in Colombia as he suspected, Francisco Pizarro was on the verge of giving up. However, a pilot from an expedition in 1528 CE captured a raft full of treasures, which sparked hope for Pizarro. As a result, he went out with other men to South America in search of gold. After he got there, he and his men moved down the coast, killing many Native Americans along the way. This made Atahualpa, who won the civil war and became the king of the Incas, very interested in Pizarro. As a result, the two met and had a great time together chatting and drinking. However, Pizarro ambushed Atahualpa and his army the very next day. With cannons and armours, the Inca soldiers were no match for the Spanish, resulting in 7000 Inca deaths and 0 Spanish casualty. After the battle, the emperor were captured and held for ransom. To save their emperor, the Incas had to accomplish Pizarro's seemingly impossible task, which is to fill up a room that is 6.2 X 4.8 x 2.5 meters large with gold and treasure. This accounts to about 75 million dollars in today's monetary value, which is a lot of money to ask for back then. However, the Incas, who have an abundant amount of gold, silver, and other treasures, filled up the room so fast that Pizarro was shocked at the unprecedented speed of the Incas. This made him demand for yet another room(with the same size) to be filled up with treasure once again. Although the Incas did exactly what Pizarro asked of for the second time, they were all killed at the end. With the death of the Inca emperor, the Spanish continued to conquer the rest of the Inca Empire, spreading deadly diseases along the way and resulting in the fall of Cuzco.";
                stateInfo.innerHTML+="<br><br><strong>Repercussions of European colonization</strong><br>The colonization of the Spanish in the Inca Empire caused most of the South Americans countries to speak Spanish. Moreover, the continual conflicts between the Incas and the Spanish caused mass casualties of the Incas. This resulted in many of the ancient Inca artifacts and cultures to be destoryed, making it almost impossible for scientsts and researchers to understand their unique tradtions and cultural values.";
                img.src="https://miro.medium.com/max/1128/1*JLuHrRZv2lQGi5Vxqpa3lg.jpeg";
            }
            break;
        case "TX":
            state.innerHTML="Aztec Empire";
            if(timeline.value==1){
                stateInfo.innerHTML="*Please note that the Aztec Empire did not include any parts of Texas, but since the territory of the Aztec Empire is not shown on the map, Texas is the closest region to the Aztec Empire, so that's where you can access information about it.<br><br>The Aztecs were considered to be one of the most powerful empires back then, flourishing between 1345 and 1521 CE and dominating ancient Mesoamerica. The Aztec Empire started as two regions of several samll empires that had a war known as the Tepanec War. After the war, an alliance was formed between the three victorious empires, with Tenochtitlan becoming more dominant over time. The Tenochtitlan leader then established the nation as the Aztec Empire, which expanded and flourished with strong military forces. However, the Aztec Empire was loosely kept together through appointments between officials from the Aztec heartland, and it forced its people to change their religions. Most importantly, the Aztecs feared of military interventions, making the Aztec Empire not a homogenous and mature empire where its members had a mutual interest in its preservation. This resulted in many neighbouring power wanting to gain independence from the Aztec Empire because of their extreme measures. In particular, the Tarascan civilization was the major enemy to the Aztec Empire, who later became a vital ally for he Spanish as they helped the Spanish to fight against the Aztecs. However, they did not realise that they would merely be replacing one rapacious overlord for another even more destructive one.";
                img.src="https://www.worldhistory.org/img/r/p/500x600/14181.png?v=1632843902";
            } else{
                stateInfo.innerHTML="The Spanish Governor of Cuba, Diego Velasquez, had already sent several expeditions to explore the mainland coast of America starting in 1517 CE. During those expeditions, the Spanish explorers reported to find Native people with gold treasures there. Surprisingly, some of the indigenous people that the Spanish met were sent by the Aztec king to find out who the mysterious voyagers were, but the lack of understanding of each other's languages drove the Spanish away without the chance to see a much larger civilization. However, the gold ornaments and objects that the Native Americans had were enough to convince the Spanish to launch another expedition to explore the lands of the Americas. This time, the expedition was led by Hernán Cortés, who sailed towards the Aztec heartlands. Words on this expedition, which contained a large military force, soon spread to the Aztec King, Motecuhzoma.<br><br>After consulting with his council of elders, Motecuhzoma decided on a strategy of diplomacy. He sent gold, silver, and other treasures and gifts to the Spanish, but this action only made the Spanish more interested in this land which seemed to have lots of gold and treasure. Despite instructions to return to Cuba, Cortés sent a shipload of the treasures they had so far acquired and letters requesting royal support to Charles V of Spain. He then burnt down all the ships so there was no way back to Spain for him and his men, which would then further persuade his men to stay at the Aztec Empire and conquer it.<br><br>In August 1519 CE, Cortés marched directly to Tenochtitlan, which was the capital of the Aztec Empire(Tenochtitlan was the largest city in the Pre-Columbian Americas known for its large trade centers of goods and services). When Cortés first came to Tenochtitlan, he exchanged valuable gifts with the Aztecs. However, although the reason was unknown, the relationship between the Spanish and the Aztec grew hostile within two weeks. The Spanish then even took the Aztec king as hostage and placed him under house arrest by the small Spanish force. This crisis deepened when the Aztec warrior commanders, unhappy at Motecuhzoma's passivity, overthrew him. Although the Spanish tried to have Motecuhzoma calm the populace, he was struck in the head by a thrown rock and killed. Later on, Cortés block the three main exits of Tenochtitlan, which led to a shortage in food and supply and an outbreak of smallpox disease that was earlier introduced by one of the Spaniards. Consequently, the Aztecs collapsed after 93 days of resistance on the 13th of August, 1521 CE. From the ashes of this disaster rose the new capital of the colony of New Spain, and Cortés was made its first governor in May 1523 CE.";
                stateInfo.innerHTML+="<br><br><strong>Repercussions of European colonization</strong><br>The colonization of the Spanish spread the cultivation of corn around the Americas, which expanded towards the regions of the Great Lakes, making them the top producers of corn in the United States. The Spanish also spread Christianity and the language Spanish across the United States, resulting in many states, especially Texas, having a higher percentage of Spanish-speaking population and Christian population.";
                img.src="https://www.worldhistory.org/img/r/p/500x600/5277.jpg.avif?v=1624972503";
            }
            break;
        case "CT":
        case "NY":
            state.innerHTML="Northeast Americans";
            if(timeline.value==1){
                stateInfo.innerHTML="Before the Dutch first settled in the coastal lands of present-day Long Island down through Connecticut, that region was inhabited by a Native American group called Pequot for thousands of years. However, many European merchants and traders had been visiting the areas near the location of the Pequot tribes for a over a century, which exposed the Native Americans in the region of modern-day Massachusetts, Rhode Island, and Maine with deadly diseases between 1610 to 1618. Fortunately, the Pequot tribes and their people lived inland(away from the European traders that traded near the coast), which helped them avoid the mass death that the European diseases caused. Without any casualties, the Pequot tribe soon became a powerful group able to subjugate others such as the Niantic, Nipmuc, and Mattabesic.";
                img.src="https://i2.wp.com/tlio.org.uk/wp-content/uploads/2018/11/wp-image-2139851629.jpg";
            } else{
                stateInfo.innerHTML="The first Europeans that settled in the regions where the Pequot tribes were located were the Dutch, who came to the Americas in 1614. By 1622, the Dutch had established a trading post there and welcomed trades with all the indigenous tribes of the region. However, the Pequot, who were even more powerful during this time, prohibited others to trade with the Dutch. This caused some conflicts between the Dutch and the Pequot tribe, but ultimately, both came to an agreement and exchanged goods and services peacefully.<br><br>However, the Dutch weren't the only European colonists there. In 1620 CE, a group of British people known as the \"pilgrims\" crossed the Atlantic Ocean on the Mayflower and settled on the coast of Massachusetts. Their settlement established the Plymouth Colony, which flourished in 1622. The success of the Plymouth Colony encouraged even more immigrants to come, establishing more colonies. The English colony then expanded larger and further than before, constructing trading posts near the pre-existing Dutch trading post. The creation of these British trading posts attracted some Peqout to trade with them for a better price. This caused a strain on the Pequot alliance since some are trading with the Dutch, and some are trading with the British. Eventually, some parts of the Pequot tribe had aligned themselves with the English who, they felt, treated them with greater respect and were fairer in trade than the Dutch, causing trade power to shift from the Dutch to the British. As both the British and the Dutch became more powerful, they established colonies called \"New England\" and \"New Netherlands\".<br><br>As tension grew between the British and the Dutch, several British men was killed by the Native people in 1634 because they had mistaken the foreigners as Dutch. Although the casualty was small, the British thought that they could use this as an excuse to drive the Pequot out of their lands to gain more control of the trades. Therefore, the British sent soldiers to attack the Native people, which began what was known as the <strong>Pequot War(1636-1638)</strong>. The war was actually a series of raids on colonial settlements in the fall and winter of 1636 through the spring of 1637. Since the Pequot were losing the battle to the British, they tried to enlist another Native group to be their ally: Narragansett. However, the Narragansett joined with the English and together killed over 700 people.";
                stateInfo.innerHTML+="<br><br><strong>Repercussions of European colonization</strong><br>With the Pequot War, the English was able to expand their reach inland and remove the Dutch from the New England trade. After the Dutch were driven out of the Americas, the Treaty of Hartford was signed to helped the English unify their colonies, creating the first 13 colonies and the first 13 states of the United States. Moreover, the eventual win of the war helped the British succeed in colonizing the Americas, which is why people living in United States speak English instead of Dutch.";
                img.src="https://static.wikia.nocookie.net/totalwar-ar/images/6/68/Pequot_War.jpg/revision/latest?cb=20180812182122";
            }
            break;
        default:
            break;
    }
    let time=document.getElementById("colonizedTime");
    if(timeline.value==1){
        time.innerHTML="Before European Clonization";
    } else{
        time.innerHTML="After European Clonization";
    }
});
function showD(){
    let photo=document.getElementById("photo");
    photo.src="https://www.astaichung.com/uploads/1/3/6/3/13638525/editor/mr-ethan-dombkowski2.jpg?1598862181";
    if(photo.style.display=="block"){
        photo.style.display="none";
        pic=false;
    } else{
        photo.style.display="block";
        pic=true;
    }
}
setInterval(function(){
    //Checks if paused to stop the game
    if(!pause){
        game();
    }
    document.getElementById("sizeValue").innerHTML=document.getElementById("mapSize").value;
    blockSize=parseInt(document.getElementById("mapSize").value);
    player.color="rgb("+document.getElementById("blockColor1").value+","+document.getElementById("blockColor2").value+","+document.getElementById("blockColor3").value+")";
    player.size=document.getElementById("size").value*20;
    document.getElementById("playerSize").innerHTML=player.size;
    let photo=document.getElementById("photo");
    photo.style.left=(window.innerWidth/2)-(player.size/2)+1+"px";
    photo.style.top=(window.innerHeight/2)-(player.size/2)+1+"px";
    photo.style.width=player.size+"px";
    photo.style.height=player.size+"px";
},gameTime);


var USMap=[
    ["","","WAtr","WAt","WAt","WAt","WAtl","IDtl","MTt","MTt","MTt","MTt","MTt","MTt","MTt","MTt","MTt","MTtl","NDt","NDt","NDt","NDt","NDt","NDtl","MNt","MNt","MNt","MNt","MNt","MNtbl","","","","","","","","","","","","","","","","","","","","","","","","","","","","","MEtr","MEtl","","","","","","","",'',"","",'',"","",'',"","",'',"","","","","","",'',"","",'',"","",'',"","",''],
    ["WAtr","WAt","WA","WA","WA","WA","WAl","IDl","MT","MT","MT","MT","MT","MT","MT","MT","MT","MTl","ND","ND","ND","ND","ND","NDl","MN","MN","MN","MN","MNbl","","","","MItr","MItl","","","","","","","","","","","","","","","","","","","","","","","","MEtr","ME","MEl"],
    ['WAr',"WA","WA","WA","WA","WA","WAl","ID","IDtl","MT","MT","MT","MT","MT","MT","MT","MT","MTl","ND","ND","ND","ND","ND","NDl","MN","MN","MN","MNl","WI","WIt","WItl","MIt","MI","MI","MIt","MIbt","MIbt","MIbtl","","","","","","","","","","","","","","","","","","","","MEr","ME","ME","MEtl"],
    ['WAr',"WA","WA","WA","WA","WA","WAl","ID","IDl","MT","MT","MT","MT","MT","MT","MT","MT","MTl","ND","ND","ND","ND","ND","NDl","MN","MN","MN","MNl","WI","WI","WI","WIt","WItl","MI","MIbl","","","","","","","","","","","","","","","","","","","","","","","MEr","ME","ME","MEl"],
    ['ORtr','ORt','ORt','ORt','ORt','ORt','ORtl',"ID","ID","IDtl","MT","MT","MT","MT","MT","MT","MT","MTl","SDt","SDt","SDt","SDt","SDt","SDtl","MN","MN","MN","MNl","WI","WI","WI","WI","WI","WItl","","","","MItr","MItl","","","","","","","","","","NYtr","NYt","NYt","NYt","NYtl","VTt","VTt","VTtl","NHtl","ME","ME","ME","MEbl"],
    ['ORr','OR','OR','OR','OR','OR','ORl',"ID","ID","ID","IDlt","WYt","WYt","WYt","WYt","WYt","WYt","WYtl","SD","SD","SD","SD","SD","SDl","MN","MN","MN","MN","MNtl","WI","WI","WI","WI","WIl","","","MItr","MI","MI","MItl","","","","","","","","NYtr","NY","NY","NY","NY","NYl","VT","VTl","NHt","NHl","ME","ME","MEbl"],
    ['ORr','OR','OR','OR','OR','OR','ORl',"ID","ID","ID","IDl","WY","WY","WY","WY","WY","WY","WYl","SD","SD","SD","SD","SD","SDl","MN","MN","MN","MN","MN","MNtl","WI","WI","WI","WIl","","","MIbr","MI","MI","MI","MItl","","","","","","","NYr","NY","NY","NY","NY","NYl","VT","VTl","NH","NHl","ME","MEbl"],
    ['ORr','OR','OR','OR','OR','OR','ORl',"ID","ID","ID","IDl","WY","WY","WY","WY","WY","WY","WYl","SD","SD","SD","SD","SD","SDl","IAt","IAt","IAt","IAt","IAt","IAtl","WI","WI","WI","WIl","","","","MIr","MI","MI","MIbl","","","NYtr","NYt","NYt","NYt","NY","NY","NY","NY","NY","NYl","VTl","NHt","NH","NHl","MEbl"],
    ['ORr','OR','OR','OR','OR','OR','ORl',"ID","ID","ID","IDl","WY","WY","WY","WY","WY","WY","WYl","NEt","NEt","NEt","NEt","NEt","NEt","NEtl","IA","IA","IA","IA","IA","IAtl","ILt","ILt","ILtl","","","MItr","MI","MI","MIl","","","NYrt","NY","NY","NY","NY","NY","NY","NY","NY","NY","NYl","MAt","MAt","MAt","MAtl"],
    ["CAtr","CAt","CAt","CAtl","NVt","NVt","NVt","NVt","NVtl","UTt","UTtl","WY","WY","WY","WY","WY","WY","WYl","NE","NE","NE","NE","NE","NE","NEl","IA","IA","IA","IA","IA","IAbl","IL","IL","ILl","INt","INt","INtl","OHt","OHt","OHt","OHt","OHtl","PAt","PAt","PAt","PAt","PAt","PAt","PAt","PAt","PAtl","NY","NYl","CTtb","CTtbl","RItbl","MAbl"],
    ["CAr","CA","CA","CAl","NV","NV","NV","NV","NVl","UT","UT","UTt","UTtl","COt","COt","COt","COt","COt","COt","COtl","NE","NE","NE","NE","NEl","IA","IA","IA","IA","IAl","IL","IL","IL","ILl","IN","IN","INl","OH","OH","OH","OH","OHl","PA","PA","PA","PA","PA","PA","PA","PAl","NJt","NJt","NJtl","NYLIb","NYLIbl"],
    ["CAr","CA","CA","CAl","NV","NV","NV","NV","NVl","UT","UT","UT","UTl","CO","CO","CO","CO","CO","CO","COl","NE","NE","NE","NE","NEl","MOt","MOt","MOt","MOt","MOtl","IL","IL","IL","ILl","IN","IN","INl","OH","OH","OH","OH","OHl","PA","PA","PA","PA","PA","PA","PA","PAl","NJ","NJ","NJl"],
    ["CAr","CA","CA","CAl","NV","NV","NV","NV","NVl","UT","UT","UT","UTl","CO","CO","CO","CO","CO","CO","COl","KSt","KSt","KSt","KSt","KSt","KStl","MO","MO","MO","MOl","IL","IL","IL","ILl","IN","IN","INl","OH","OH","OH","OHl","WVtl","PA","PA","PA","PA","PA","PA","PA","PA","PAtl","NJ","NJl"],
    ['CAr',"CA",'CA',"CAl","NV","NV","NV","NV","NVl","UT","UT","UT","UTl","CO","CO","CO","CO","CO","CO","COl","KS","KS","KS","KS","KS","KSl","MO","MO","MO","MO","MOtl","IL","IL","ILl","IN","IN","INl","OH","OH","OHl","WVt","WV","WVtl","MDt","MDt","MDt","MDt","MDt","MDbt","MDtl","DEtl","NJb","NJbl"],
    ['CAr',"CA",'CA',"CAl","NV","NV","NV","NV","NVl","UT","UT","UT","UTl","CO","CO","CO","CO","CO","CO","COl","KS","KS","KS","KS","KS","KSl","MO","MO","MO","MO","MOl","IL","IL","ILl","IN","INl","KYt","KYt","KYt","KYtl","WV","WV","WV","WVt","WVt","WVtl","VAtl","MDl","","MDrl","DEl"],                                                                                        
    ['CAbr',"CA","CA",'CA',"CAtl","NV","NV","NV","NVl","UT","UT","UT","UTl","CO","CO","CO","CO","CO","CO","COl","KS","KS","KS","KS","KS","KSl","MO","MO","MO","MO","MO","MOtl","IL","ILl","KYt","KYt","KY","KY","KY","KY","KYtl","WV","WV","WVl","VAt","VAt","VA","VAtl","","MDbr","MDtl"],
    ['',"CAbr","CA",'CA',"CAl","NV","NV","NV","NVl","UT","UT","UT","UTl","CO","CO","CO","CO","CO","CO","COl","KS","KS","KS","KS","KS","KSl","MO","MO","MO","MO","MO","MOl","IL","ILl","KY","KY","KY","KY","KY","KY","KYl","WV","WVl","VAt","VA","VA","VA","VAl","","","MDblr"],
    ['',"","CAr","CA",'CA',"CAtl","NV","NV","NVl","AZt","AZt","AZt","AZtl","NMt","NMt","NMt","NMt","NMt","NMtl","OKt","OKt","OKt","OKt","OKt","OKt","OKtl","MOr","MO","MO","MO","MO","MOl","KYt","KYt","KY","KY","KY","KY","KYl","VAt","VAt","VAt","VAt","VA","VA","VA","VA","VA","VAtl"],
    ['',"","CAbr","CA",'CA','CA',"CAtl","NV","NVl","AZ","AZ","AZ","AZl","NM","NM","NM","NM","NM","NMl","TXt","TXt","TXtl","OK","OK","OK","OKl","ARt","ARt","ARt","ARt","ARt","ARtl","TNt","TNt","TNt","TNt","TNt","TNt","TNt","TNt","TNtl","NCt","NCt","NCt","NCt","NCt","NCt","NCt","NCtbl"],
    ['',"",'',"CAr","CA",'CA','CA',"CAtl","NVl","AZ","AZ","AZ","AZl","NM","NM","NM","NM","NM","NMl","TX","TX","TXl","OK","OK","OK","OKl","AR","AR","AR","AR","AR","ARbl","TN","TN","TN","TN","TN","TN","TN","TNl","NCt","NC","NC","NC","NC","NC","NC","NCbl"],
    ['',"",'',"CAbr","CA",'CA','CA',"CAl","AZt","AZ","AZ","AZ","AZl","NM","NM","NM","NM","NM","NMl","TX","TX","TXl","OK","OK","OK","OKl","AR","AR","AR","AR","ARl","TN","TN","TN","TN","TN","TN","TNl","NCt","NCt","NCl","SCt","SCt","SCt","SCtl","NCb","NCbl"],
    ['',"",'','',"CAr","CA",'CA','CAl',"AZ","AZ","AZ","AZ","AZl","NM","NM","NM","NM","NM","NMl","TX","TX","TX","TXt","TXt","TXt","TXtl","AR","AR","AR","AR","ARl","MSt","MSt","MStl","ALt","ALt","ALt","ALtl","GAt","GAt","GAtl","SC","SC","SC","SCbl"],
    ['',"",'','',"CAbr","CA",'CA',"CAl","AZ","AZ","AZ","AZ","AZl","NM","NM","NM","NM","NM","NMl","TX","TX","TX","TX","TX","TX","TXl","LAt","LAt","LAt","LAt","LAtl","MS","MS","MSl","AL","AL","AL","ALl","GA","GA","GA","GAtl","SC","SCbl"],
    ['',"",'','','',"CAr",'CA',"CAl","AZ","AZ","AZ","AZ","AZl","NM","NM","NM","NM","NM","NMl","TX","TX","TX","TX","TX","TX","TXl","LA","LA","LA","LA","LAbl","MS","MS","MSl","AL","AL","AL","ALl","GA","GA","GA","GA","GAtl"],
    ['',"",'','','',"CAbr","CA","CAl","AZ","AZ","AZ","AZ","AZl","NM","NM","NM","NM","NM","NMl","TX","TX","TX","TX","TX","TX","TX","TXtl","LA","LA","LAl","MS","MS","MS","MSl","AL","AL","AL","ALl","GA","GA","GA","GA","GAl"],
    ['','','','','','','CAbr','CAbl','AZb',"AZb","AZ","AZ","AZl","NM","NM","NM","NM","NM","NMl","TX","TX","TX","TX","TX","TX","TX","TXl","LA","LA","LAl","MS","MS","MS","MSl","AL","AL","AL","ALl","GA","GA","GA","GA","GAl"],
    ['','','','','','','','','',"","AZbr","AZb","AZbl","NMbl","TXtb","TXt","TXt","TXt","TXt","TX","TX","TX","TX","TX","TX","TX","TXl","LA","LA","LA","LAt","LAt","LAtl","MSbl","ALb","ALbl","FLtb","FLtb","FLt","FLt","FLtb","FLt","FLtl"],
    ['',"",'',"","",'',"","",'',"","",'',"","",'',"TXbr","TX",'TX',"TX","TX","TX","TX",'TX',"TX","TX","TX","TXbl","LAb","LAb","LAb","LAb","LAb","LAbl","","","","","","FLbr","FLbl","","FLbr","FL","FLtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","",'TXr',"TX","TXb","TX","TX","TX",'TX',"TX","TX","TXbl","","","","","","","","","","","","","","","","","FLbr","FL","FLtl"] ,
    ['',"","","",'',"","",'',"","",'',"","",'',"","",'TXbr',"TXbl","","TXbr","TX","TX",'TX',"TX","TXbl","","","","","","","","","","","","","","","","","","","FLr","FL","FLtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","",'',"","","","TXr","TX",'TX',"TXbl","","","","","","","","","","","","","","","","","","","FLtr","FL","FL","FL","FLtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","",'',"","","","TXbr","TX",'TXl',"","","","","","","","","","","","","","","","","","","","FLbr","FL","FL","FL","FLl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","",'',"","","","","TXr",'TXl',"","","","","","","","","","","","","","","","","","","","","FLbr","FL","FL","FLl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","",'',"","","","","TXbr",'TXbl',"","","","","","","","","","","","","","","","","","","","","","FLbr","FLb","FLbl"],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',""],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","BZtr","BZt","BZt","BZt","BZtl","","","","","","","","","","","BZtr","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","BZtr","BZt","BZtl","","","","","BZr","BZ","BZ","BZ","BZl","","","","","","","","","","BZtr","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","BZbr","BZ","BZ","BZt","BZt","BZt","BZt","BZ","BZ","BZ","BZ","BZ","BZt","BZt","BZt","BZt","BZt","BZt","BZt","BZt","BZt","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZt","BZt","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","BZtr",'BZt',"BZt","BZt","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"BZtr","BZ",'BZ',"BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'BZtr',"BZ","BZ",'BZ',"BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'BZr',"BZ","BZ",'BZ',"BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZt","BZt","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'BZr',"BZ","BZ",'BZ',"BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZt","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'BZbr',"BZ","BZ",'BZb',"BZb","BZb","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"BZbr","BZbl",'',"","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","BZbr","BZb","BZb","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZtl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","BZbr","BZb","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","BZbr","BZb","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","BZbr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","BZbr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZb","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","BZbr","BZb","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","BZbr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","","BZbr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","","",'',"","","","","","","","","","","","","","","BZr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZbl"],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","","BZtr","BZ","BZ","BZ","BZ","BZ","BZ","BZ","BZb","BZb","BZb","BZb","BZbl",""],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","BZtr","BZ","BZ","BZ","BZ","BZ","BZ","BZb","BZbl","","","","",""],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","BZtr","BZ","BZ","BZ","BZ","BZ","BZ","BZl","","","","","","",""],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","BZtbr","BZ","BZ","BZ","BZ","BZ","BZ","BZb","BZbl","","","","","","",""],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","BZbr","BZ","BZ","BZ","BZ","BZbl","","","","","","","","",""],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","BZbr","BZ","BZ","BZbl","","","","","","","","","",""],
    ['',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","",'',"","",'',"","",'',"","",'',"","","","","","","","","","","","","","","BZbr","BZbl","","","","","","","","","","",""]
]
/*
USA 13 original Colonies
Which and where did Europeans colonize?
What prompted European exploration?
What was the Americas like before European exploration?
What was the immediate repercussions of European colonization?
*/