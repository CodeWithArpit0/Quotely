export default function Avatar({ handler, label }) {
  return (
    <button
      onClick={handler}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-primaryDarktransition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <span className="text-white text-lg font-medium">{label}</span>
    </button>
  );
}
