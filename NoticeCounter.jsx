export const createNoticeCounter = () => {
  let count = 0;

  return () => {
    count++;
    return count;
  };
};