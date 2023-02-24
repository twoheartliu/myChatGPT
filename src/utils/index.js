export async function getChatGPTResponse(prompt) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  const apiUrl = 'https://api.openai.com/v1/completions'

  const requestBody = {
    prompt,
    model: 'text-davinci-003',
    max_tokens: 1000,
    temperature: 0,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    // stop: '\n',
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })

  const responseBody = await response.json()
  const res = responseBody.choices[0].text.trim()
  return res
}

// async function main() {
//   const prompt = 'Hello, ChatGPT!'

//   const response = await getChatGPTResponse(prompt)
//   console.log(response)
// }

// main()
