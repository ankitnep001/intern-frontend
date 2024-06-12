import { Link } from "react-router-dom"

const LoginBtn = () => {
    return (
        <Link to='login'>
            <button className="border-2 border-black rounded-md px-2 md:px-4 md:py-1">
                Login
            </button>
        </Link>
    )
}
export default LoginBtn