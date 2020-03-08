import { TaskObject } from './Task';
import { setTasks } from './taskStorage';

export const moveTaskInList = (tasks: TaskObject[], fromIndex: number, toIndex: number) => {
    if (!(fromIndex >= 0 && toIndex >= 0 && fromIndex < tasks.length && toIndex < tasks.length)) {
        console.log(`couldn't drag from ${fromIndex} to ${toIndex} in array of ${tasks.length}`);
        return tasks;
    }
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(fromIndex, 1);
    reorderedTasks.splice(toIndex, 0, removed);
    console.log(`moved from ${fromIndex} to ${toIndex}: ${JSON.stringify(tasks[fromIndex])}`)

    setTasks(reorderedTasks);
    console.log(`stored new state: ${JSON.stringify(reorderedTasks)}`);

    return reorderedTasks;
}