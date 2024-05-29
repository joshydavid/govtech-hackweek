"use client";

import { cn } from "@/lib/utils";
import { TabsType } from "@/models/tabs";
import { motion } from "framer-motion";
import React from "react";

interface TabsProps {
  selected: string;
  tabsMapping: any;
  setSelected: (text: string) => void;
}

interface TabProp {
  icon: any;
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

const Tabs = ({ tabsMapping, selected, setSelected }: TabsProps) => {
  return (
    <div className="mb-8 flex items-center gap-12">
      {tabsMapping.map(({ label, icon }: TabsType, index: number) => {
        return (
          <Tab
            text={label}
            icon={icon}
            selected={selected === label}
            setSelected={setSelected}
            key={index}
          />
        );
      })}
    </div>
  );
};

const Tab = ({ icon, text, selected, setSelected }: TabProp) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        selected ? "text-white" : "text-gray-500 hover:text-gray-900",
        "relative rounded-md px-3.5 py-2.5 text-lg font-medium transition-colors"
      )}
    >
      <div className="flex flex-col gap-1 justify-center items-center relative z-10">
        {React.createElement(icon)}
        <span>{text}</span>
      </div>

      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-md bg-blue-500"
        ></motion.span>
      )}
    </button>
  );
};

export default Tabs;
