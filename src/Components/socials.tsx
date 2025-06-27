import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
export default function Socials(){
    return(
        <>
        <div className="socials">
            <div className="logo">my<span>Game</span></div>
            <div className="links">
                <a href="https://github.com/JohnMwihaki" className="link-item"><FaGithubSquare /></a>
                <a href="https://www.linkedin.com/in/john-mwihaki-b8a11b267/" className="link-item"><FaLinkedin /></a>
            </div>
        </div>
        </>
    )
}