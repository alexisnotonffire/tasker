import { TaskObject, TaskCategory } from './Task';

export const setTasks: (t: TaskObject[], c: TaskCategory) => void = (tasks, category) => {
    const archivedTasks: TaskObject[] = JSON.parse(localStorage.getItem('tasks') || '[]')
        .filter((task: TaskObject) => 
            !tasks.map((task: TaskObject) => task.id).includes(task.id) &&
            (
                task.category !== category || 
                task.archived
            )
        );

    const taskString: string = JSON.stringify(tasks.concat(archivedTasks));
    localStorage.setItem('tasks', taskString);
}

export const getTasks: (c?: TaskCategory) => TaskObject[] = (category = TaskCategory.CURRENT) => {
    const foundTasks: string | null = localStorage.getItem('tasks');
    if (foundTasks) { 
        const tasks: TaskObject[] = JSON.parse(foundTasks);
        return tasks.filter((task) => category === task.category && !task.archived);
    }
    return [];
}