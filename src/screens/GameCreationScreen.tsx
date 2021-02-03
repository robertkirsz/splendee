import { useState } from 'react'

export default function GameCreationScreen() {
  const [userName, setUserName] = useState('')

  return (
    <div className="flex flex-col items-center m-auto">
      <h1 className="text-6xl">Splendee</h1>

      <div className="flex items-center mt-10 space-x-4">
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-grey-darker"
          placeholder="Your name"
          value={userName}
          onChange={event => setUserName(event.target.value)}
        />

        <button
          disabled={userName === ''}
          className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        >
          Create game
        </button>
      </div>

      <p className="text-sm opacity-50 mt-10">
        Want to join existing game instead? Ask the person that created it for
        the URL.
      </p>

      <a
        className="text-sm underline mt-2"
        href="https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_17984c1d5d0b45a6ae3cdc695c0a864e.pdf"
      >
        Game rules
      </a>
    </div>
  )
}
