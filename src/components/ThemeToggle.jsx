import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button 
      className="btn theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

export default ThemeToggle;