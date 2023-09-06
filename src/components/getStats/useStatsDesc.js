import { getDocs, collection, query, orderBy, where} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export const useStatsDesc = () => {
  const[username] = useAuthState(auth)
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

  const getFormattedData = (data) => {
    return data.docs.map((doc) => ({id: doc.id, ...doc.data(), time: doc.data().time.toDate() }));
  };

  const getStats = async () => {
    const twoPointsQuery = query(twoPointsRef, where("username", "==", username.displayName), orderBy("time", "desc"));
    const dataTwoPoints = await getDocs(twoPointsQuery);
    const formattedDataTwoPoints = getFormattedData(dataTwoPoints);
    setTwoPointsList(formattedDataTwoPoints);

    const threePointsQuery = query(threePointsRef, where("username", "==", username.displayName), orderBy("time", "desc"));
    const dataThreePoints = await getDocs(threePointsQuery);
    const formattedDataThreePoints = getFormattedData(dataThreePoints);
    setThreePointsList(formattedDataThreePoints);

    const layupsQuery = query(layupsRef, where("username", "==", username.displayName), orderBy("time", "desc"));
    const dataLayups = await getDocs(layupsQuery);
    const formattedDataLayups = getFormattedData(dataLayups);
    setLayupsList(formattedDataLayups);

    const assistsQuery = query(assistsRef, where("username", "==", username.displayName), orderBy("time", "desc"));
    const dataAssists = await getDocs(assistsQuery);
    const formattedDataAssists = getFormattedData(dataAssists);
    setAssistsList(formattedDataAssists);

    const reboundsQuery = query(reboundsRef, where("username", "==", username.displayName), orderBy("time", "desc"));
    const dataRebounds = await getDocs(reboundsQuery);
    const formattedDataRebounds = getFormattedData(dataRebounds);
    setReboundsList(formattedDataRebounds);
    setLoading(false);
  };

  useEffect(() => {
    getStats();
  }, []);

  return {
    loading,
    twoPointsList,
    threePointsList,
    layupsList,
    assistsList,
    reboundsList,
    getStats
  };

}