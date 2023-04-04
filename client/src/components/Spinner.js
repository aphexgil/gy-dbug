import spinner from "./assets/spinner-loading.gif";

function Spinner() {
  return (
    <img
      src={spinner}
      alt="loading..."
      style={{ width: "100px", margin: "100px auto", display: "block" }}
    />
  );
}

export default Spinner;
