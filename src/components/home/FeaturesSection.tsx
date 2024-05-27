import { FaMoon } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";


const FeaturesSection = () => {
    return (
        <div className="p-14 flex flex-col justify-center items-center">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-3">Features</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl font-serif">
                {/* dark box */}
                <div className="flex flex-col  bg-white p-6 rounded-lg shadow-md">

                    <FaMoon className="text-2xl  mb-4 text-blue-400" />
                    <h1 className="text-xl font-medium py-2 ">Light and Dark UI</h1>
                    <p className="text-md text-justify">Optimized for multiple color modes. Use light or dark, your choice.</p>
                </div>

                {/* Language box */}
                <div className="flex flex-col bg-white p-6 rounded-lg shadow-md">
                    <GrLanguage className="text-2xl mb-4 text-blue-400" />
                    <h1 className="text-xl font-medium py-2 ">MultiLanguage</h1>
                    <p className="text-md text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ea?</p>
                </div>
            </div>
        </div>
    )
}

export default FeaturesSection