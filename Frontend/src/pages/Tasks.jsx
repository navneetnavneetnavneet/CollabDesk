import React from "react";
import { useNavigate } from "react-router-dom";
import Task from "../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncFetchAllTasks } from "../store/actions/taskActions";
import { setTasks } from "../store/reducers/taskSlice";
import Loading from "../pages/Loading";

const Tasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.taskReducer);

  useEffect(() => {
    dispatch(asyncFetchAllTasks());

    return () => {
      dispatch(setTasks([]));
    };
  }, []);

  console.log(tasks);

  return tasks ? (
    <div className="relative w-full overflow-x-hidden overflow-y-auto">
      <div className="sm:sticky top-0 left-0 z-[99] bg-zinc-900 w-full px-4 sm:px-10 py-3 sm:border-b border-zinc-800 flex items-center justify-between">
        <h1 className="text-[1.5rem] font-medium tracking-tight leading-none">
          Tasks
        </h1>
        <button
          onClick={() => navigate("/create-new-task")}
          className="px-4 py-2 rounded-md border border-zinc-800 hover:bg-zinc-800 duration-300 hover:scale-[.99] cursor-pointer"
        >
          Add New Task
        </button>
      </div>
      <div className="w-full px-4 sm:px-10 py-5 flex flex-wrap gap-5 lg:gap-8 justify-start">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <h3 className="w-full text-center text-xs tracking-tight opacity-60">
            No task here.
          </h3>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Tasks;
