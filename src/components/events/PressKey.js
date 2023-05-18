import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

const PressKey = ({ character, comp_id }) => {
  const [state, setState] = useState({
    key: "",
  });

  const selectRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === state.key) {
        // Perform the desired action here
        console.log(`Key "${e.key}" pressed!`);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [state.key]);

  const handleChange = (e) => {
    setState({ ...state, key: e.target.value });
  };

  return (
    <Paper elevation={3}>
      <div className="rounded text-center bg-yellow-400 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Press Key:</div>
          <select
            ref={selectRef}
            value={state.key}
            onChange={handleChange}
            onFocus={() => {
              selectRef.current.blur();
            }}
          >
            <option value="">Select a key</option>
            <option value="ArrowUp">Arrow Up</option>
            <option value="ArrowDown">Arrow Down</option>
            <option value="ArrowLeft">Arrow Left</option>
            <option value="ArrowRight">Arrow Right</option>
            {/* Add more options for other keys */}
          </select>
        </div>
      </div>
    </Paper>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(PressKey);
