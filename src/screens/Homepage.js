import Navbar from "../components/Navbar";
import GameList from "../components/homepage/GameList";
import Footer from "../components/Footer";
const Homepage = () => {
  return (
    <div  style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight:"100vh"}}>
      <Navbar />
      <GameList />
      <Footer />
    </div>
  );
};

export default Homepage;
