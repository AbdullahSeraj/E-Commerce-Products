import Lottie from "lottie-react";
import cancelImage from "../../public/assest/Animation_Cancel.json"
import { useNavigate } from "react-router-dom";

const Cancel = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-center items-center" style={{ minHeight: "calc(100vh - 110px)" }}>
            <Lottie animationData={cancelImage} className='w-[300px]' loop={true} />
            <p className="font-bold text-4xl">Payment Cancel</p>
            <button onClick={() => navigate("/")} className="bg-red-600 hover:bg-red-700 transition duration-200 rounded-full py-1 px-4 text-lg text-white mt-5">Go to home page</button>
        </div>
    )
}

export default Cancel