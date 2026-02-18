import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="p-4 text-white flex justify-between shadow-md">
            <h1 className="text-xl font-bold text-black">React Store</h1>
            <div className="space-x-4 text-black">
                <NavLink className="relative [&.active]:before:content-[''] [&.active]:before:absolute [&.active]:before:left-0 [&.active]:before:-bottom-2.5 [&.active]:before:h-0.5 [&.active]:before:w-full [&.active]:before:bg-[#155dfc]" to="/">Products</NavLink>
                <NavLink className="relative [&.active]:before:content-[''] [&.active]:before:absolute [&.active]:before:left-0 [&.active]:before:-bottom-2.5 [&.active]:before:h-0.5 [&.active]:before:w-full [&.active]:before:bg-[#155dfc]" to="/admin">Admin</NavLink>
            </div>
        </nav>
    )
}

