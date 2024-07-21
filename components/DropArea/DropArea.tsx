"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setShowDrop } from "@/features/ShowDrop/showDrop";
import { useState } from "react";
import { setCoins } from "@/features/coins/coinsSlice";
import { addWatchList, setWatchlist } from "@/features/watchList/watchList";

const DropArea = () => {
  const dispatch = useDispatch<AppDispatch>();
  const showDrop = useSelector((state: RootState) => state.showDrop.showDrop);
  const [show, setShow] = useState(false);
  const coins = useSelector((state: RootState) => state.coins.coins);
  const number = useSelector((state: RootState) => state.number.value);
  const watchList = useSelector(
    (state: RootState) => state.watchList.watchlist
  );
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drag Enter");
    dispatch(setShowDrop(true));
    setShow(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drag Leave");
    dispatch(setShowDrop(false));
    setShow(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("dropped");

    const newItem = coins[number];
    if (newItem) {
      dispatch(addWatchList(newItem));
    }
    dispatch(setShowDrop(false));
    setShow(false);
  };

  return (
    <section
      className={`w-full bg-white border-dashed border-1 border-yellow-50 p-2 transition-all ease-in-out ${
        showDrop == true ? "opacity-100  h-[100px]" : "opacity-0"
      }  
      `}
      //   hidden={!show}
      onDrop={onDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      Drop Here
    </section>
  );
};

export default DropArea;
