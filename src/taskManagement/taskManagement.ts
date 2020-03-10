import { 
    TaskCategory,
    TaskObject, 
} from './Task';
import { v4 as uuid } from 'uuid';

export type TaskListUpdater = (t: TaskObject[], s: string, c?: TaskCategory) => TaskObject[];
export type TaskUpdater = (s: string, c?: TaskCategory) => void;

export const addTask: (to: TaskObject[], n: string, c?: TaskCategory) => TaskObject[] = (tasks, name, category) => {
    if (name !== '' && typeof name !== 'undefined') {
        const newTasks = Array.from(tasks)
        const newTask: TaskObject = createTask(name, tasks.length, category)

        newTasks.push(newTask);
        console.log(`Added: ${JSON.stringify(newTask)}`);
        
        return newTasks;
    }
    return tasks;
};

export const archiveTask: TaskListUpdater = (tasks, id) => {
    let newTasks: TaskObject[] = Array.from(tasks) 
    newTasks = newTasks.map(
            (task: TaskObject) => { 
                if (task.id === id) {
                    return Object.assign(task, {archived: true, index: -1}) 
                }
                return task
            }
        )
        .filter((task) => !task.archived)
        .map((task, idx) => { return Object.assign(task, {index: idx}) as TaskObject })
        .concat(newTasks.filter((task) => task.archived))
        
    return newTasks
};

export const createTask: (s: string, n: number, c?: TaskCategory) => TaskObject = (taskName, index, category) => {
    return {
        archived: false,
        category: category || TaskCategory.CURRENT,
        completed: false,
        id: uuid(),
        index: index,
        name: taskName,
    };
};

export const deleteTask: TaskListUpdater = (tasks, id) => {
    let newTasks = Array.from(tasks);
    newTasks = newTasks.filter((task) => task.id !== id);

    return newTasks;
};

export const toggleTask: TaskListUpdater = (tasks, id) => {
    let newTasks: TaskObject[] = Array.from(tasks);
    newTasks.map(
        (task: TaskObject) => { 
            if (task.id === id) {
                return Object.assign(task, {completed: !task.completed}) 
            }
            return task 
        }
    );

    return newTasks;
};
