import { useEffect, useState } from "react";
import axios from "axios";

const FibPage = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [fibValues, setFibValues] = useState([]);
  const [index, setIndex] = useState("");

  useEffect(() => {
    const fetchAndUpdateState = async () => {
      const valuesResponse = await axios.get("/api/v1/values/current");
      const indexesResponse = await axios.get("/api/v1/values/all");

      const currentIndexes = indexesResponse?.data?.results ?? [];
      const currentValues = valuesResponse?.data?.results ?? [];

      setSeenIndexes(currentIndexes);
      setFibValues(currentValues);
    };

    fetchAndUpdateState();
  }, []);

  const onChangeHandler = (event) => {
    setIndex(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios.post("/api/v1/values/", {
      index,
    });

    setIndex("");
  };

  return (
    <div className="flex flex-col items-center gap-y-5">
      <form onSubmit={onSubmitHandler}>
        <label>Enter an index:</label>
        <input
          className="border border-solid border-1 px-2 mx-2"
          type="text"
          value={index}
          onChange={onChangeHandler}
        />
        <button className="px-2 py-1 border border-solid border-2">
          Submit
        </button>
      </form>
      <div>
        <h2>Seen Indexes</h2>
        <div>
          {seenIndexes.map((entry, i) => (
            <span key={i}>{entry?.number}, </span>
          ))}
        </div>
      </div>
      <div>
        <h2>Fibonnaci Values:</h2>
        <div>
          {Object.keys(fibValues).map((val, i) => (
            <p key={i}>
              {val} | {fibValues?.[val]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FibPage;
