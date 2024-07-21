import CoinsList from "@/components/CoinsList/CoinsList";
import RecentlyViewed from "@/components/RecentlyViewed/RecentlyViewed";
import WatchList from "@/components/WatchList/WatchList";
const explore = () => {
  return (
    <div>
    
      <div className="mx-8">
        <div className="flex flex-1 justify-between gap-5">
          <div>
            
            <CoinsList />
          </div>
          <div className="flex-col gap-10">
          <div className="flex-col gap-10 hidden md:flex">
            <RecentlyViewed />
            <WatchList />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default explore;
