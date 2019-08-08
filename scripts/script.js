/*******************
VARIABLES
*******************/
var creativeId = "Banner"; //Use anything that uniquely identifies this creative
var creativeVersion = "1.0.26"; //0.0.1 during initial dev, 1.0.0 on release, x.x.x once released and receives updates
var lastModified = "2017-08-02";
var lastUploaded = "2017-08-02";
var templateVersion = "2.0.24";

var bannerDiv;
var panelDiv;
var video;
var videointro;
var expandButton;
var closeButton;
var userActionButton;
var clickthroughButton;
var sdkData;
var adId, rnd, uid;
var isMRAID;
var useCustomClose;

/*******************
INITIALIZATION
*******************/
function checkIfAdKitReady(event) {
	adkit.onReady(initializeCreative);
}

function initializeCreative(event) {
	try { //try/catch just in case localPreview.js is not included
		if (window.localPreview) {
			window.initializeLocalPreview(); //in localPreview.js
		}
	}
	catch (e) {}

	//Workaround (from QB6573) for Async EB Load where Modernizr isn't properly initialized
	typeof Modernizr === "object" && (Modernizr.touch = Modernizr.touch || "ontouchstart" in window);

	window.registerInteraction = function() {}; //overwrite rI function because it will never actually be called
	initializeGlobalVariables();
	initializeCloseButton();
	initializeVideoTracking();
	addEventListeners();
	
	videoIntro();
	mainAnimation();
}



function initializeGlobalVariables() {
	adId = EB._adConfig.adId;
	rnd = EB._adConfig.rnd;
	uid = EB._adConfig.uid;

	bannerDiv = document.getElementById("banner");
	panelDiv = document.getElementById("panel");
	videointro = document.getElementById("videointro");
	video = document.getElementById("video");
	muteButton = document.getElementById("mute-but");
	expandButton = document.getElementById("cta-small");
	closeButton = document.getElementById("closeButton");
	clickthroughButton = document.getElementById("clickthroughButton");
	ctaBubbles = document.getElementById("cta-bubbles");

	if (!isMRAID) {
		sdkData = EB.getSDKData();
		isMRAID = sdkData !== null && sdkData.SDKType === "MRAID";
	}

}

function initializeCloseButton() {
	useCustomClose = !isMRAID || (isMRAID && !useDefaultCloseButtonInMRAID);
	if (useCustomClose) {
		EB.API.setStyle(closeButton, {
			display: "block"
		});
	}
	EB.setExpandProperties({
		useCustomClose: useCustomClose
	});
}

function initializeVideoTracking() {
	videoTrackingModule = new EBG.VideoModule(video);
}

function addEventListeners() {
	expandButton.addEventListener("mouseover", handleExpandButtonClick);
	closeButton.addEventListener("click", handleCloseButtonClick);
	closeButton.addEventListener("mouseover", handleCloseButtonOver);
	clickthroughButton.addEventListener("click", handleClickthroughButtonClick);

	muteButton.addEventListener("click", handleMuteButtonClick);
	ctaBubbles.addEventListener("click", handleCtaBubblesClick);
}

function registerInteraction() {
	//Register your automatic and user interactions here and the platform will parse them on workspace upload. This function will not be called.
	//Example: 'Left_Gutter_Viewed'

	//EB.automaticEventCounter("interactionName1");
	//EB.automaticEventCounter("interactionName2");

	//EB.userActionCounter("userActionName1");
	//EB.userActionCounter("userActionName2");
}


function videoIntro(){

	console.log("Video Intro Started");

	videointro.removeAttribute('controls');
	
	if(autoPlayVideoIntro){
		videointro.play();
	}else{
		videointro.pause();
	}
}

function mainAnimation(){

	var tlintro = new TimelineMax();
	var tlpanel = new TimelineMax();
	
	var indexLabel=1;
	var label = "";

	indexLabel++;
	label = "pt"+indexLabel;
	
	tlintro
		.addLabel(label)

		.from("#tomy-logo", 1 ,{scale: 2, autoAlpha: 0, rotation: -45, transformOrigin:"0% 100%", ease: Power2.easeOut}, label + "+=0")
		.from("#train", 1 ,{scale: 1.2, autoAlpha: 0, x: "+=200", ease: Power2.easeOut}, label + "+=0.5")
		.from("#title-intro", 1 ,{scale: 2, autoAlpha: 0, rotation: 90, transformOrigin:"-50% 100%", ease: Power2.easeOut}, label + "+=0.7")
		.from("#octopus", 1 ,{scale: 1.2, autoAlpha: 0, x: "+=200", ease: Power2.easeOut}, label + "+=1")
		.from("#chicken", 1 ,{scale: 1.2, autoAlpha: 0, x: "-=200", ease: Power2.easeOut}, label + "+=1.2")
		.from("#penguin", 1 ,{scale: 1.2, autoAlpha: 0, x: "+=150", ease: Power2.easeOut}, label + "+=1.4")
		.from("#cta-small", 1 ,{scale: 0.1, autoAlpha: 0, ease: Power2.easeOut}, label + "+=1")

		.add(ctaBlink, label + "+=2")
		
	;

	function ctaBlink(){
		TweenMax.from("#blink", 2, {autoAlpha: 0, x: "-=180", repeat:7, yoyo:false, ease: Power2.easeOut});
	}
}

function panelAnimation(){

	var tlpanel = new TimelineMax();
	
	var indexLabel=1;
	var label = "";

	indexLabel++;
	label = "pt"+indexLabel;
	
	tlpanel
		.addLabel(label)

		.from("#video-container", 1 ,{scale: 0.5, autoAlpha: 0, ease: Power2.easeOut}, label + "+=0.5")
		.from("#mute-but", 1 ,{scale: 0, autoAlpha: 0, ease: Power2.easeOut}, label + "+=1")
		.from("#tomy-big", 1 ,{scale: 3, autoAlpha: 0, rotation: -90, transformOrigin:"0% 100%", ease: Power2.easeOut}, label + "+=1.2")

		.from("#arrL", 1 ,{autoAlpha: 0, x:"+=250", ease: Power2.easeOut}, label + "+=1.2")
		.from("#arrR", 1 ,{autoAlpha: 0, x:"-=250", ease: Power2.easeOut}, label + "+=1.2")

		.from("#tnHolderItems", 1 ,{y:"+=50", autoAlpha: 0, ease: Power2.easeOut}, label + "+=1.2")

		.from("#train-big", 1 ,{x:"+=400", autoAlpha: 0, ease: Power2.easeOut}, label + "+=1.2")
		.from("#clickthroughButton", 1 ,{scale: 0.1, autoAlpha: 0, ease: Power2.easeOut}, label + "+=1")

		.from("#cta-bubbles", 1 ,{scale: 1.5, autoAlpha: 0, rotation: -180, transformOrigin:"0% 100%", ease: Power2.easeOut}, label + "+=1.6")
		.from("#title-big", 1 ,{scale: 1.5, autoAlpha: 0, rotation: 180, transformOrigin:"0% 100%", ease: Power2.easeOut}, label + "+=2")

		.add(ctabigBlink, label + "+=2")
		.add(doBurst, label + "+=3.5")
		
	;

	function ctabigBlink(){
		TweenMax.from("#blinkbig", 2, {autoAlpha: 0, x: "-=380", repeat:7, yoyo:false, ease: Power2.easeOut});
	}


	// ------------------------- tn carousel --------------------------- //
    var carouselHold = document.getElementById("tnHolderItems");
    var newXpos = 0; // current carousel pos
    var stepXpos = 172; // animation and items distance
    var allSwatchesInCarousel = [] ;
    var visibleTn = 3;
    var	a_l;
    var	a_r;

    function createTns(){
        var totalTn = 7;
        var thholder = document.getElementById("tnHolderItems");
        var offsetX = -3;
        var tnW = 172;
        var gapX = 0;
        var newPosX = tnW + gapX;
        stepXpos = newPosX;

        for (var i=0;i<= totalTn-1;i++){
            var tnItem = document.createElement("div");
            tnItem.classList.add("tn_gen");
            tnItem.setAttribute("id", "tn_"+i);
            tnItem.style.left = offsetX+(i*newPosX) + "px";

            // product photo
            var tnItemContent = document.createElement("div");
            tnItemContent.classList.add("tnContent_gen");
            tnItemContent.classList.add("allTns");
            tnItemContent.style.backgroundPosition = "-"+(i*tnW)+"px 0px";

            // product header
            var tnItemHeader = document.createElement("div");
            tnItemHeader.classList.add("carouselHeading");
            tnItemHeader.classList.add("allItems");
            tnItemHeader.style.backgroundPosition = "-"+(i*tnW)+"px -311px";

            // shop now button
            var tnItemButton = document.createElement("div");
            tnItemButton.classList.add("btnShopNow");
            tnItemButton.classList.add("allItems");

            tnItem.appendChild(tnItemContent);
            tnItem.appendChild(tnItemHeader);
            tnItem.appendChild(tnItemButton);
            thholder.appendChild(tnItem);

            tnItem.addEventListener("click", onCTClick, false);

            allSwatchesInCarousel[i] = tnItem;

        }

        // add functions to buttons
        a_l = document.getElementById("arrL");
        a_r = document.getElementById("arrR");

        a_l.addEventListener("click", onCarouselArrowClick, false);
        a_r.addEventListener("click", onCarouselArrowClick, false);

        carouselHold = document.getElementById("tnHolderItems");
    }


    function onCarouselArrowClick ($e){
        var mc = $e.currentTarget;
        var mc_id = mc.getAttribute("id");
        //console.log(mc_id);

        if(mc_id == "arrL"){
            newXpos += stepXpos;
            EB.userActionCounter("int_arrow_click_left");
        }else if(mc_id == "arrR"){
            newXpos -= stepXpos;
            EB.userActionCounter("int_arrow_click_right");
        }

        repositionEl(mc_id);

        TweenLite.to(carouselHold, .5, {left:newXpos, ease:Cubic.easeOut});


    }

    function repositionEl(c_way){
        var mc;
        var nextItemPos;
        if(c_way == "arrL"){
            mc = allSwatchesInCarousel[allSwatchesInCarousel.length-1];
            nextItemPos = allSwatchesInCarousel[0].offsetLeft - stepXpos; // $(allSwatchesInCarousel[0]).position().left - stepXpos;


            mc.style.left = nextItemPos+"px";
            allSwatchesInCarousel.unshift(mc);
            allSwatchesInCarousel.pop();



        }else if(c_way == "arrR"){
            mc = allSwatchesInCarousel[visibleTn];
            nextItemPos = allSwatchesInCarousel[visibleTn-1].offsetLeft + stepXpos;
            mc.style.left = nextItemPos+"px";

            //console.log("Right:", nextItemPos, allSwatchesInCarousel[visibleTn-1].offsetLeft , allSwatchesInCarousel);

            mc = allSwatchesInCarousel[0];
            allSwatchesInCarousel.push(mc);
            allSwatchesInCarousel.shift();
        }

    }

    function onCTClick($e){
        ct_mc = $e.currentTarget.id;
        console.log("clicked:", ct_mc);
        switch(ct_mc){
            case "tn_0":
                EB.clickthrough('ct_carouselItem_1_shopbot');
            break;
            case "tn_1":
                EB.clickthrough('ct_carouselItem_2_blastTrain');
            break;
            case "tn_2":
                EB.clickthrough('ct_carouselItem_3_spinningUFO');
            break;
            case "tn_3":
                EB.clickthrough('ct_carouselItem_4_sandSeaLion');
            break;
            case "tn_4":
                EB.clickthrough('ct_carouselItem_5_cupcakes');
            break;
            case "tn_5":
                EB.clickthrough('ct_carouselItem_6_jellyfish');
            break;
            case "tn_6":
                EB.clickthrough('ct_carouselItem_7_picpop');
            break;
        }
	}
	
	createTns();

	mc = document.getElementById("bubbleH");
    mc.style.opacity = 0;

    for(var i = 0;i<=16;i++){
        var tnItem = document.createElement("div");
        tnItem.classList.add("bubble_gen");
        tnItem.classList.add("allItems");
        tnItem.setAttribute("id", "bubble_"+i);
        TweenLite.set(tnItem,{scale:Math.random()*.9, top:160, left:25});
        mc.appendChild(tnItem);
	}

}


function doBurst(){
	mc = document.getElementById("bubbleH");
	mc.style.opacity = 1;
	for(var i = 0;i<=16;i++){
		var tnItem = document.getElementById("bubble_"+i);
		TweenLite.set(tnItem,{scale:Math.random()*.9, top:160, left:25, opacity:1, x:0, y:0});
		TweenLite.to(tnItem,2,{x:(80+Math.random()*260), y:(-20+(-Math.random()*180)), opacity:0, ease:Sine.easeOut})
	}
}

function collapsePanel() {

}

/*******************
EVENT HANDLERS
*******************/
function handleExpandButtonClick() {
	EB.expand();
	panelAnimation();
	TweenMax.to(muteButton, 0.5,{autoAlpha: 1});
	EB.API.setStyle(bannerDiv, {
		display: "none"
	});
	EB.API.setStyle(panelDiv, {
		display: "block"
	});

	TweenMax.from(panelDiv, 1,{autoAlpha: 0, transformOrigin:"100% 0%", scale: 0.5});
	console.log("Clicked Expand")
	
	if (autoPlayVideo && !EB.API.os.ios) {
		video.muted = true;
		videoTrackingModule.playVideo(false);
	}
}

function handleCtaBubblesClick () {
	console.log("Bubbles")
	doBurst()

	TweenMax.fromTo(ctaBubbles,0.15, {x:-20},{x:20,repeat:5,yoyo:true,ease:Sine.easeInOut,onComplete:function(){TweenMax.to(this.target,1.5,{x:0,ease:Elastic.easeOut})}})
}

function handleCloseButtonClick() {
	pauseVideo();
	$('#bubbleH').empty();
	TweenMax.to(muteButton, 0.5,{autoAlpha: 1});
	video.currentTime = 0;
	TweenMax.set(panelDiv,{clearProps:"all"});
	EB.API.setStyle(panelDiv, {
		display: "none"
	});
	EB.API.setStyle(bannerDiv, {
		display: "block"
	});
	EB.collapse();
}

function handleMuteButtonClick() {
	TweenMax.to(muteButton, 0.5,{autoAlpha: 0});
	console.log("Unmuted")

	video.muted = false;
	video.currentTime = 0;
	// video.controls = "controls";
}

function handleCloseButtonOver() {

	TweenMax.fromTo(closeButton,1.5, {rotation: 360},{rotation: 0, transformOrigin:"50% 50%", repeat:1,yoyo:true,ease:Sine.easeInOut,onComplete:function(){TweenMax.to(this.target,1.5,{rotation: 360,ease:Elastic.easeOut})}});
	console.log("Close button over");
}

function handleUserActionButtonClick() {
	EB.userActionCounter("CustomInteraction");
	console.log("Click through");
}

function handleClickthroughButtonClick() {
	pauseVideo();
	EB.clickthrough();
	console.log("Click through")
}

/*******************
UTILITIES
*******************/
function pauseVideo() {
	if (video) {
		video.pause();
	}
}

window.addEventListener("load", checkIfAdKitReady);