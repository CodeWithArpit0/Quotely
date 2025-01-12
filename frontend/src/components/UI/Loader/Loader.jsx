export default function Loader({ theme, size }) {
  const loaderSizes = {
    small: "border-2 h-5 w-5",
    medium: "border-4 h-7 w-7",
    large: "border-4 h-9 w-9",
  };
  const themeOpts = {
    light: "border-white border-t-primary",
    dark: "border-primary border-t-white",
  };
  const loaderSize = loaderSizes[size] || loaderSizes["medium"];
  const loaderTheme = themeOpts[theme] || themeOpts["light"];
  return (
    <div className={`animate-spin rounded-full ${loaderTheme} ${loaderSize}`} />
  );
}
