import React from "react";
import SVG from "react-inlinesvg";

import infoTextIcon from "./icon-info.svg";
import userIcon from "./icon-user.svg";
import editIconAlt from "./icon-edit-alt.svg";
import chevronDownIcon from "./icon-chevron-down.svg";
import chevronUpIcon from "./icon-chevron-up.svg";

const InlineInfoIcon = () => <SVG src={infoTextIcon} />;
const ChevronDown = () => <SVG src={chevronDownIcon} alt="chevron down" />;
const ChevronUp = () => <SVG src={chevronUpIcon} alt="chevron up" />;
const UserIcon = () => <SVG src={userIcon} />;
const EditIconAlt = () => <SVG src={editIconAlt} />;

export { InlineInfoIcon, ChevronDown, ChevronUp, EditIconAlt, UserIcon };
