import * as React from "react";
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
import {
  FileTabContext,
  FileTabValueContext,
  ReloadEditorContext,
} from "../../App";
import { saveFile } from "../../shell";
import { ToastContext } from "../Toast/context/ToastContext";
import FileName from "../Files/FileName";
import useUserSettingsContext from "../ModalContent/UserSettingsForm/hooks/useUserSettingsContext";

interface Props {
  onDragEnd: (arg0: DropResult) => void;
}

export default function DraggableTabsList({ onDragEnd }: Props) {
  // const { saveFileOnEditorClose } = React.useContext(userSettingsContext);

  const { userSettings } = useUserSettingsContext();

  const { useToast } = React.useContext(ToastContext);

  const { tabs, setTabs } = React.useContext(FileTabContext);
  const { fileTabValue, setFileTabValue } =
    React.useContext(FileTabValueContext);
  const { reloadEditorFlag, setReloadEditorFlag } =
    React.useContext(ReloadEditorContext);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (!tabs.some((tab) => tab.value === newValue)) return;
    setFileTabValue(newValue);
  };

  React.useEffect(() => {}, [reloadEditorFlag]);

  const handleClickClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    // save editor on close
    if (!tabs[index].editorSaved && userSettings.saveFileOnEditorClose) {
      console.log("save");
      saveFile(
        tabs[index].value,
        tabs[index].editorContent,
        undefined,
        useToast
      );
    }

    const removedValue = tabs[index].value;
    setTabs((prevTabs) => {
      return [...prevTabs.slice(0, index), ...prevTabs.slice(index + 1)];
    });

    // current active tab is not deleted, no need to change the value
    if (fileTabValue !== removedValue) {
      // must trigger a reload but can't use the value state hook because there is no new value
      setReloadEditorFlag(!reloadEditorFlag);
      return;
    }
    // current active tab is deleted, open an adjacent one or the first one
    if (index < tabs.length) {
      setFileTabValue(tabs[index].value);
    } else if (tabs.length !== 0) {
      setFileTabValue(tabs[0].value);
    } else {
      setFileTabValue("nan");
    }
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
      <TabContext value={fileTabValue}>
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
