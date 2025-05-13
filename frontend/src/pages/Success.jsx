import Lottie from "lottie-react";
import successImage from "../../public/assest/AnimationDone.json"
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-center items-center" style={{ minHeight: "calc(100vh - 110px)" }}>
            <Lottie animationData={successImage} className='w-[300px]' loop={false} />
            <p className="font-bold text-4xl">Payment Successfully</p>
            <button onClick={() => navigate("/order")} className="bg-green-600 hover:bg-green-700 transition duration-200 rounded-full py-1 px-4 text-lg text-white mt-5">Go to my orders</button>
        </div>
    )
}

export default Success