const inputText=document.getElementById("inputText")
const outputText=document.getElementById("outputText")

const fromLang=document.getElementById("fromLang")
const toLang=document.getElementById("toLang")

const historyBox=document.getElementById("historyBox")

const charCount=document.getElementById("charCount")

let timeout=null

inputText.oninput=()=>{

charCount.textContent=inputText.value.length

clearTimeout(timeout)

timeout=setTimeout(translateText,700)

}

async function translateText(){

let text=inputText.value.trim()

if(!text) return

outputText.value="Translating..."

let res=await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang.value}|${toLang.value}`)

let data=await res.json()

let translated=data.responseData.translatedText

outputText.value=translated

let div=document.createElement("div")

div.textContent=text+" → "+translated

historyBox.prepend(div)

}

copyInput.onclick=()=>navigator.clipboard.writeText(inputText.value)
copyOutput.onclick=()=>navigator.clipboard.writeText(outputText.value)

function speak(text){

let speech=new SpeechSynthesisUtterance(text)

speechSynthesis.speak(speech)

}

speakInput.onclick=()=>speak(inputText.value)
speakOutput.onclick=()=>speak(outputText.value)

swapBtn.onclick=()=>{

let temp=fromLang.value
fromLang.value=toLang.value
toLang.value=temp

translateText()

}

clearHistory.onclick=()=>historyBox.innerHTML=""

voiceBtn.onclick=()=>{

let recognition=new webkitSpeechRecognition()

recognition.start()

recognition.onresult=(e)=>{

inputText.value=e.results[0][0].transcript

translateText()

}

}