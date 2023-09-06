import About from "../About/About";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";

const Home = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <Services/>
            <h2>This is home</h2>
        </div>
    );
};

export default Home;