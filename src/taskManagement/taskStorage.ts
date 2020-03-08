import { TaskObject } from './Task';

export const setTasks: (t: TaskObject[]) => void = (tasks) => {
    const taskString: string = JSON.stringify(tasks);
    console.log(`persisting state: ${taskString}`);
    localStorage.setItem('tasks', taskString);
}

export const getTasks: () => TaskObject[] = () => {
    const foundTasks: string | null = localStorage.getItem('tasks');
    if (foundTasks) { 
        return JSON.parse(foundTasks);
    }
    return [];
}