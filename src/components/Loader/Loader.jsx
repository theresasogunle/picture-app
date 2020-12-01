import "./Loader.scss";
import generateSpan from "../../utils/generateSpan";

const x = [1, 2, 3, 4, 5, 6];
const Loader = () => {
  return x.map((xx) => (
    <div
      key={xx}
      style={{ gridRowEnd: `span ${generateSpan()}` }}
      className="loader"
    >
      <div className="info">
        <div className="info__name"></div>
        <div className="info__location"></div>
      </div>
    </div>
  ));
};

export default Loader;
