import { Link } from "react-router-dom";
import { navigate } from "ionicons/icons";



function FloatingSaveButton() {

    return (
        <button htmlType="submit" className="fixed text-white font-bold cursor-pointer flex justify-center items-center bottom-5 right-10 rounded-[10px] shadow-sm w-20 h-10 bg-[#bb6470]">
            Save
        </button>
    )
}
export default FloatingSaveButton;
