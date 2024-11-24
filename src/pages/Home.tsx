import TaskSection from "../components/TaskSection";

interface HomeProps {
  loading: boolean;
  tasks: any;
}

const Home: React.FC<HomeProps> = ({ loading, tasks }) => {
  return (
    <div className="flex justify-between mx-10 gap-4 mt-2 pb-2 bg-white p-2 rounded-lg">
      <TaskSection loading={loading} tasks={tasks} />
    </div>
  );
};

export default Home;
