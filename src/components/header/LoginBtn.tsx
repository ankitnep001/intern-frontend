import { Link } from "react-router-dom"

const LoginBtn = () => {
    return (
        <button className="border-2 border-black px-2 md:px-4 md:py-1">
            <Link to='login'>Login</Link>
        </button>
    )
}
export default LoginBtn
