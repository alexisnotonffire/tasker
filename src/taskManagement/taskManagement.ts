import { 
    TaskCategory,
    TaskObject, 
} from './Task';
import { setTasks } from './taskStorage';
import { v4 as uuid } from 'uuid';

export type TaskListUpdater = (tl: TaskObject[], str?: string) => TaskObject[];

export const createTask: (s: string, n: number, c?: TaskCategory) => TaskObject = (taskName, index, category) => {
    return {
        id: uuid(),
        name: taskName,
        completed: false,
        category: category || TaskCategory.CURRENT,
        index: index,
    };
};

export const addTask: (to: TaskObject[], n: string, c?: TaskCategory) => TaskObject[] = (tasks, name, category) => {
    if (name !== '' && name !== undefined) {
        const newTask: TaskObject = createTask(name, tasks.length, category)
        tasks.push(newTask);
        console.log(`Added: ${JSON.stringify(newTask)}`);

        setTasks(tasks);
        console.log(`stored new state: ${JSON.stringify(tasks)}`);
    }

    return tasks;
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

    setTasks(tasks);
    console.log(`stored new state: ${JSON.stringify(tasks)}`);

    return newTasks
};

export const deleteTask: TaskListUpdater = (tasks, id) => {
    const newTasks = tasks.filter((task) => task.id !== id)

    setTasks(newTasks);
    console.log(`stored new state: ${JSON.stringify(newTasks)}`);
    
    return newTasks
};