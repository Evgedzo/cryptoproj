import React, { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from "./components/Navbar"
import { Route, Routes } from 'react-router-dom'
import Account from "./routes/Account"
import Signin from "./routes/Signin"
import Signup from "./routes/Signup"
import Home from "./routes/Home"
import axios from "axios"
import CoinPage from './routes/CoinPage'
import Footer from './components/Footer'
import { AuthContextProvider } from './context/AuthContext'

const App = () => {
  const [coins, setCoins] = useState([])
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true";
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
    })
  }, [url])

  return (
    <ThemeProvider>
      <AuthContextProvider >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/coin/:monetaid" element={<CoinPage />}>
          <Route path=":monetaid" />
        </Route>
      </Routes>
        <Footer />
        </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App