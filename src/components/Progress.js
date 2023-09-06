import React from 'react'
import { CreateGraphs } from './data-visualization/CreateGraphs';
import { useStatsAsc } from './getStats/useStatsAsc';


export const Progress = () => {
  const {
    loading,
    twoPointsList,
    threePointsList,
    layupsList,
    assistsList,
    reboundsList,
  } = useStatsAsc();
  
  return (
    <div className="transition-fade">
      {loading ? ( // Show loading message while data is being fetched
        <p>Loading...</p>
      ) : (
        <>
          <h2>Two Pointers</h2>
          <CreateGraphs stats={twoPointsList} type = {"points"}></CreateGraphs>

          <h2>Three Pointers</h2>
          <CreateGraphs stats={threePointsList} type = {"points"}></CreateGraphs>

          <h2>Layups</h2>
          <CreateGraphs stats={layupsList}></CreateGraphs>

          <h2>Rebounds</h2>
          <CreateGraphs stats={reboundsList}></CreateGraphs>

          <h2>Assists</h2>
          <CreateGraphs stats={assistsList}></CreateGraphs>
        </>
      )}
    </div>
  );

}
