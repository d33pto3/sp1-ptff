import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface GraphProps {
  loading: boolean;
  tasks: any;
}

const Graph: React.FC<GraphProps> = ({ loading, tasks }) => {
  const [graphData, setGraphData] = useState<any>([]);

  useEffect(() => {
    if (tasks.length) {
      const groups = [];
      for (let i = 0; i < tasks.length; i += 25) {
        groups.push(tasks.slice(i, i + 25));
      }

      const chartData = groups.map((group, index) => {
        const convertedCount = group.filter(
          (task: any) => task.deal_status === 1
        ).length;
        return {
          name: `Group ${index + 1}`,
          converted: convertedCount,
        };
      });

      setGraphData(chartData);
    }
  }, [tasks]);

  console.log(graphData);

  return (
    <div className="bg-white rounded-lg mx-[20%] py-[10px]">
      {loading ? (
        "loading"
      ) : (
        <div className="max-w-4xl mx-auto my-8">
          <h2 className="text-2xl text-center mb-4">
            Task Deal Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="converted" fill="#34D399" name="Converted to Deal">
                <LabelList dataKey="converted" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Graph;
