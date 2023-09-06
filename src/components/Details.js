
import { ChartDetails } from "./data-visualization/ChartDetails";
import { useStatsDesc } from "./getStats/useStatsDesc";

export const Details = () => {

  const {
    loading,
    twoPointsList,
    threePointsList,
    layupsList,
    assistsList,
    reboundsList,
    getStats
  } = useStatsDesc();

  return (
    <div className="transition-fade">
       {loading ? <p>Loading...</p> : 
      <><h2>Two Pointers</h2>
      <ChartDetails stats={twoPointsList} type = {"twoPointer"} getStats = {getStats}></ChartDetails>
      <h2>Three Pointers</h2>
      <ChartDetails stats={threePointsList} type = "threePointer" getStats = {getStats}></ChartDetails>
      <h2>Layups</h2>
      <ChartDetails stats={layupsList} type = "layups" getStats = {getStats}></ChartDetails>
      <h2>Rebounds</h2>
      <ChartDetails stats={reboundsList} type = "rebounds" getStats = {getStats}></ChartDetails>
      <h2>Assits</h2>
      <ChartDetails stats={assistsList} type = "assists" getStats = {getStats}></ChartDetails></>}
      

    </div>
  );
};
