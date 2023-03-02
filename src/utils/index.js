import { message } from 'ant-design-vue'

export async function getChatGPTResponse(requestBody, apiKey) {
  // const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  const apiUrl = 'https://api.openai.com/v1/chat/completions'

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })

  const responseBody = await response.json()
  console.log('re', responseBody)
  if (responseBody.error) {
    message.error(responseBody.error.code)
  }

  const choice = responseBody.choices[0].message
  const res = JSON.stringify(choice)
  return res
}

// async function main() {
//   const prompt = 'Hello, ChatGPT!'

//   const response = await getChatGPTResponse(prompt)
//   console.log(response)
// }

// main()

export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, item)
}
export const getLocalStorage = (item) => {
  return localStorage.getItem(item)
}
export const clearLocalStorage = (item) => {
  localStorage.removeItem(item)
}
export const clearAllLocalStorage = () => {
  localStorage.clear()
}
