import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App({ complist, update_list }) {
  const classes = useStyles();

  // Update Lists of Mid Area
  const onDragEnd = (result) => {
    let element = result.draggableId.split("-")[0];

    const old_list = complist.midAreaLists;
    console.log("old_list", old_list)
    console.log("result--", result)
    let source_index = old_list.findIndex(
      (x) => x.id === result.source.droppableId
    );
    console.log(source_index, "source_index")
    source_index = 0;
    if (source_index > -1) {
      let comp_list = old_list[source_index].comps;
      console.log("comp_list", comp_list)
      comp_list.splice(result.source.index, 1);
      old_list[source_index].comps = comp_list;
    }
    console.log("old_list ---", old_list)
    let dest_index = old_list.findIndex(
      (x) => x.id === result.destination.droppableId
    );
    console.log("dest_index", dest_index)
    if (dest_index > -1) {
      let dest_comp_list = old_list[dest_index].comps;
      dest_comp_list.splice(result.destination.index, 0, `${element}`);

      old_list[dest_index].comps = dest_comp_list;
    }
  };
  return (
    <div className="bg-blue-100 font-sans">
      <div className="h-screen overflow-hidden flex flex-row pt-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar />

            <MidArea />
          </div>
          <div className="w-1/3 relative h-screen overflow-scroll flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    complist: state.list,
  };
};

export default connect(mapStateToProps)(App);
