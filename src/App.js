import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { filecoin, filecoinHyperspace } from "wagmi/chains";
// import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Stake from "./pages/stake";
import Verify from "./pages/verify";
import Error404 from "./pages/error-404";
import Footer from "./pages/footer";
import Loan from "./pages/loan";
import Methodologies from "./pages/methodologies";

function App() {
  const { chains, provider } = configureChains(
    [filecoin, filecoinHyperspace],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "projectone",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stake" element={<Stake />} />
              <Route exact path="/verify/:id" element={<Verify />} />
              <Route path="/loan" element={<Loan />} />
              <Route path="/method" element={<Methodologies />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Router>
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
