import h from "../../assets/file_icons/h.svg";
import hpp from "../../assets/file_icons/hpp.svg";
import c from "../../assets/file_icons/c.svg";
import cpp from "../../assets/file_icons/cpp.svg";
import js from "../../assets/file_icons/js.svg";
import json from "../../assets/file_icons/json.svg";
import ts from "../../assets/file_icons/ts.svg";
import py from "../../assets/file_icons/py.svg";

interface IconConnector {
    [key: string]: string;
  }

export const fileIcons: IconConnector = {
    h: h,
    hpp: hpp,
    c: c,
    cpp: cpp,
    js: js,
    json: json,
    ts: ts,
    py: py,
};