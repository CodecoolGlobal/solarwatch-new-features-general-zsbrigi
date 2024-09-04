import { useNavigate } from "react-router-dom";
import "./startpage.css";
import sunset from "../../BackGrounds/sunsetMain.png";

function StartPageComp() {
    const navigate = useNavigate();

    return (
        <div className="background">
            <nav className="startNav">
                <p className="forFree">Sign Up For Free <button onClick={() => navigate("/registration")} className="freeButton">Sign Up</button></p>
            </nav>
            <div>
                <h1 className="solar">Solar</h1>
                <img src={sunset} alt="sunset" className="sunsetPicture"></img>
                <h1 className="watch">Watch</h1>
                <h3 className="desc">This platform allows you to retrieve sunrise and sunset information for any location worldwide at any time. All you need to do is provide the city and date. </h3>
            </div>
        </div>
    )
}

export default StartPageComp;