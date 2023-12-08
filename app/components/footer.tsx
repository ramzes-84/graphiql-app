"use client";
import { useDict } from "../utils/useDictHook";

export const Footer = () => {
  const dict = useDict();
  return <div>{dict.footer}</div>;
};
