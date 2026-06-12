import { createContext, useContext } from "react";

export const NoticeContext = createContext();

export const useNoticeContext = () => {
  return useContext(NoticeContext);
};