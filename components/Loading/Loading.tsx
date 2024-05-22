import "./Loading.scss";

const Loading: React.FC = () => {
  // Scroll to the top of the page
  window.scrollTo(0, 0);
  return (
    <div className="wrapper">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default Loading;
