import React from "react";
import Project from "../components/Project";
import Loading from "../pages/Loading";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetTaskDetails } from "../store/actions/taskActions";
import { setTask } from "../store/reducers/taskSlice";

const TaskDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();

  useEffect(() => {
    dispatch(asyncGetTaskDetails(taskId));

    return () => {
      dispatch(setTask(null));
    };
  }, [taskId]);

  const { task } = useSelector((state) => state.taskReducer);

  console.log(task);

  return task ? (
    <div className="w-full h-full px-4 sm:px-10 py-3 sm:py-10 flex flex-col gap-10 overflow-y-auto">
      <div className="flex flex-col gap-3">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-medium tracking-tight leading-none">
          {task.title}
        </h1>
        <p className="text-base font-normal tracking-tight opacity-80 leading-tight">
          {task.description}
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          voluptates natus laborum aspernatur labore dolor nesciunt mollitia ea,
          id placeat!
        </p>
        <div className="flex flex-col">
          <h3 className="text-base font-normal tracking-tight">
            Status : {task.status}
          </h3>
          <h3 className="text-base font-normal tracking-tight">
            Deadline : {new Date(task.deadline).toLocaleDateString()}
          </h3>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(`/update-task-deatils/${task._id}`)}
            className="w-fit px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 hover:scale-[.99] duration-300 cursor-pointer tracking-tight"
          >
            Update Task
          </button>
          <button
            onClick={async () => {
              // await dispatch(asyncDeleteProject(project._id));
              // await navigate("/projects");
            }}
            className="w-fit px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 hover:scale-[.99] duration-300 cursor-pointer tracking-tight"
          >
            Delete Task
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-normal tracking-tight leading-none">
          Created By
        </h3>
        <div className="w-full md:w-[48%] lg:w-[31.5%] p-4 hover:scale-[.99] hover:bg-zinc-800 duration-300 shadow flex flex-col items-center justify-center rounded-md border border-zinc-800">
          <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-zinc-800 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={task.createdBy.profileImage.url}
              alt=""
            />
          </div>
          <h1 className="text-xl font-normal tracking-tight">
            {`${task.createdBy.fullName.firstName} ${task.createdBy.fullName.lastName}`}
          </h1>
          <h3 className="text-base font-normal tracking-tight opacity-80">
            {task.createdBy.email}
          </h3>
          <h3 className="text-base font-normal tracking-tight opacity-80">
            Role : {task.createdBy.role}
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-normal tracking-tight leading-none">
          Team
        </h3>
        <div className="w-full flex flex-wrap gap-5">
          <Project project={task.project} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TaskDetails;
