import React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";
import DraggableTab from "./DraggableTab";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { saveFile } from "../../util/shell";
import FileName from "../Files/FileName";
import useUserSettingsContext from "../ModalContent/UserSettingsForm/hooks/useUserSettingsContext";
import useToastContext from "../Toast/hooks/useToastContext";
import useEditorTabsContext from "./hooks/useEditorTabsContext";

interface Props {
  onDragEnd: (arg0: DropResult) => void;
}

export default function DraggableTabsList({ onDragEnd }: Props) {
  const { userSettings } = useUserSettingsContext();

  const { toast } = useToastContext();

  const {
    editorTabs: { array: tabs, remove: removeTab },
    selectedTabValue,
    setSelectedTabValue,
  } = useEditorTabsContext();

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (!tabs.some((tab) => tab.value === newValue)) return;
    setSelectedTabValue(newValue);
  };

  const handleClickClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    // save editor on close
    if (!tabs[index].editorSaved && userSettings.saveFileOnEditorClose) {
      saveFile(
        tabs[index].value,
        tabs[index].editorContent,
        toast
      );
    }

    const removedValue = tabs[index].value;

    if (selectedTabValue === removedValue) {
      if (index + 1 < tabs.length) {
        setSelectedTabValue(tabs[index + 1].value);
      } else if (tabs.length > 1) {
        setSelectedTabValue(tabs[0].value);
      } else {
        setSelectedTabValue("");
      }
    }

    removeTab(index);
  };

  const _renderTabList = (droppableProvided: DroppableProvided) => (
    <TabList
      onChange={handleChange}
      aria-label="Draggable Tabs"
      variant="scrollable"
    >
      {tabs.map((tab, index) => {
        const child = <Tab label={tab.label} value={tab.value} key={index} />;

        return (
          <DraggableTab
            label={
              <>
                <FileName fileName={tab.label} />
                <IconButton
                  aria-label="close"
                  sx={{ height: "20px", width: "20px" }}
                  onClick={(e) => handleClickClose(e, index)}
                >
                  <CloseIcon sx={{ height: "15px", width: "15px" }} />
                </IconButton>
              </>
            }
            value={tab.value}
            index={index}
            key={index}
            child={
              child as React.DetailedReactHTMLElement<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
              >
            }
          />
        );
      })}
      {droppableProvided ? droppableProvided.placeholder : null}
    </TabList>
  );

  const _renderTabListWrappedInDroppable = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", overflow: "auto" }}>
        <Droppable droppableId="1" direction="horizontal">
          {(droppableProvided) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {_renderTabList(droppableProvided)}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );

  return (
    <Box sx={{ width: "100%", ml: "-1px", height: "30px" }}>
      <TabContext value={selectedTabValue}>
        <Box>
          <Stack direction="column">{_renderTabListWrappedInDroppable()}</Stack>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel value={tab.value} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
