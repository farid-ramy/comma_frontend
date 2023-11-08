export default function CheckedIn(props) {
  return (
    <div>
      <div className="input-group float-end">
        <div>
          <input
            type="text"
            placeholder=" Search.. "
            className="form-control"
            style={{ borderRadius: "5px 0 0 5px" }}
          />
        </div>
        <button type="button" className="btn btn-success">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
}
