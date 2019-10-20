/*
var imported = document.createElement('script');
imported.src = './libraries/dat.gui.min.js';
document.head.appendChild(imported);

var imported = document.createElement('script');
imported.src = './libraries/midi';
document.head.appendChild(imported);

var imported = document.createElement('script');
imported.src = './libraries/Tone.js';
document.head.appendChild(imported);
*/
//====================================================

class SimpleQCWmidi{
	constructor(fileDropId, resultsTextId){
		var self = this
		try{
  			self.connection = new WebSocket('ws://'+location.hostname+':81/',['arduino'])
		}catch(error){console.error(error)}

		self.fileDrop = document.querySelector(fileDropId+" input")
		self.resultsText = document.querySelector(resultsTextId)
		self.tonePlayToggle = document.querySelector('tone-play-toggle')
		self.currentMidi = null
		self.synths = []
		
		self.fileDropper()
		self.play()
	}

	// methods
	// used by constructor
	fileDropper(){
		var self = this
		self.fileDrop.addEventListener("change",e=>{
			var file = e.target.files[0]
			const reader = new FileReader()
			reader.onload = function(e){
				const midi = new Midi(e.target.result)
				self.resultsText.value=file.name+"\n\n"+JSON.stringify(midi,undefined,2)
				self.tonePlayToggle.removeAttribute('disabled')
				self.currentMidi = midi
				self.convertMidiForTC()
			}
			reader.readAsArrayBuffer(file)
		})
	}

	// used by fileDropper
	convertMidiForTC(){
		var self = this
		var currentNotes = self.currentMidi.tracks[0].notes
		var noteSend=[]
		for(var i=0;i+1<currentNotes.length;i++){
			var note = currentNotes[i]
			var nextNote = currentNotes[i+1]
			var frequency = parseInt(Math.pow(2,(note.midi-69)/12)*440)
			var duration = parseInt(note.duration*1000)
			var totalTime = parseInt((nextNote.time-note.time)*1000)
			noteSend.push([frequency,duration,totalTime])
		}
		var dataSend = {"noteSend":noteSend}
		console.log(dataSend)
		if(self.connection) self.connection.send(JSON.stringify(dataSend))
	}

	//used by constructor
	play(){
		var self = this
		self.tonePlayToggle.addEventListener('play',(e)=>{
			const playing = e.detail
			if(playing && self.currentMidi){
				const now = Tone.now()+0.5
				self.currentMidi.tracks.forEach(track=>{
					const synth = new Tone.PolySynth(10,
						Tone.Synth,{
							envelope:{
								attack:0.02,decay:0.1,
								sustain:0.3,release:1
							}
						}).toMaster()
					self.synths.push(synth)
					track.notes.forEach(note=>{
						synth.triggerAttackRelease(
							note.name,note.duration,
							note.time+now,note.velocity)
					})
				})
			}else{
				while(self.synths.length){
					const synth = self.synths.shift()
					synth.dispose()
				}
			}
		})
	}
}

//====================================================

class SimpleQCWgui{
	constructor(guiContainerId){
		var self = this
		try{
  			self.connection = new WebSocket('ws://'+location.hostname+':81/',['arduino'])
		}catch(error){console.error(error)}

		var GuiData = function(){
			this.ontime_us = 50

			this.f_kHz = 164
			this.OCD_A = 64
			
			this.invert = false

			//this.ramp_kHz = 255
			//this.phase_us = 200
			//this.QCWmode = false
		}
		self.guiData = new GuiData()
		self.gui = new dat.GUI({autoPlace:false}) //{autoPlace:false}
		self.gui.add(self.guiData,'ontime_us',10,100).onFinishChange(
			()=>self.sendGuiData())
		self.gui.add(self.guiData,'f_kHz',100,300).onFinishChange(
			()=>self.sendGuiData())
		self.gui.add(self.guiData,'OCD_A',10,100).onFinishChange(
			()=>self.sendGuiData())
		self.gui.add(self.guiData,'invert').onFinishChange(
			()=>self.sendGuiData())
		document.querySelector(guiContainerId).appendChild(
			self.gui.domElement)
	}

	// methods
	// used by constructor
	sendGuiData(){
		var self = this
		var bytesToFPGA = []
		var f_clk = Math.round(50000/self.guiData.f_kHz)
		bytesToFPGA=bytesToFPGA.concat(
			self.intTo3Bytes(f_clk, 1)) 
		var OCD_PWM = Math.round(self.guiData.OCD_A)
		bytesToFPGA=bytesToFPGA.concat(
			self.intTo3Bytes(OCD_PWM, 10))  
		bytesToFPGA.push(self.guiData.invert*4)

		var dataSend = {
			"bytesToFPGA":bytesToFPGA,
			"ontime_us":Math.round(self.guiData.ontime_us)}
		console.log(dataSend)
		if(self.connection) self.connection.send(JSON.stringify(dataSend))
	}

	// used by sendGuiData
	intTo3Bytes(int,address){
		return [ int      & 15 +  address    * 16 ,
			     int >> 4 & 15 + (address+1) * 16 ,
			     int >> 8 & 15 + (address+2) * 16 ]
	}
}