import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"


export const CreateGraphs = ({stats, type}) => {
	const dataKey = (type === "points" ? "successRate": "successes")

  return (
	<>
    <LineChart width={1000} height={400} data={stats}>
    	<Line type="monotone" dataKey={dataKey}stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" />
    	<XAxis dataKey="time"/>
    	<YAxis dataKey = {dataKey}/>
			<Tooltip />
  	</LineChart>
	</>
  )
}
