import { useGlobalContext } from "./GlobalContext"
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
    const {isDarkTheme,toggleDarkTheme} = useGlobalContext();
  return (
    <nav>
        <div className="toggle-container">
            <button className="toggle light-toggle" onClick={toggleDarkTheme}>
                {isDarkTheme?<MdDarkMode />:<MdLightMode />}
            </button>
        </div>
    </nav>
  )
}
export default ThemeToggle