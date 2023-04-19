
import "./App.css";
import { HotTable } from "@handsontable/react";
import { useState } from "react";
import { useRef } from "react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import styled from "styled-components";

registerAllModules();

function App() {
  const hotRef = useRef(null);
  // if set collapsed to false, handsontable has no issue at all when collapse or expand
  const [collapsed, updateCollapsed] = useState(true);
  return (
    <Wrapper className="App">
      <div>
        <button
          onClick={() => {
            updateCollapsed(!collapsed);
          }}
        >
          {collapsed ? "collapsed" : "expanded"}
        </button>
      </div>
      <div className={collapsed ? "collapsed" : undefined}>
        <HotTable
          contextMenu={true}
          colHeaders={["url", "content type"]}
          rowHeaders={true}
          ref={hotRef}
          columns={[
            {
              renderer: (instance, TD, row, col, prop, value) => {
                TD.innerHTML = `<span>${value}</span>`;
              },
            },
            {
              type: "dropdown",
              source: ["text/html", "application/pdf"],
              renderer: (instance, TD, row, col, prop, value) => {
                TD.innerHTML = `<span }'>${value || ""}</span>`;
              },
            },
          ]}
          height={300}
          stretchH="all"
          colWidths={[450, 150]}
          minSpareRows={1}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 60em;
  margin-left: 3em;
  th {
    background-color: darkgray;
  }

  td,
  th {
    border-bottom-color: gray;
  }

  .collapsed {
    display: none;
  }
`;

export default App;
