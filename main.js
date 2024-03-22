import OpenAI from 'openai';
import fs from "fs";
import path from "path";


const openai = new OpenAI({
  apiKey: "key", 
});


async function run(input) {

  const params = {
    messages: [
      { role: 'assistant', content: 'List of people: Anna works till 6pm, Frank till 4pm, Adam till 2pm. If you want to get vacation you should contact your supervisor. Phone number to your superviser : +49 493 392 947.' },
      { role: 'user', content: input + "based on the context you know"}],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion = await openai.chat.completions.create(params);
  var output_message = chatCompletion.choices[0].message.content;
  console.log(output_message);

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: output_message,
  });

  const speechFile = path.resolve("./speech.mp3");
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

run('how can i apply for vacation');


const openai_classification = new OpenAI({
  apiKey: "key", 
});

async function moodOfMessage(input) {
  const params = {
    messages: [
      { role: 'user', content: input + "What is the mood of the sentence, classify it based on 3 Classes: NEU for Neutral, HAP for Happy, SAD for Sad. The text can only have on category, your response should only contain one Class (NEU, HAP or SAD) and nothing else."}],
    model: 'gpt-3.5-turbo',
  };

  const chatClassification = await openai_classification.chat.completions.create(params);
  var output_message = chatClassification.choices[0].message.content;
  console.log(output_message);
  return output_message;
}

console.log(moodOfMessage('I am happy'));
