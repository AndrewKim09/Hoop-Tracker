import React, { useState } from 'react';

export const Tips = () => {
  const [generatedText, setGeneratedText] = useState('sda');

  const generateText = () => {
    const prompt = "Once upon a time, ";
    const apiKey = 'Refresh API key🔄🔑'; // Replace with your actual API key

    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 50, // Adjust as needed
      })
    })
    .then(response => response.json())
    .then(data => {
      const generatedText = data.choices[0].text;
      setGeneratedText(generatedText); // Update state with the generated text
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <div>
      <div id="output">{generatedText != '' ? generatedText : <p>To be released!</p>}</div>
    </div>
  )
}
