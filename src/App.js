
// import Header from './components/Header'
import video from './tram.mp4'
import track from './tracks/trailer-metadata-en.vtt'



// Currently shown hotspot.
 	var idxHotspot = -1;
	
	// Set up our hotspots.
	// var arrHotspots = [
	// 	{"startTime":1,"endTime":3,"top":60,"left":295,"height":180,"width":140,"text":"Kröpeliner Tor"},
	// 	{"startTime":3,"endTime":6,"top":110,"left":155,"height":90,"width":130,"text":"Radisson BLU"},
	// 	{"startTime":8,"endTime":11,"top":135,"left":35,"height":70,"width":130,"text":"Tram"}
	// ];
	
	function init() {
		var video = document.getElementById('sampleVideo');
		var hotspot = document.getElementById('hotspot');
		var caption = document.getElementById('caption');
    var textTrack = document.getElementById('bubbles').track;

    console.log(textTrack.cues);
	var cue1 = textTrack.cues[0];
	console.log(cue1);
	console.log(cue1.onenter);
	
	cue1.onenter = function(){
		console.log('enter id=' + this.id);
	};
	cue1.onenter();
    //addCueListeners

    // cue.onenter = function(){
      // Highlight current cue transcript by adding the
      // cue.current CSS class
    //   console.log('enter id=' + this.id);
    //   var transcriptText = document.getElementById(this.id);
    //   transcriptText.classList.add("current");
//  };


//  cue.onexit = function(){
//   console.log('exit id=' + cue.id);
//   var transcriptText = document.getElementById(this.id);
//   transcriptText.classList.remove("current");
// };
   
		// Add the mouse events for the hotspot
		hotspot.addEventListener('mouseover', function() {
			caption.innerHTML = textTrack.cues[idxHotspot].text;
		});
		
		hotspot.addEventListener('mouseout', function() {
			caption.innerHTML = '';
		});
		
		// Determine when to show a hotspot.
		video.addEventListener('timeupdate', function() {
			
			// Grab the current video pointer time mark.
			var vidCurrentTime = video.currentTime;
			
			// Set flag if we need to show a new hotspot.
			var idxNewHotspot = -1;
			
			// Find if need to show a hotspot. Assumes only one hotspot at a time.
			for (var i=0; i<textTrack.cues.length; i++) {
				if (vidCurrentTime>=textTrack.cues[i].startTime && vidCurrentTime<textTrack.cues[i].endTime) {
					idxNewHotspot = i;
				}
			}
			
			// Set up hotspot or remove a currently displayed one.
			if (idxNewHotspot > -1) {
				if (idxNewHotspot != idxHotspot) {
					
					// Position and size hotspot.
					hotspot.style.width 	= textTrack.cues[idxNewHotspot].width+'px';
					hotspot.style.height 	= textTrack.cues[idxNewHotspot].height+'px';
					hotspot.style.left 		= textTrack.cues[idxNewHotspot].left+'px';
					hotspot.style.top		= textTrack.cues[idxNewHotspot].top+'px';
					
					// Release the craken - make the hotspot visible.
					hotspot.style.visibility = 'visible';
					
					// Set the current hotspot shown.
					idxHotspot = idxNewHotspot;
				}
			} else {
				// Hide the current hotspot
				hotspot.style.visibility = 'hidden';
			}
		}, false);
	}
	
	window.addEventListener('load',init);


function App() {
  
  return (
    <div className='container'>
        <div id="video_box">
        <div id="hotspot"></div>
       
       
        <video id='sampleVideo' width="1280" height="720" controls>
            <source src={video} type='video/mp4'/>
            <track id="bubbles" label="Metadata" kind="metadata" srclang="en" src={track} default />
        </video>
      
        
        </div>
        <div id="caption">Tes1t</div>
    </div>
  );
}

export default App
