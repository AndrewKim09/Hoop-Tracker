
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { DateTimePicker} from "@mui/x-date-pickers"

export const CreatePoints = () => {
  const [type, setType] = useState("none");
  const [user] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(null); // Set initial selectedDate to null

  const typeCheck = () => {
    if (type === "twoPointer" || type === "threePointer" || type === "layups") {
      return true;
    } else {
      return false;
    }
  };

  const PointsSchema = yup.object().shape({
    type: yup
      .string()
      .required("you must add a type")
      .notOneOf(["none"], "Please select a valid Stat Type"),
    successes: yup.number().required().typeError("input Successes"),
    attempts: yup
      .number()
      .min(yup.ref("successes"), "attempts must be more than the successes")
      .required()
      .typeError("input attempts"),
    // 'time' field is not required in the schema
  });

  const OthersSchema = yup.object().shape({
    type: yup
      .string()
      .required("you must add a type")
      .notOneOf(["none"], "Please select a valid Stat Type"),
    successes: yup
      .number()
      .required("must input amount")
      .typeError("input Successes"),
    // 'time' field is not required in the schema
  });

  const postsRef = collection(db, type);

  const { register: pointRegister, handleSubmit: pointSubmit, formState: { errors: pointErrors }, setValue: setPointDateValue } = useForm({
    resolver: yupResolver(PointsSchema),
  });

  const onCreatePoints = async (data) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
    });
    window.location.reload();
  };

  const { register: otherRegister, handleSubmit: otherSubmit, formState: { errors: otherErrors }, setValue: setOtherDateValue } = useForm({
    resolver: yupResolver(OthersSchema),
  });

  const onCreateOthers = async (data) => {
    console.log(data);
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,

    });
    window.location.reload();
  };

  useState(console.log(typeCheck()), [])


  return (
    <div className="create_section transition-fade">
      <form onSubmit={typeCheck() ? pointSubmit(onCreatePoints) : otherSubmit(onCreateOthers)}>
        <div className="form-row" onChange={(event) => { setType(event.target.value) }}>
          <label htmlFor="type">Shot Type</label>
          <select id="type" name="type" {...(typeCheck() ? { ...pointRegister("type") } : { ...otherRegister("type") })}>
            <option value="none">Stat Type</option>
            <option value="twoPointer">2 Pointer</option>
            <option value="threePointer">3 Pointer</option>
            <option value="assists">Assists</option>
            <option value="layups">Layups</option>
            <option value="rebounds">Rebounds</option>
          </select>
        </div>
        <p className="error-box">{typeCheck() ? pointErrors.type?.message : otherErrors.type?.message}</p>

        <div className="form-row">
          <label htmlFor="success">Successes</label>
          <input type="number" id="success" name="success" {...(typeCheck() ? { ...pointRegister("successes") } : { ...otherRegister("successes") })} />
        </div>
        <p className="error-box">{typeCheck() ? pointErrors.successes?.message : otherErrors.successes?.message}</p>

        {type !== 'rebounds' && type !== 'assists' ?
          <>
            <div className="form-row">
              <label id="attempts">Total attempts(Points)</label>
              <input type="number" id="attempts" name="attempts" {...pointRegister("attempts")} />
            </div>
            <p className="error-box">{pointErrors.attempts?.message}</p>
          </>
          : <></>}

        <div className="date-picker-container">
          <label>Time</label>
          <DateTimePicker
           views={['year', 'month', 'day', 'hours']}
            className="date-picker"

            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              // Update the form value for 'time' field
              if(typeCheck()){
                setPointDateValue("time", date.$d)
              }
              else{
                setOtherDateValue("time", date.$d)
              }
            }}
           
          />
           
        </div>
        <p className="error-box">{pointErrors.time?.message}</p>

        <div style={{ display: 'flex', justifyContent: 'center' }}><button type="submit" className="submit-button">Submit</button></div>
      </form>
    </div>
    
  );
};
