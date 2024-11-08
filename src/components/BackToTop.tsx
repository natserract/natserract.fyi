export default function BackToTop() {
  const handleBackToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  };

  return (
    <button className="hover:underline text-xs" onClick={handleBackToTop}>
      Back to Top
    </button>
  );
}
