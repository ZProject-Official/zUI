const extractFontName = (url: string | undefined) => {
  if (url) {
    const match = url.match(/family=([^&:]+)/);
    return match ? match[1].replace(/\+/g, " ") : "sans-serif";
  }
};

export default extractFontName;
