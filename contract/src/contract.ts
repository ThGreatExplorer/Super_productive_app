import { NearBindgen, near, call, view, Vector } from 'near-sdk-js';
import { Task } from './model';

@NearBindgen({})
class ProductivityApp {
  tasks: Vector<Task> = new Vector<Task>("t-uid");

  @call({ payableFunction: false })
  // Public - Adds a new task.
  add_task({ name, description }: { name: string, description: string }): void {
    const sender = near.predecessorAccountId();
    const task: Task = { name, description, completed: false, owner: sender };
    this.tasks.push(task);
  }

  @call({ payableFunction: false })
  // Public - Marks a task as completed.
  complete_task({ taskIndex }: { taskIndex: number }): void {
    const sender = near.predecessorAccountId();
    const task = this.tasks[taskIndex];
    if (task && task.owner === sender) {
      task.completed = true;
      this.tasks[taskIndex] = task;
    }
  }

  @view({})
  // Returns an array of tasks.
  get_tasks({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): Task[] {
    return this.tasks.toArray().slice(from_index, from_index + limit);
  }

  @view({})
  // Returns the total number of tasks.
  total_tasks(): number {
    return this.tasks.length;
  }
}