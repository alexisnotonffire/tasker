import { TaskObject, TaskCategory } from './Task';

export const setTasks: (t: TaskObject[]) => void = (tasks) => {
    const allTasks: TaskObject[] = JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.forEach((task) => {
        const idx: number = allTasks.findIndex((allTask) => allTask.id === task.id); 
        (idx > -1) ? allTasks[idx] = task : allTasks.push(task); 
    });
    const taskString: string = JSON.stringify(allTasks);
    console.log(`persisting state: ${taskString}`);
    localStorage.setItem('tasks', taskString);
}

export const getTasks: (c: TaskCategory) => TaskObject[] = (category = TaskCategory.CURRENT) => {
    const foundTasks: string | null = localStorage.getItem('tasks');
    if (foundTasks) { 
        const tasks: TaskObject[] = JSON.parse(foundTasks)
        return tasks.filter((task) => category === task.category);
    }
    return [];
}