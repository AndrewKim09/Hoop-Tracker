
import { getDocs, collection, query, orderBy, where} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export const useStatsAsc = () => {
    const [username] = useAuthState(auth)
    const [loading, setLoading] = useState(true);
    const twoPointsRef = collection(db, "twoPointer");
    const [twoPointsList, setTwoPointsList] = useState([]);
  
    const threePointsRef = collection(db, "threePointer");
    const [threePointsList, setThreePointsList] = useState([]);
  
    const layupsRef = collection(db, "layups");
    const [layupsList, setLayupsList] = useState([]);
  
    const assistsRef = collection(db, "assists");
    const [assistsList, setAssistsList] = useState([]);
  
    const reboundsRef = collection(db, "rebounds");
    const [reboundsList, setReboundsList] = useState([]);
  
    
  
    const getFormattedPointsData = (data) => {
      return data.docs.map((doc) => {
        return { successRate: (doc.data().successes / doc.data().attempts * 100), time: doc.data().time.toDate().toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) };
      });
    };
    
      const getFormattedOthersData = (data) => {
      return data.docs.map((doc) => ({successes: doc.data().successes, time: doc.data().time.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })}));
    };
  
    const getStats = async () => {
      const twoPointsQuery = query(twoPointsRef, where("username", "==", username.displayName), orderBy("time", "asc"));
      const dataTwoPoints = await getDocs(twoPointsQuery);
      const formattedDataTwoPoints = getFormattedPointsData(dataTwoPoints);
      setTwoPointsList(formattedDataTwoPoints);
      console.log(twoPointsList);
  
      const threePointsQuery = query(threePointsRef, where("username", "==", username.displayName), orderBy("time", "asc"));
      const dataThreePoints = await getDocs(threePointsQuery);
      const formattedDataThreePoints = getFormattedPointsData(dataThreePoints);
      setThreePointsList(formattedDataThreePoints);
  
      const layupsQuery = query(layupsRef, where("username", "==", username.displayName), orderBy("time", "asc"));
      const dataLayups = await getDocs(layupsQuery);
      const formattedDataLayups = getFormattedPointsData(dataLayups);
      setLayupsList(formattedDataLayups);
  
      const assistsQuery = query(assistsRef, where("username", "==", username.displayName), orderBy("time", "asc"));
      const dataAssists = await getDocs(assistsQuery);
      const formattedDataAssists = getFormattedOthersData(dataAssists);
      setAssistsList(formattedDataAssists);
  
      const reboundsQuery = query(reboundsRef, where("username", "==", username.displayName),orderBy("time", "asc"));
      const dataRebounds = await getDocs(reboundsQuery);
      const formattedDataRebounds = getFormattedOthersData(dataRebounds);
      setReboundsList(formattedDataRebounds);
      setLoading(false);
    };
    useEffect(() => {
      getStats();
    }, [])
    
    return {
        loading,
        twoPointsList,
        threePointsList,
        layupsList,
        assistsList,
        reboundsList,
      };
}
