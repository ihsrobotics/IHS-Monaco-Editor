import { Stack, Switch } from "@mui/material";
import { settingItem } from "../../context/UserSettingsContext";
import useUserSettingsContext from "../../hooks/useUserSettingsContext";

interface Props {
  label: string;
  checked: boolean;
  item: settingItem;
  disabled?: boolean;
  specialBehaviorFunction?: (...args: unknown[]) => void;
  specialBehaviorParams?: unknown;
}

function UserSettingSwitch({
  label,
  checked,
  item,
  disabled = false,
  specialBehaviorFunction,
  specialBehaviorParams,
}: Props) {
  const { updateUserSettings } = useUserSettingsContext();
  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderBottom: 0.5,
      }}
      alignSelf={"center"}
    >
      {label}
      <Switch
        disabled={disabled}
        checked={checked}
        onChange={(e) =>
          specialBehaviorFunction && specialBehaviorParams
            ? specialBehaviorFunction(specialBehaviorParams)
            : updateUserSettings(item, e.target.checked)
        }
      />
    </Stack>
  );
}

export default UserSettingSwitch;
