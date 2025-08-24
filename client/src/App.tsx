import { useEffect, useState, useRef } from "react"

const BACKEND_URL = 'http://localhost:3000'
export default function App() {
  const [response, setResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const text = useRef('')

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      setResponse('')
      text.current = ''

      try {
        const response = await fetch(`${BACKEND_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "message": "2 + 2 EQUALS ?",
            "model": "openai/gpt-4o-mini"
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const reader = response.body!.getReader();
        const chunks = [];

        let done = false;
        let value;
        const dec = new TextDecoder()

        while (!done) {
          ({ value, done } = await reader.read());
          if (done) {
            break;
          }
          const strval = dec.decode(value, { stream: true })
          chunks.push(strval);
          text.current += strval
          setResponse(text.current)
        }

        reader.releaseLock();
      } catch (error) {
        console.error('Error fetching data:', error)
        setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      } finally {
        setIsLoading(false)
      }
    }

    getData();
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>

      {isLoading && (
        <div className="mb-4 text-blue-600">
          Loading response...
        </div>
      )}

      {response && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Response:</h2>
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
    </div>
  )
}