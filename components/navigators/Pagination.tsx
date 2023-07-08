import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import IconButton, { IconButtonProps } from "../common/IconButton";

interface PaginationProps {
  total?: number;
  limit?: number;
  page?: number;
  onNext?: (page: number) => void;
  onPrev?: (page: number) => void;
  buttonProps?: IconButtonProps;
}

const Pagination = ({
  limit,
  page,
  total,
  onNext,
  onPrev,
  buttonProps,
}: PaginationProps) => {
  const handleNext = React.useCallback(
    () => onNext && onNext(page ? page : 1),
    [page, total, onNext]
  );
  const handlePrev = React.useCallback(
    () => onPrev && onPrev(page ? page : 1),
    [page, total, onPrev]
  );

  return (
    <div className="flex flex-row items-center space-x-4">
      <IconButton {...buttonProps} ref={null} onClick={handlePrev}>
        <ChevronLeftIcon />
      </IconButton>
      <span>
        {page} of {total}
      </span>
      <IconButton {...buttonProps} ref={null} onClick={handleNext}>
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
