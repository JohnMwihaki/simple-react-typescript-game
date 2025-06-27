import { GiSelfLove } from "react-icons/gi";
import { FaRegCopyright } from "react-icons/fa";
export default function Footer(){
    return(
        <>
        <div className="footer">
            <p><FaRegCopyright className="icons" /> 2025,Made with <GiSelfLove className="icons"/> By <a href="githun.com/JohnMwihaki">John Kimani</a></p>
        </div>
        </>
    )
}