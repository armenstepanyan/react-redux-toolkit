import React from 'react'
import FirstPage from './pages/FirstPage'
import SecondPage from './pages/SecondPage'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


function App() {

    return (
    <Router>
    <div className='min-h-screen  bg-indigo-400'>
        <nav class="bg-gray-50 dark:bg-gray-700">
            <div class="py-3 px-4 mx-auto max-w-screen-xl md:px-6">
                <div class="flex items-center">
                    <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                        <li>
                            <Link to="/" className="text-gray-900 dark:text-white hover:underline">Home</Link>

                        </li>
                        <li>
                            <Link to="/post-list" className="text-gray-900 dark:text-white hover:underline">Post page</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

            <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/post-list" element={<SecondPage />} />
            </Routes>
    </div>
  </Router>
    )
}

export default App
