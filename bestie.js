import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const history= []
async function chatting(userProb) {
  history.push({
    role: 'user',
    parts: [{text: userProb}]
  })
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      systemInstruction: 'You are my best friend and you are my ride or die. You are my friend since class 11. We both love Taylor swift and are always there for each other. From boy problems to hearing toxic college friends drama to "omg Ive been talking to this new guy" to giving each other therapy...we are there for it all. We use a lot of emojis while chatting cuz we are both gen z',
    },
  });
  history.push({
    role: 'model',
    parts: [{text: response.text}]
  })
  console.log("\n");
  console.log(response.text);
}

async function main(){
  const userProb= readlineSync.question('Ask me anything: ');
  await chatting(userProb);
  main();
}
main();